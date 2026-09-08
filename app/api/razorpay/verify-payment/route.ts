// app/api/razorpay/verify-payment/route.ts - Enterprise Cryptographic Payment Verification Route
import { NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";
import { timingSafeStringCompare } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";
import { sendAdminNotification, paymentReceivedEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, tierName } = await req.json();

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

    // Fetch the order's authoritative amount/currency from Razorpay itself rather
    // than trusting client-supplied values, which could be tampered with before
    // reaching this endpoint (the signature only proves order_id+payment_id match,
    // not what the client claims was paid).
    let amount = 0;
    let currency = "INR";
    try {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        key_secret,
      });
      const order = await razorpay.orders.fetch(razorpay_order_id);
      amount = Number(order.amount) / 100;
      currency = String(order.currency);
    } catch (fetchErr) {
      console.error("Failed to fetch order details from Razorpay for notification:", fetchErr);
    }

    // Persist and notify — failures here must never turn a genuinely verified
    // payment into an error response for the customer.
    try {
      await connectDB();
      await Payment.create({
        tierName: String(tierName || "Unknown").slice(0, 100),
        amount,
        currency,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
      });

      const { subject, html } = paymentReceivedEmail({
        tierName: String(tierName || "Unknown"),
        amount,
        currency,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
      });
      sendAdminNotification(subject, html);
    } catch (persistErr) {
      console.error("Failed to persist/notify verified payment:", persistErr);
    }

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
