// app/api/razorpay/create-order/route.ts - Enterprise Resilient Payment Order Route
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    // Rate Limit: Max 10 order creation requests per minute per IP
    const rateCheck = await checkRateLimit(`razorpay_order_${ip}`, { limit: 10, windowSeconds: 60 });
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: "Too many payment requests initiated. Please wait a moment." },
        { status: 429 }
      );
    }

    const { amount, currency = "INR", receipt = `receipt_${Date.now()}` } = await req.json();

    const numericAmount = Number(amount);
    // Razorpay's own floor is 100 paise; amount here is in whole currency units
    // (rupees/dollars) and gets converted to subunits below, so require >= 1.
    if (!numericAmount || isNaN(numericAmount) || numericAmount < 1) {
      return NextResponse.json({ error: "Amount must be at least 1 (100 paise)" }, { status: 400 });
    }

    // Maximum safe transaction sanity cap (e.g. ₹5,00,000 / $6,000)
    if (numericAmount > 500000) {
      return NextResponse.json({ error: "Amount exceeds maximum transaction threshold" }, { status: 400 });
    }

    const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_id || !key_secret) {
      console.error("RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET environment variables are not set");
      return NextResponse.json({ error: "Payments are not configured" }, { status: 500 });
    }

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const sanitizedCurrency = String(currency).toUpperCase().trim();
    if (!["INR", "USD"].includes(sanitizedCurrency)) {
      return NextResponse.json({ error: "Unsupported currency" }, { status: 400 });
    }

    // Amount in Razorpay must be passed in subunits (paise for INR, cents for USD)
    const options = {
      amount: Math.round(numericAmount * 100),
      currency: sanitizedCurrency,
      receipt: String(receipt).slice(0, 40),
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: key_id,
    });
  } catch (error: any) {
    console.error("Razorpay Order Creation Error:", error);
    // Razorpay auth failures (bad key_id/key_secret) come back as statusCode 401
    const statusCode = error?.statusCode === 401 ? 401 : 500;
    return NextResponse.json(
      { error: error?.error?.description || error?.message || "Failed to initiate payment order" },
      { status: statusCode }
    );
  }
}
