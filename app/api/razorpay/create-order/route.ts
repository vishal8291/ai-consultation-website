// app/api/razorpay/create-order/route.ts - Enterprise Resilient Payment Order Route
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    // Rate Limit: Max 10 order creation requests per minute per IP
    const rateCheck = checkRateLimit(`razorpay_order_${ip}`, { limit: 10, windowSeconds: 60 });
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: "Too many payment requests initiated. Please wait a moment." },
        { status: 429 }
      );
    }

    const { amount, currency = "INR", receipt = `receipt_${Date.now()}` } = await req.json();

    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0 || isNaN(numericAmount)) {
      return NextResponse.json({ error: "Invalid payment amount specified" }, { status: 400 });
    }

    // Maximum safe transaction sanity cap (e.g. ₹5,00,000 / $6,000)
    if (numericAmount > 500000) {
      return NextResponse.json({ error: "Amount exceeds maximum transaction threshold" }, { status: 400 });
    }

    const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_SpzzGC6RqbwBgQ";
    const key_secret = process.env.RAZORPAY_KEY_SECRET || "THfx4EJbTAw0q7EniSyER3Rw";

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
    return NextResponse.json(
      { error: error?.message || "Failed to initiate payment order" },
      { status: 500 }
    );
  }
}
