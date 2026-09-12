// app/api/testimonials/[id]/route.ts
// Admin-only moderation actions on a single testimonial: approve, reject, or
// delete. This is the only path by which a submission can ever go live.
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { verifyAdminAuth } from "@/lib/auth";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const admin = await verifyAdminAuth(req);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 401 });
    }

    const { status } = await req.json();
    if (!["pending", "approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const { id } = await context.params;
    await connectDB();

    const testimonial = await Testimonial.findByIdAndUpdate(id, { status }, { new: true });
    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    console.log(`🔄 Testimonial ${id} -> ${status} by ${admin.name || admin.email}`);
    return NextResponse.json({ success: true, testimonial });
  } catch (err: any) {
    console.error("Testimonial update error:", err);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const admin = await verifyAdminAuth(req);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 401 });
    }

    const { id } = await context.params;
    await connectDB();

    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Testimonial deleted" });
  } catch (err: any) {
    console.error("Testimonial delete error:", err);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
