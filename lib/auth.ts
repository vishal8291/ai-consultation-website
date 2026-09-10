// lib/auth.ts - Enterprise Cryptographic Authentication & Token Manager (100% Edge & Node Compatible)
import { NextRequest } from "next/server";

/**
 * Reads a required environment variable and narrows it to string.
 *
 * A bare `const X = process.env.X; if (!X) throw` guards at runtime but does
 * not narrow inside function bodies, because TypeScript cannot prove those
 * functions run after the check. That left every call site passing
 * `string | undefined` into signing and comparison helpers that require a
 * string, which the build was only tolerating because next.config.ts sets
 * ignoreBuildErrors. Resolving it here fixes all of those call sites at once.
 */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} environment variable is required`);
  }
  return value;
}

const JWT_SECRET: string = requireEnv("JWT_SECRET");

export interface TokenPayload {
  id?: string;
  email?: string;
  name?: string;
  role: "admin" | "user";
  iat?: number;
  exp?: number;
}

// Pure Web Standard Base64URL encoding (100% Edge & Node Compatible)
function base64UrlEncode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Pure Web Standard Base64URL decoding
function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

// Universal HMAC-SHA256 signing using global Web Crypto API (Standard in Edge & Node 18+)
async function hmacSha256(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const dataBytes = encoder.encode(data);

  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );

  const signatureBuffer = await globalThis.crypto.subtle.sign("HMAC", key, dataBytes);
  const bytes = new Uint8Array(signatureBuffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Signs a cryptographic JWT with an expiration time
 */
export async function signAuthToken(payload: TokenPayload, expiresInSeconds: number = 24 * 60 * 60): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);

  const fullPayload: TokenPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };

  const headerB64 = base64UrlEncode(JSON.stringify(header));
  const payloadB64 = base64UrlEncode(JSON.stringify(fullPayload));
  const dataToSign = `${headerB64}.${payloadB64}`;

  const signature = await hmacSha256(dataToSign, JWT_SECRET);
  return `${dataToSign}.${signature}`;
}

/**
 * Cryptographically verifies a JWT token signature and expiration
 */
export async function verifyAuthToken(token: string | undefined | null): Promise<TokenPayload | null> {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [headerB64, payloadB64, signature] = parts;
  const dataToSign = `${headerB64}.${payloadB64}`;

  try {
    const expectedSignature = await hmacSha256(dataToSign, JWT_SECRET);

    // Constant-time check to prevent timing attacks
    if (!timingSafeStringCompare(signature, expectedSignature)) {
      return null;
    }

    const payload: TokenPayload = JSON.parse(base64UrlDecode(payloadB64));
    const now = Math.floor(Date.now() / 1000);

    // Check expiration
    if (payload.exp && payload.exp < now) {
      return null;
    }

    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Constant-time string comparison to prevent timing attacks on passwords/tokens
 */
export function timingSafeStringCompare(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;

  let mismatch = a.length === b.length ? 0 : 1;
  const len = Math.max(a.length, b.length);

  for (let i = 0; i < len; i++) {
    const charA = a.charCodeAt(i % a.length);
    const charB = b.charCodeAt(i % b.length);
    mismatch |= charA ^ charB;
  }

  return mismatch === 0;
}

/**
 * Guard helper for API routes requiring Admin privileges
 */
export async function verifyAdminAuth(req: Request | NextRequest): Promise<TokenPayload | null> {
  let token: string | undefined;

  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  }

  if (!token) {
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/admin-token=([^;]+)/);
    if (match) {
      token = match[1];
    }
  }

  if (!token) return null;

  const payload = await verifyAuthToken(token);
  if (!payload || payload.role !== "admin") {
    return null;
  }

  return payload;
}

/**
 * Guard helper for API routes requiring User privileges
 */
export async function verifyUserAuth(req: Request | NextRequest): Promise<TokenPayload | null> {
  let token: string | undefined;

  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  }

  if (!token) {
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/user-token=([^;]+)/);
    if (match) {
      token = match[1];
    }
  }

  if (!token) return null;

  const payload = await verifyAuthToken(token);
  if (!payload || (payload.role !== "user" && payload.role !== "admin")) {
    return null;
  }

  return payload;
}
