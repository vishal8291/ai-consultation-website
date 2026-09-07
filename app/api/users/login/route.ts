// app/api/users/login/route.ts - Enterprise Cryptographic User Login
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signAuthToken } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    // Rate limit: 10 attempts per 15 minutes per IP
    const rateCheck = await checkRateLimit(`user_login_${ip}`, { limit: 10, windowSeconds: 15 * 60 });
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again in 15 minutes." },
        { status: 429 }
      );
    }

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    await connectDB();

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Sign cryptographic user JWT valid for 7 days
    const token = await signAuthToken(
      {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: "user",
      },
      7 * 24 * 60 * 60 // 7 days
    );

    const response = NextResponse.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
    });

    // Set secure HTTP-only cookie
    response.cookies.set("user-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("User login error:", error);
    return NextResponse.json({ error: "Server authentication error" }, { status: 500 });
  }
}
