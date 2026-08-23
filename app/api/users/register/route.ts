// app/api/users/register/route.ts - Enterprise Cryptographic User Registration
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signAuthToken } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    // Rate limit: Max 5 registration attempts per 15 minutes per IP
    const rateCheck = checkRateLimit(`register_${ip}`, { limit: 5, windowSeconds: 15 * 60 });
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: "Too many registration attempts. Please try again in 15 minutes." },
        { status: 429 }
      );
    }

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const cleanName = name.trim();
    const cleanEmail = email.toLowerCase().trim();

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    // Secure password hashing with salt rounds = 12
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
    });

    // Sign cryptographic user JWT valid for 7 days
    const token = await signAuthToken(
      {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: "user",
      },
      7 * 24 * 60 * 60
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
    console.error("Register error:", error);
    return NextResponse.json({ error: "Internal server error during registration" }, { status: 500 });
  }
}
