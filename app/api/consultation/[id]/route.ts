// app/api/consultation/[id]/route.ts - Enterprise Zero-Trust Protected Admin Route
import { connectDB } from "@/lib/mongodb";
import Consultation from "@/models/Consultation";
import { verifyAdminAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

// ✅ GET - Fetch single consultation (Admin Protected)
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const admin = await verifyAdminAuth(req);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 401 });
    }

    const { id } = await context.params;
    await connectDB();

    const consultation = await Consultation.findById(id).lean();
    if (!consultation) {
      return NextResponse.json({ error: "Consultation record not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, consultation });
  } catch (error: any) {
    console.error("❌ GET consultation error:", error);
    return NextResponse.json({ error: "Failed to fetch consultation" }, { status: 500 });
  }
}

// ✅ PATCH - Update status (Admin Protected)
export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const admin = await verifyAdminAuth(req);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 401 });
    }

    const { id } = await context.params;
    const { status } = await req.json();

    const validStatuses = ["new", "contacted", "closed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be 'new', 'contacted', or 'closed'" },
        { status: 400 }
      );
    }

    await connectDB();

    const consultation = await Consultation.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!consultation) {
      return NextResponse.json({ error: "Consultation record not found" }, { status: 404 });
    }

    console.log(`🔄 Status updated by admin: ${id} → ${status}`);
    return NextResponse.json({
      success: true,
      consultation: {
        id: consultation._id,
        status: consultation.status,
        updatedAt: consultation.updatedAt,
      },
    });
  } catch (error: any) {
    console.error("❌ PATCH consultation error:", error);
    return NextResponse.json({ error: "Failed to update consultation" }, { status: 500 });
  }
}

// ✅ DELETE - Delete consultation (Admin Protected)
export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const admin = await verifyAdminAuth(req);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 401 });
    }

    const { id } = await context.params;
    await connectDB();

    const consultation = await Consultation.findByIdAndDelete(id);
    if (!consultation) {
      return NextResponse.json({ error: "Consultation record not found" }, { status: 404 });
    }

    console.log(`🗑️ Consultation deleted by admin: ${id}`);
    return NextResponse.json({
      success: true,
      message: "Consultation deleted successfully",
    });
  } catch (error: any) {
    console.error("❌ DELETE consultation error:", error);
    return NextResponse.json({ error: "Failed to delete consultation" }, { status: 500 });
  }
}
