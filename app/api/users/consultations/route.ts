// app/api/users/consultations/route.ts
import { connectDB } from "@/lib/mongodb";
import Consultation from "@/models/Consultation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("user-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = JSON.parse(token);
    await connectDB();

    const consultations = await Consultation.find({ "contact": userData.email })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(consultations);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
