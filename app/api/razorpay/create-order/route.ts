// app/api/razorpay/create-order/route.ts - Enterprise Resilient Payment Order Route
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { PRICING_TIERS } from "@/lib/pricingData";

// The 50% advance rule, kept in one place so the button label and the order
// amount can never drift apart.
const ADVANCE_FRACTION = 0.5;

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

    const { tierId, currency = "INR" } = await req.json();

    // Price is resolved server-side from the tier id, NEVER taken from the
    // client. Previously the request sent its own `amount`, so anyone hitting
    // this endpoint directly could create a live order for ₹1 against a
    // ₹30,000 package. The tier catalogue on the server is the only source of
    // truth for what each package costs.
    const tier = PRICING_TIERS.find((t) => t.id === tierId);
    if (!tier) {
      return NextResponse.json({ error: "Unknown package selected" }, { status: 400 });
    }

    const sanitizedCurrency = String(currency).toUpperCase().trim();
    if (!["INR", "USD"].includes(sanitizedCurrency)) {
      return NextResponse.json({ error: "Unsupported currency" }, { status: 400 });
    }

    const fullPrice = sanitizedCurrency === "INR" ? tier.priceINR : tier.priceUSD;
    const advanceAmount = Math.round(fullPrice * ADVANCE_FRACTION);

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

    // Amount in Razorpay must be passed in subunits (paise for INR, cents for USD)
    const options = {
      amount: Math.round(advanceAmount * 100),
      currency: sanitizedCurrency,
      receipt: `rcpt_${tier.id}_${Date.now()}`.slice(0, 40),
      payment_capture: 1,
      notes: {
        tierId: tier.id,
        tierName: tier.name,
        advanceOf: String(fullPrice),
        currency: sanitizedCurrency,
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: key_id,
      // Echoed back so the checkout modal shows the same figure the server
      // actually charged, rather than a client-side recomputation.
      tierName: tier.name,
      advanceAmount,
    });
  } catch (error: any) {
    console.error("Razorpay Order Creation Error:", error);
    const statusCode = error?.statusCode === 401 ? 401 : 500;
    return NextResponse.json(
      { error: error?.error?.description || error?.message || "Failed to initiate payment order" },
      { status: statusCode }
    );
  }
}
