// app/api/users/me/route.ts - Cryptographically Verified User Profile Endpoint
import { NextRequest, NextResponse } from "next/server";
import { verifyUserAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const userPayload = await verifyUserAuth(req);
    
    if (!userPayload || !userPayload.id) {
      return NextResponse.json({ error: "Unauthorized. Invalid or expired token." }, { status: 401 });
    }

    return NextResponse.json({
      id: userPayload.id,
      name: userPayload.name,
      email: userPayload.email,
      role: userPayload.role,
    });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
