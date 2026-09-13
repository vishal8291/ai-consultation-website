// app/api/razorpay/create-order/route.ts - Enterprise Resilient Payment Order Route
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { PRICING_TIERS } from "@/lib/pricingData";
import { PROJECTS_DATA } from "@/lib/projectsData";

// The 50% advance rule for bespoke packages, kept in one place so the button
// label and the order amount can never drift apart.
const ADVANCE_FRACTION = 0.5;

type ResolvedPurchase = {
  id: string;
  label: string;
  kind: "tier" | "product";
  priceINR: number;
  priceUSD: number;
  /** Bespoke packages take a 50% advance; ready-built products are paid once. */
  chargeFraction: number;
};

/**
 * Both catalogues live on the server and are the only source of truth for what
 * anything costs. A request names what it wants to buy; it never says what that
 * costs.
 */
function resolvePurchase(tierId?: unknown, productId?: unknown): ResolvedPurchase | null {
  if (typeof tierId === "string" && tierId) {
    const tier = PRICING_TIERS.find((t) => t.id === tierId);
    if (!tier) return null;
    return {
      id: tier.id,
      label: tier.name,
      kind: "tier",
      priceINR: tier.priceINR,
      priceUSD: tier.priceUSD,
      chargeFraction: ADVANCE_FRACTION,
    };
  }

  if (typeof productId === "string" && productId) {
    const product = PROJECTS_DATA.find((p) => p.id === productId && p.forSale);
    if (!product?.forSale) return null;
    return {
      id: product.id,
      label: product.title,
      kind: "product",
      priceINR: product.forSale.priceINR,
      priceUSD: product.forSale.priceUSD,
      // A ready-built system has no delivery milestone to split payment
      // around, so it is charged in full rather than as an advance.
      chargeFraction: 1,
    };
  }

  return null;
}

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

    const { tierId, productId, currency = "INR" } = await req.json();

    // Price is resolved server-side from the id, NEVER taken from the client.
    // Previously the request sent its own `amount`, so anyone hitting this
    // endpoint directly could create a live order for ₹1 against a ₹30,000
    // package.
    const purchase = resolvePurchase(tierId, productId);
    if (!purchase) {
      return NextResponse.json({ error: "Unknown package or product selected" }, { status: 400 });
    }

    const sanitizedCurrency = String(currency).toUpperCase().trim();
    if (!["INR", "USD"].includes(sanitizedCurrency)) {
      return NextResponse.json({ error: "Unsupported currency" }, { status: 400 });
    }

    const fullPrice = sanitizedCurrency === "INR" ? purchase.priceINR : purchase.priceUSD;
    const chargeAmount = Math.round(fullPrice * purchase.chargeFraction);

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
      amount: Math.round(chargeAmount * 100),
      currency: sanitizedCurrency,
      receipt: `rcpt_${purchase.id}_${Date.now()}`.slice(0, 40),
      payment_capture: 1,
      notes: {
        purchaseId: purchase.id,
        purchaseKind: purchase.kind,
        purchaseName: purchase.label,
        fullPrice: String(fullPrice),
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
      // actually charged, rather than a client-side recomputation. The key
      // names are kept as-is for the existing pricing checkout flow.
      tierName: purchase.label,
      advanceAmount: chargeAmount,
      purchaseKind: purchase.kind,
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
