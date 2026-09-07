// app/api/consultation/route.ts - Enterprise Resilient & Rate-Limited Consultation API
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Consultation from "@/models/Consultation";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { verifyAdminAuth } from "@/lib/auth";

// Public rate-limited submission handler
export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    // Rate Limit: Max 5 consultation submissions per minute per IP to prevent spam
    const rateCheck = await checkRateLimit(`consultation_submit_${ip}`, { limit: 5, windowSeconds: 60 });
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: "Too many submission attempts. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    const { name, business, contact, message } = await req.json();

    if (!name || !business || !contact || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Sanitize & length limit
    const cleanName = String(name).trim().slice(0, 100);
    const cleanBusiness = String(business).trim().slice(0, 200);
    const cleanContact = String(contact).trim().slice(0, 100);
    const cleanMessage = String(message).trim().slice(0, 5000);

    await connectDB();

    const consultation = await Consultation.create({
      name: cleanName,
      business: cleanBusiness,
      contact: cleanContact,
      message: cleanMessage,
    });

    console.log(`✅ Consultation recorded: ${consultation._id} for ${cleanName}`);

    return NextResponse.json(
      {
        success: true,
        id: consultation._id,
        message: "Consultation request submitted successfully! We'll reach out within 24 hours.",
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("❌ Consultation API Error:", err);
    return NextResponse.json(
      { error: "Failed to process consultation submission" },
      { status: 500 }
    );
  }
}

// Protected Admin GET handler to list all consultations
export async function GET(req: NextRequest) {
  try {
    const admin = await verifyAdminAuth(req);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 401 });
    }

    await connectDB();
    const consultations = await Consultation.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, consultations });
  } catch (error) {
    console.error("Fetch all consultations error:", error);
    return NextResponse.json({ error: "Failed to load consultations" }, { status: 500 });
  }
}
