"use client";
import React, { useState } from "react";
import { PRICING_TIERS, ADDON_OPTIONS, GROUND_RULES } from "@/lib/pricingData";
import { Check, ShieldCheck, ArrowRight, CreditCard, Clock, CheckSquare, Zap } from "lucide-react";
import { loadRazorpayScript } from "@/lib/razorpay";

export default function PricingSection() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [loadingTierId, setLoadingTierId] = useState<string | null>(null);

  const handleRazorpayCheckout = async (tier: (typeof PRICING_TIERS)[0]) => {
    try {
      setLoadingTierId(tier.id);

      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        alert("Failed to load Razorpay SDK. Please check your internet connection.");
        setLoadingTierId(null);
        return;
      }

      // 50% Advance amount calculation
      const fullPrice = currency === "INR" ? tier.priceINR : tier.priceUSD;
      const advanceAmount = Math.round(fullPrice * 0.5);

      // Create order on backend API
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: advanceAmount,
          currency: currency,
          receipt: `receipt_${tier.id}_${Date.now()}`,
        }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.orderId) {
        alert(orderData.error || "Failed to initiate Razorpay order.");
        setLoadingTierId(null);
        return;
      }

      // Open Razorpay Checkout Modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "CustomeAI",
        image: "/images/reallogo-transparent.png",
        description: `50% Advance for ${tier.name} Tier (${currency === "INR" ? "₹" : "$"}${advanceAmount.toLocaleString()})`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/razorpay/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              tierName: tier.name,
              amount: advanceAmount,
              currency: currency,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyRes.ok && verifyData.success) {
            alert(`Payment received. Payment ID: ${response.razorpay_payment_id}. Your 50% advance for the ${tier.name} package is confirmed, and we will be in touch within 24 hours.`);
          } else {
            alert(verifyData.error || "Payment verification failed. Please contact support.");
          }
          setLoadingTierId(null);
        },
        modal: {
          // User closed the checkout modal without completing payment
          ondismiss: () => {
            setLoadingTierId(null);
          },
        },
        theme: {
          // Razorpay's modal is an iframe and cannot read our CSS variables, so
          // this must be kept in sync with --accent in globals.css by hand.
          color: "#1b5e9c",
        },
      };

      const razorpayWindow = new (window as any).Razorpay(options);

      razorpayWindow.on("payment.failed", (response: any) => {
        console.error("Razorpay payment failed:", response.error);
        alert(`Payment failed: ${response.error?.description || "Please try again."}`);
        setLoadingTierId(null);
      });

      razorpayWindow.open();
    } catch (err: any) {
      console.error(err);
      alert("An unexpected error occurred during Razorpay checkout.");
      setLoadingTierId(null);
    }
  };

  return (
    <section id="pricing" className="py-14 sm:py-16 bg-white relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top Header Row with Currency Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
              Pricing
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight">
              Website &amp; AI Automation Pricing
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-2 max-w-2xl font-medium">
              Choose a website tier or an AI automation package. Fixed pricing, 50% due upfront.
            </p>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center bg-[var(--surface-alt)] p-1 rounded-full border border-[var(--border-default)] self-start md:self-auto">
            <button
              type="button"
              onClick={() => setCurrency("INR")}
              className={`px-6 py-2 rounded-full text-xs font-semibold transition-all ${
                currency === "INR"
                  ? "bg-white text-slate-900 shadow-sm border border-[var(--border-default)]"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              ₹ INR
            </button>
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={`px-6 py-2 rounded-full text-xs font-semibold transition-all ${
                currency === "USD"
                  ? "bg-white text-slate-900 shadow-sm border border-[var(--border-default)]"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              $ USD
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              style={tier.popular ? { borderColor: "var(--accent)", borderWidth: "2px" } : undefined}
              className="glass-card-pro p-6 sm:p-7 flex flex-col justify-between relative"
            >
              {tier.popular && (
                <div style={{ background: "var(--accent)" }} className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white font-semibold text-[10px] uppercase tracking-widest">
                  Most popular choice
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-semibold text-slate-900">{tier.name}</h3>
                </div>
                <p className="text-xs text-slate-500 mb-5 font-medium leading-relaxed">{tier.tagline}</p>

                {/* Price Display & Range */}
                <div className="mb-5 pb-5 border-b border-[var(--border-default)]">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
                      {currency === "INR" ? `₹${tier.priceINR.toLocaleString()}` : `$${tier.priceUSD.toLocaleString()}`}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">
                      {currency === "INR" ? `to ${tier.priceRangeINR.split(' to ')[1]}` : `to ${tier.priceRangeUSD.split(' to ')[1]}`}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-slate-600 font-bold mt-2">
                    <Clock className="w-3.5 h-3.5 mr-1.5" />
                    <span>{tier.deliveryTime}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-6">
                  {tier.features.map((feat) => (
                    <div key={feat} className="flex items-start space-x-3 text-xs font-semibold text-slate-700">
                      <div style={{ color: "var(--accent)" }} className="w-4 h-4 rounded-full bg-[var(--surface-alt)] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Razorpay Checkout Button (50% Advance) */}
              <button
                type="button"
                onClick={() => handleRazorpayCheckout(tier)}
                disabled={loadingTierId === tier.id}
                className="btn-yellow-solid w-full py-3.5 px-4 text-sm flex items-center justify-center space-x-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>
                  {loadingTierId === tier.id ? "Processing..." : `Pay 50% Advance (${currency === "INR" ? `₹${Math.round(tier.priceINR * 0.5).toLocaleString()}` : `$${Math.round(tier.priceUSD * 0.5).toLocaleString()}`})`}
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* ADD-ONS SECTION */}
        <div className="mb-10">
          <div className="flex items-center space-x-2 mb-4">
            <Zap style={{ color: "var(--accent)" }} className="w-4 h-4" />
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              AVAILABLE ADD-ONS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ADDON_OPTIONS.map((addon) => (
              <div
                key={addon.id}
                className="glass-card-pro p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div style={{ background: "var(--accent)" }} className="w-1.5 h-1.5 rounded-full" />
                  <span className="text-sm font-bold text-slate-800">{addon.name}</span>
                </div>
                <span className="text-sm font-semibold text-slate-900">
                  {currency === "INR" ? addon.priceDisplayINR : addon.priceDisplayUSD}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* GROUND RULES SECTION */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <ShieldCheck style={{ color: "var(--accent)" }} className="w-4 h-4" />
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              TERMS
            </h3>
          </div>

          <div className="glass-card-pro p-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GROUND_RULES.map((rule, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckSquare style={{ color: "var(--accent)" }} className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
