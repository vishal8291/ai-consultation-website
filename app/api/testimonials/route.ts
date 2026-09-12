// app/api/testimonials/route.ts
// GET: public — returns only approved testimonials, for the live homepage.
// POST: public — anyone can submit one, and it publishes IMMEDIATELY, with no
// approval step. This is a deliberate choice made after being told the
// trade-off plainly (a spam or fake review could go live unmoderated) — the
// owner chose instant publish over a review queue. The one safety net kept
// in exchange: an admin notification fires the moment anything is
// submitted, so a bad one can be deleted from /admin/testimonials within
// minutes rather than sitting unnoticed.
import { NextRequest, NextResponse, after } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { verifyAdminAuth } from "@/lib/auth";
import { sendAdminNotification, newTestimonialEmail } from "@/lib/email";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    // Admins can request every submission (to review/manage what's live);
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

    const { quote, author, role, sourceUrl, rating } = await req.json();

    // role is optional here (defaults below) so the compact <Feedback />
    // widget can ask for less than the full /review form does — the
    // "reduce friction" trade-off, same idea as skipping the approval step.
    if (!quote || !author) {
      return NextResponse.json({ error: "Your review and name are required" }, { status: 400 });
    }

    let cleanRating: number | undefined;
    if (rating !== undefined && rating !== null && rating !== "") {
      const n = Number(rating);
      if (!Number.isInteger(n) || n < 1 || n > 5) {
        return NextResponse.json({ error: "Rating must be a whole number from 1 to 5" }, { status: 400 });
      }
      cleanRating = n;
    }

    const cleanQuote = String(quote).trim().slice(0, 800);
    const cleanAuthor = String(author).trim().slice(0, 100);
    const cleanRole = (role ? String(role).trim() : "Customer").slice(0, 150);
    const cleanSourceUrl = sourceUrl ? String(sourceUrl).trim().slice(0, 300) : undefined;

    await connectDB();

    const testimonial = await Testimonial.create({
      quote: cleanQuote,
      author: cleanAuthor,
      role: cleanRole,
      sourceUrl: cleanSourceUrl,
      rating: cleanRating,
      status: "approved", // publishes immediately — see file header for why
    });

    console.log(`⭐ Testimonial published live: ${testimonial._id} from ${cleanAuthor}`);

    // Deferred via after() so the visitor's "thank you" screen never waits on
    // mail delivery, and a slow/failed send never turns a successful,
    // already-published submission into an error response.
    const { subject, html } = newTestimonialEmail({
      quote: cleanQuote,
      author: cleanAuthor,
      role: cleanRole,
      sourceUrl: cleanSourceUrl,
      rating: cleanRating,
    });
    after(() => sendAdminNotification(subject, html));

    return NextResponse.json(
      {
        success: true,
        message: "Thank you. Your review is live on the site now.",
        id: testimonial._id,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Testimonial submission error:", err);
    return NextResponse.json({ error: "Failed to submit testimonial" }, { status: 500 });
  }
}
