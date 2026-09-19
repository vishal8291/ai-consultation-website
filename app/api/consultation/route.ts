// app/api/consultation/route.ts - Enterprise Resilient & Rate-Limited Consultation API
import { NextRequest, NextResponse, after } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Consultation from "@/models/Consultation";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { verifyAdminAuth } from "@/lib/auth";
import { sendAdminNotification, newConsultationEmail } from "@/lib/email";

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

    const { subject, html } = newConsultationEmail({
      name: cleanName,
      business: cleanBusiness,
      contact: cleanContact,
      message: cleanMessage,
    });

    // A lead must never be lost because the database is unreachable (a rotated
    // Atlas password once took every submission down with a 500). If saving
    // fails, the enquiry still reaches the inbox, flagged so it can be re-entered.
    let consultationId: unknown = null;
    try {
      await connectDB();
      const consultation = await Consultation.create({
        name: cleanName,
        business: cleanBusiness,
        contact: cleanContact,
        message: cleanMessage,
      });
      consultationId = consultation._id;
      console.log(`✅ Consultation recorded: ${consultation._id} for ${cleanName}`);
    } catch (dbErr) {
      console.error("❌ Consultation not saved to the database, emailing it instead:", dbErr);
      // Awaited rather than deferred: this email is now the only copy of the lead.
      const emailed = await sendAdminNotification(`[NOT SAVED - database down] ${subject}`, html);
      if (!emailed) {
        // Neither copy exists, so say so honestly and point to a channel that works.
        return NextResponse.json(
          { error: "We couldn't send your request just now. Please message us on WhatsApp at +91 82915 69470." },
          { status: 503 }
        );
      }
      return NextResponse.json(
        { success: true, message: "Consultation request submitted successfully! We'll reach out within 24 hours." },
        { status: 201 }
      );
    }

    // Deferred until after the response is sent, so a slow mail provider never
    // delays the user's submission. after() keeps the serverless function alive
    // for the duration; an un-awaited bare call gets frozen mid-flight and the
    // email is silently lost.
    after(() => sendAdminNotification(subject, html));

    return NextResponse.json(
      {
        success: true,
        id: consultationId,
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
