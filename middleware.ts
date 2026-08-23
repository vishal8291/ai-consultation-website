// middleware.ts - Edge Cryptographic Token Verification Guard
import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. ADMIN ROUTE PROTECTION
  if (pathname.startsWith("/admin")) {
    // Public admin login page
    if (pathname === "/admin/login") {
      const adminToken = request.cookies.get("admin-token")?.value;
      if (adminToken) {
        const payload = await verifyAuthToken(adminToken);
        if (payload && payload.role === "admin") {
          return NextResponse.redirect(new URL("/admin/dashboard", request.url));
        }
      }
      return NextResponse.next();
    }

    const adminToken = request.cookies.get("admin-token")?.value;
    if (!adminToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Cryptographically verify token signature & expiration
    const payload = await verifyAuthToken(adminToken);
    if (!payload || payload.role !== "admin") {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      // Invalidate forged or expired token
      response.cookies.delete("admin-token");
      return response;
    }

    return NextResponse.next();
  }

  // 2. USER ROUTE PROTECTION (/dashboard, /profile)
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/profile")) {
    const userToken = request.cookies.get("user-token")?.value;
    if (!userToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Cryptographically verify token signature & expiration
    const payload = await verifyAuthToken(userToken);
    if (!payload || (payload.role !== "user" && payload.role !== "admin")) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("user-token");
      return response;
    }

    return NextResponse.next();
  }

  // 3. PUBLIC AUTH REDIRECTS (/login, /register)
  if (pathname === "/login" || pathname === "/register") {
    const userToken = request.cookies.get("user-token")?.value;
    if (userToken) {
      const payload = await verifyAuthToken(userToken);
      if (payload) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "/login",
    "/register",
  ],
};
