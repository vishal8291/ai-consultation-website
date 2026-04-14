// app/api/users/login/route.ts (FIXED - TypeScript Clean)
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User"; // ✅ CREATE models/User.ts FIRST
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server"; // ✅ Added NextRequest import

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const response = NextResponse.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email }
    });

    // Set user session cookie
    response.cookies.set("user-token", JSON.stringify({
      id: user._id,
      email: user.email,
      name: user.name
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
