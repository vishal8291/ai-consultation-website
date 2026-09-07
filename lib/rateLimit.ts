// lib/rateLimit.ts - Sliding Window Rate Limiter (Upstash Redis-backed, shared across
// all serverless instances; falls back to a single-instance in-memory limiter only
// when Upstash isn't configured, e.g. local dev without an Upstash project set up).
import { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Vercel's Upstash marketplace integration names these vars after whatever prefix
// you pick at setup time, suffixed with its own KV_REST_API_URL/TOKEN — so accept
// both that shape and the plain UPSTASH_REDIS_REST_URL/TOKEN names.
const upstashUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.UPSTASH_REDIS_REST_KV_REST_API_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN;

const redis =
  upstashUrl && upstashToken
    ? new Redis({
        url: upstashUrl,
        token: upstashToken,
      })
    : null;

if (!redis && process.env.NODE_ENV === "production") {
  console.warn(
    "⚠️ UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN (or their KV_REST_API_ equivalents) are not set. Falling back to " +
      "in-memory rate limiting, which does NOT work reliably on Vercel's serverless " +
      "architecture (each request can hit a different function instance with its own " +
      "empty counter). Brute-force protection on login/register/admin routes is " +
      "effectively disabled until Upstash is configured."
  );
}

// In-memory fallback, only meaningfully useful for local dev
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

const limiterCache = new Map<string, Ratelimit>();
function getLimiter(limit: number, windowSeconds: number): Ratelimit {
  const cacheKey = `${limit}:${windowSeconds}`;
  let limiter = limiterCache.get(cacheKey);
  if (!limiter) {
    limiter = new Ratelimit({
      redis: redis!,
      limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
      prefix: "ratelimit",
    });
    limiterCache.set(cacheKey, limiter);
  }
  return limiter;
}

export interface RateLimitOptions {
  limit: number; // Maximum requests allowed within window
  windowSeconds: number; // Time window in seconds
}

export async function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = { limit: 10, windowSeconds: 60 }
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  if (redis) {
    const limiter = getLimiter(options.limit, options.windowSeconds);
    const result = await limiter.limit(identifier);
    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: Math.ceil(result.reset / 1000),
    };
  }

  // In-memory fallback (dev only — see warning above)
  const now = Date.now();
  const windowMs = options.windowSeconds * 1000;
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    const newRecord: RateLimitRecord = { count: 1, resetTime: now + windowMs };
    rateLimitMap.set(identifier, newRecord);
    return {
      success: true,
      limit: options.limit,
      remaining: options.limit - 1,
      reset: Math.ceil(newRecord.resetTime / 1000),
    };
  }

  record.count += 1;

  if (record.count > options.limit) {
    return {
      success: false,
      limit: options.limit,
      remaining: 0,
      reset: Math.ceil(record.resetTime / 1000),
    };
  }

  return {
    success: true,
    limit: options.limit,
    remaining: options.limit - record.count,
    reset: Math.ceil(record.resetTime / 1000),
  };
}

/**
 * Helper to extract client IP address across proxies/CDNs (Cloudflare, Vercel, Nginx).
 *
 * Prefers single-value headers that the edge network overwrites rather than appends
 * to (cf-connecting-ip, x-real-ip), since those can't be forged by a client sending
 * its own copy of the header. x-forwarded-for is a comma-separated chain where each
 * hop appends the address it saw the request come from — a client can prepend an
 * arbitrary fake IP, so the trustworthy value is the LAST entry (the one the edge
 * itself appended), never the first.
 */
export function getClientIp(req: Request | NextRequest): string {
  const cfConnectingIp = req.headers.get("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }

  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length > 0) {
      return parts[parts.length - 1];
    }
  }

  return "127.0.0.1";
}
