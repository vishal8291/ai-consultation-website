// app/api/testimonials/route.ts
// GET: public — returns only approved testimonials, for the live homepage.
// POST: public — anyone (a real client) can submit one, but it always lands
// as "pending". Nothing here can publish itself; only an admin approving it
// via PATCH /api/testimonials/[id] makes it appear on the site.
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { verifyAdminAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    // Admins can request every submission (for the moderation queue);
    // everyone else only ever sees approved ones.
    if (searchParams.get("all") === "true") {
      const admin = await verifyAdminAuth(req);
      if (!admin) {
        return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 401 });
      }
      const all = await Testimonial.find({}).sort({ createdAt: -1 }).lean();
      return NextResponse.json({ success: true, testimonials: all });
    }

    const approved = await Testimonial.find({ status: "approved" }).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, testimonials: approved });
  } catch (error) {
    console.error("Fetch testimonials error:", error);
    return NextResponse.json({ error: "Failed to load testimonials" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    // Same shape of protection as the consultation form: a public write
    // endpoint needs a rate limit regardless of what happens to the data
    // afterward.
    const rateCheck = await checkRateLimit(`testimonial_submit_${ip}`, { limit: 5, windowSeconds: 60 });
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    const { quote, author, role, sourceUrl } = await req.json();

    if (!quote || !author || !role) {
      return NextResponse.json({ error: "Your quote, name, and role are required" }, { status: 400 });
    }

    const cleanQuote = String(quote).trim().slice(0, 800);
    const cleanAuthor = String(author).trim().slice(0, 100);
    const cleanRole = String(role).trim().slice(0, 150);
    const cleanSourceUrl = sourceUrl ? String(sourceUrl).trim().slice(0, 300) : undefined;

    await connectDB();

    const testimonial = await Testimonial.create({
      quote: cleanQuote,
      author: cleanAuthor,
      role: cleanRole,
      sourceUrl: cleanSourceUrl,
      status: "pending",
    });

    console.log(`📝 Testimonial submitted (pending review): ${testimonial._id} from ${cleanAuthor}`);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you. We'll review it and it'll appear on the site shortly.",
        id: testimonial._id,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Testimonial submission error:", err);
    return NextResponse.json({ error: "Failed to submit testimonial" }, { status: 500 });
  }
}
