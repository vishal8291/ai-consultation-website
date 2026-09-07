import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import PrakritiKnowledge from "@/models/PrakritiKnowledge";
import { PRAKRITI_DATASET } from "@/lib/prakritiDataset";
import { verifyAdminAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const admin = await verifyAdminAuth(req);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 401 });
    }

    await connectDB();

    // Clear existing knowledge entries and re-seed
    await PrakritiKnowledge.deleteMany({});
    const inserted = await PrakritiKnowledge.insertMany(PRAKRITI_DATASET);

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${inserted.length} Prakriti knowledge Q&A pairs into MongoDB!`,
      count: inserted.length,
    });
  } catch (error: any) {
    console.error("Failed to seed Prakriti Knowledge:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to seed knowledge base" },
      { status: 500 }
    );
  }
}
