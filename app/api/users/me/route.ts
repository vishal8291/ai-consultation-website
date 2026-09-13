// app/api/users/me/route.ts - Cryptographically Verified User Profile Endpoint
import { NextRequest, NextResponse } from "next/server";
import { verifyUserAuth } from "@/lib/auth";

// A logged-out visitor is the normal case for this endpoint, not an error:
// the navbar asks on every page load. Answering that with a 401 made browsers
// log a red console error for every visitor on every page. So "not signed in"
// is a 200 carrying authenticated: false, and no profile data is ever returned
// without a valid token.
export async function GET(req: NextRequest) {
  try {
    const userPayload = await verifyUserAuth(req);

    if (!userPayload || !userPayload.id) {
      return NextResponse.json({ authenticated: false });
    }

    return NextResponse.json({
      authenticated: true,
      id: userPayload.id,
      name: userPayload.name,
      email: userPayload.email,
      role: userPayload.role,
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false });
  }
}
