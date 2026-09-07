// app/api/razorpay/verify-payment/route.ts - Enterprise Cryptographic Payment Verification Route
import { NextResponse } from "next/server";
import crypto from "crypto";
import { timingSafeStringCompare } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing required payment parameters" }, { status: 400 });
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_secret) {
      console.error("RAZORPAY_KEY_SECRET environment variable is not set");
      return NextResponse.json({ error: "Payment verification is not configured" }, { status: 500 });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(body.toString())
      .digest("hex");

    // Timing-safe comparison to prevent signature length/timing leakage
    const isSignatureValid = timingSafeStringCompare(expectedSignature, razorpay_signature);

    if (!isSignatureValid) {
      console.warn(`❌ Invalid Razorpay signature attempt for order: ${razorpay_order_id}`);
      return NextResponse.json({ error: "Invalid payment verification signature" }, { status: 400 });
    }

    console.log(`✅ Verified Razorpay payment: ${razorpay_payment_id} for order: ${razorpay_order_id}`);

    return NextResponse.json({
      success: true,
      message: "Razorpay payment verified successfully",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (error: any) {
    console.error("Razorpay Payment Verification Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to verify Razorpay payment" },
      { status: 500 }
    );
  }
}
