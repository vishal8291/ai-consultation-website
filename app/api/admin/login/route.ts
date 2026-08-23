// app/api/admin/login/route.ts - Enterprise Cryptographic Admin Auth Route
import { NextRequest, NextResponse } from "next/server";
import { signAuthToken, timingSafeStringCompare } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    
    // Rate limit: Max 5 failed attempts per 15 minutes per IP
    const rateCheck = checkRateLimit(`admin_login_${ip}`, { limit: 5, windowSeconds: 15 * 60 });
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again in 15 minutes." },
        { 
          status: 429,
          headers: { "Retry-After": `${rateCheck.reset - Math.floor(Date.now() / 1000)}` }
        }
      );
    }

    const { password } = await req.json();

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    // Timing-safe comparison to prevent side-channel timing analysis
    const isValid = timingSafeStringCompare(password, ADMIN_PASSWORD);
    if (!isValid) {
      console.warn(`❌ Failed admin login attempt from IP: ${ip}`);
      return NextResponse.json({ error: "Invalid admin credentials" }, { status: 401 });
    }

    // Sign cryptographic admin JWT valid for 24 hours
    const token = await signAuthToken(
      {
        role: "admin",
        name: "Administrator",
        email: "vishal.buildss@gmail.com",
      },
      24 * 60 * 60 // 24 hours
    );

    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful",
      role: "admin"
    });

    // Set secure HTTP-only cookie accessible across the entire application domain
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60,
      path: "/",
    });

    console.log(`✅ Admin logged in successfully from IP: ${ip}`);
    return response;
  } catch (error: any) {
    console.error("❌ Admin login API error:", error);
    return NextResponse.json({ error: "Internal server authentication error" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  
  // Clear the cookie immediately
  response.cookies.set("admin-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return response;
}
