"use client";
import React, { useState } from "react";
import { PRICING_TIERS, ADDON_OPTIONS, GROUND_RULES } from "@/lib/pricingData";
import { Check, ShieldCheck, ArrowRight, CreditCard, Clock, Sparkles, CheckSquare, Zap } from "lucide-react";
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
        description: `50% Advance for ${tier.name} Tier (${currency === "INR" ? "₹" : "$"}${advanceAmount.toLocaleString()})`,
        image: "/images/newlogo-clean.png",
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
            alert(`🎉 Payment Successful! Payment ID: ${response.razorpay_payment_id}. Your 50% advance for ${tier.name} package is confirmed.`);
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
          color: "#000000",
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
    <section id="pricing" className="py-24 sm:py-32 bg-black text-white relative overflow-hidden">

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-white/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Row with Currency Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-white border border-white/30 text-xs font-semibold uppercase tracking-wider inline-block mb-3">
              PRICING
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
              Website &amp; AI Automation Pricing
            </h2>
            <p className="text-base sm:text-lg text-slate-400 mt-2 max-w-2xl font-medium">
              Choose a website tier or an AI automation package. Fixed pricing, 50% due upfront.
            </p>
          </div>

          {/* Google Style INR / USD Currency Toggle */}
          <div className="flex items-center bg-slate-900/90 p-1.5 rounded-full border border-slate-800 self-start md:self-auto shadow-inner">
            <button
              type="button"
              onClick={() => setCurrency("INR")}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all ${
                currency === "INR"
                  ? "bg-white text-black shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              ₹ INR
            </button>
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all ${
                currency === "USD"
                  ? "bg-white text-black shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              $ USD
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              style={tier.popular ? { borderColor: "var(--accent-amber)" } : undefined}
              className={`rounded-3xl p-8 sm:p-9 flex flex-col justify-between relative transition-all duration-300 ${
                tier.popular
                  ? "bg-[#171717] text-white border-2 shadow-[0_20px_60px_-15px_rgba(217,119,6,0.25)] scale-[1.03]"
                  : "bg-[#0f172a]/70 text-white border border-slate-800 shadow-xl hover:border-slate-700"
              }`}
            >
              {tier.popular && (
                <div style={{ background: "var(--accent-amber)" }} className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white font-semibold text-[10px] uppercase tracking-widest shadow-md">
                  Most popular choice
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-semibold text-white">{tier.name}</h3>
                  {tier.popular && <Sparkles style={{ color: "var(--accent-amber)" }} className="w-5 h-5" />}
                </div>
                <p className="text-xs text-slate-400 mb-6 font-medium leading-relaxed">{tier.tagline}</p>

                {/* Price Display & Range */}
                <div className="mb-6 pb-6 border-b border-slate-800">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                      {currency === "INR" ? `₹${tier.priceINR.toLocaleString()}` : `$${tier.priceUSD.toLocaleString()}`}
                    </span>
                    <span className="text-xs text-slate-400 font-bold">
                      {currency === "INR" ? `– ${tier.priceRangeINR.split('–')[1]}` : `– ${tier.priceRangeUSD.split('–')[1]}`}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-slate-300 font-bold mt-2.5">
                    <Clock className="w-3.5 h-3.5 mr-1.5" />
                    <span>{tier.deliveryTime}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3.5 mb-8">
                  {tier.features.map((feat) => (
                    <div key={feat} className="flex items-start space-x-3 text-xs font-semibold text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-400" />
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
                className={`w-full py-4 px-4 rounded-2xl font-semibold text-sm flex items-center justify-center space-x-2 shadow-lg transition-all ${
                  tier.popular
                    ? "bg-white text-black hover:scale-[1.02] shadow-[0_10px_25px_rgba(255,255,255,0.2)]"
                    : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600"
                }`}
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
        <div className="mb-20">
          <div className="flex items-center space-x-2 mb-6">
            <Zap className="w-4 h-4 text-white" />
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-300">
              AVAILABLE ADD-ONS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ADDON_OPTIONS.map((addon) => (
              <div
                key={addon.id}
                className="bg-[#111827] p-5 rounded-2xl border border-slate-800 flex items-center justify-between hover:border-white/50 transition-all hover:translate-x-1"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-white" />
                  <span className="text-sm font-bold text-slate-200">{addon.name}</span>
                </div>
                <span className="text-sm font-mono font-semibold text-white">
                  {currency === "INR" ? addon.priceDisplayINR : addon.priceDisplayUSD}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* GROUND RULES SECTION */}
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <ShieldCheck className="w-4 h-4 text-white" />
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-300">
              TERMS
            </h3>
          </div>
          
          <div className="bg-[#111827] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {GROUND_RULES.map((rule, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm font-semibold text-slate-300">
                  <CheckSquare className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
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
