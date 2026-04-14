// app/api/admin/login/route.ts (UPDATED - PRODUCTION READY)
import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"; // Fallback for development

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    // Validate password
    if (!password || password !== ADMIN_PASSWORD) {
      console.log("❌ Failed login attempt");
      return NextResponse.json(
        { error: "Invalid password" }, 
        { status: 401 }
      );
    }

    // Create secure response
    const response = NextResponse.json({ 
      success: true, 
      message: "Login successful" 
    });

    // Set secure cookie
    response.cookies.set("admin-token", "valid-admin-session", {
      httpOnly: true,           // Prevent XSS
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: "strict",       // CSRF protection
      maxAge: 24 * 60 * 60,     // 24 hours
      path: "/admin",           // Only valid for /admin routes
    });

    console.log("✅ Admin login successful");
    return response;

  } catch (error: any) {
    console.error("❌ Admin login API error:", error);
    return NextResponse.json(
      { error: "Login server error" }, 
      { status: 500 }
    );
  }
}

// ✅ Optional: Logout endpoint
export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  
  // Clear the cookie
  response.cookies.set("admin-token", "", {
    httpOnly: true,
    maxAge: 0,  // Immediately expire
    path: "/admin",
  });
  
  console.log("👋 Admin logged out");
  return response;
}
