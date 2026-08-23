// lib/rateLimit.ts - In-Memory Sliding Window Rate Limiter for DDoS & Brute-Force Protection
import { NextRequest } from "next/server";

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Cleanup stale entries every 5 minutes to prevent memory leak
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

export interface RateLimitOptions {
  limit: number;       // Maximum requests allowed within window
  windowSeconds: number; // Time window in seconds
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = { limit: 10, windowSeconds: 60 }
): { success: boolean; limit: number; remaining: number; reset: number } {
  const now = Date.now();
  const windowMs = options.windowSeconds * 1000;
  
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    // New window
    const newRecord: RateLimitRecord = {
      count: 1,
      resetTime: now + windowMs,
    };
    rateLimitMap.set(identifier, newRecord);
    return {
      success: true,
      limit: options.limit,
      remaining: options.limit - 1,
      reset: Math.ceil(newRecord.resetTime / 1000),
    };
  }

  // Existing window
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
 * Helper to extract client IP address across proxies/CDNs (Cloudflare, Vercel, Nginx)
 */
export function getClientIp(req: Request | NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  const cfConnectingIp = req.headers.get("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }

  return "127.0.0.1";
}
