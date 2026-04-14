// app/api/consultations/[id]/route.ts (UPDATED - PRODUCTION READY)
import { connectDB } from "@/lib/mongodb";
import Consultation from "@/models/Consultation";
import { NextResponse } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

// ✅ GET - Fetch single consultation
export async function GET(req: Request, { params }: Params) {
  try {
    await connectDB();
    
    const consultation = await Consultation.findById(params.id).lean();
    
    if (!consultation) {
      return NextResponse.json(
        { error: "Consultation not found" }, 
        { status: 404 }
      );
    }

    console.log(`📋 Consultation viewed: ${params.id}`);
    return NextResponse.json(consultation);
    
  } catch (error: any) {
    console.error("❌ GET consultation error:", error);
    return NextResponse.json(
      { error: "Failed to fetch consultation" }, 
      { status: 500 }
    );
  }
}

// ✅ PATCH - Update status
export async function PATCH(req: Request, { params }: Params) {
  try {
    await connectDB();
    const { status } = await req.json();

    // Validate status enum
    const validStatuses = ["new", "contacted", "closed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be 'new', 'contacted', or 'closed'" },
        { status: 400 }
      );
    }

    const consultation = await Consultation.findByIdAndUpdate(
      params.id, 
      { status },
      { new: true, runValidators: true }
    );

    if (!consultation) {
      return NextResponse.json(
        { error: "Consultation not found" }, 
        { status: 404 }
      );
    }

    console.log(`🔄 Status updated: ${params.id} → ${status}`);
    return NextResponse.json({ 
      success: true, 
      consultation: {
        id: consultation._id,
        status: consultation.status,
        updatedAt: consultation.updatedAt
      }
    });

  } catch (error: any) {
    console.error("❌ PATCH consultation error:", error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: "Invalid status provided" }, 
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to update consultation" }, 
      { status: 500 }
    );
  }
}

// ✅ DELETE - Delete consultation
export async function DELETE(_: Request, { params }: Params) {
  try {
    await connectDB();
    
    const consultation = await Consultation.findByIdAndDelete(params.id);
    
    if (!consultation) {
      return NextResponse.json(
        { error: "Consultation not found" }, 
        { status: 404 }
      );
    }

    console.log(`🗑️ Consultation deleted: ${params.id}`);
    return NextResponse.json({ 
      success: true, 
      message: "Consultation deleted successfully"
    });

  } catch (error: any) {
    console.error("❌ DELETE consultation error:", error);
    return NextResponse.json(
      { error: "Failed to delete consultation" }, 
      { status: 500 }
    );
  }
}
