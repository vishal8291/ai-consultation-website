// app/api/users/consultations/route.ts - Cryptographically Verified User Consultations
import { connectDB } from "@/lib/mongodb";
import Consultation from "@/models/Consultation";
import { verifyUserAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userPayload = await verifyUserAuth(req);

    if (!userPayload || !userPayload.email) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    await connectDB();

    // Query consultations matching the verified user's email
    const consultations = await Consultation.find({ contact: userPayload.email })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(consultations);
  } catch (error) {
    console.error("Fetch user consultations error:", error);
    return NextResponse.json({ error: "Failed to fetch consultation history" }, { status: 500 });
  }
}
