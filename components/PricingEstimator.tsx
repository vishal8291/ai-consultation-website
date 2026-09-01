"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ADDON_OPTIONS, PRICING_TIERS } from "@/lib/pricingData";
import { Check, ArrowRight, ShieldCheck, CreditCard } from "lucide-react";
import { loadRazorpayScript } from "@/lib/razorpay";

export default function PricingEstimator() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [selectedTierId, setSelectedTierId] = useState<string>("business");
  const [pageCount, setPageCount] = useState<number>(5);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["extra-page", "logo-design"]);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const currentTier = PRICING_TIERS.find((t) => t.id === selectedTierId) || PRICING_TIERS[1];
  
  const basePrice = currency === "INR" ? currentTier.priceINR : currentTier.priceUSD;
  const perPageExtra = currency === "INR" ? 2000 : 25;
  const pageCost = Math.max(0, pageCount - 1) * perPageExtra;

  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const item = ADDON_OPTIONS.find((a) => a.id === addonId);
    if (!item) return sum;
    return sum + (currency === "INR" ? item.priceINR : item.priceUSD);
  }, 0);

  const totalEstimate = basePrice + pageCost + addonsTotal;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleRazorpayPayment = async () => {
    try {
      setIsProcessingPayment(true);

      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        alert("Failed to load Razorpay SDK. Please check your internet connection.");
        setIsProcessingPayment(false);
        return;
      }

      // 50% Advance calculation
      const advanceAmount = Math.round(totalEstimate * 0.5);

      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: advanceAmount,
          currency: currency,
          receipt: `quote_${selectedTierId}_${Date.now()}`,
        }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.orderId) {
        alert(orderData.error || "Failed to create Razorpay order.");
        setIsProcessingPayment(false);
        return;
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "vishal.buildss",
        description: `50% Advance Quote Lock (${currency === "INR" ? "₹" : "$"}${advanceAmount.toLocaleString()})`,
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
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyRes.ok && verifyData.success) {
            alert(`🎉 Payment Verified! Payment ID: ${response.razorpay_payment_id}. Your 50% advance for custom quote is confirmed.`);
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "Valued Client",
          email: "client@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#000000",
        },
      };

      const razorpayWindow = new (window as any).Razorpay(options);
      razorpayWindow.open();
    } catch (err: any) {
      console.error(err);
      alert("An error occurred during Razorpay checkout.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <section id="estimator" className="py-24 bg-white/85 text-slate-900 relative overflow-hidden bg-grid-pattern border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Estimate Your Project Cost
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Select your scope, page count, and add-ons to get an instant estimate.
          </p>
        </div>

        {/* 2-Part Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* PART 1 (LEFT SIDE): Interactive Quote Estimator Builder */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200 shadow-xl space-y-8">
            
            {/* Currency Selector */}
            <div className="flex justify-between items-center">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Select Currency
              </label>
              <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200">
                <button
                  type="button"
                  onClick={() => setCurrency("INR")}
                  className={`px-4 py-1 rounded-full text-xs font-black transition-all ${currency === "INR" ? "bg-black text-white shadow-xs" : "text-slate-600"}`}
                >
                  ₹ INR
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency("USD")}
                  className={`px-4 py-1 rounded-full text-xs font-black transition-all ${currency === "USD" ? "bg-black text-white shadow-xs" : "text-slate-600"}`}
                >
                  $ USD
                </button>
              </div>
            </div>

            {/* Step 1: Core Website Scope */}
            <div>
              <label className="block text-xs font-black text-slate-900 mb-3 uppercase tracking-wider">
                1. Select Core Website Scope
              </label>
              <div className="grid grid-cols-3 gap-3">
                {PRICING_TIERS.map((tier) => (
                  <button
                    type="button"
                    key={tier.id}
                    onClick={() => setSelectedTierId(tier.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      selectedTierId === tier.id
                        ? "bg-black text-white border-black shadow-md"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:border-black"
                    }`}
                  >
                    <div className={`font-extrabold text-xs ${selectedTierId === tier.id ? "text-white" : "text-slate-900"}`}>
                      {tier.name}
                    </div>
                    <div className={`text-[11px] font-mono font-bold mt-1 ${selectedTierId === tier.id ? "text-slate-300" : "text-slate-600"}`}>
                      {currency === "INR" ? `₹${tier.priceINR.toLocaleString()}` : `$${tier.priceUSD.toLocaleString()}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Page Count Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  2. Total Estimated Pages
                </label>
                <span className="text-xs sm:text-sm font-black text-white bg-black px-3 py-1 rounded-lg border border-black">
                  {pageCount} Pages
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={pageCount}
                onChange={(e) => setPageCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1 font-mono">
                <span>1 page</span>
                <span>25 pages</span>
              </div>
            </div>

            {/* Step 3: Choose Add-ons */}
            <div>
              <label className="block text-xs font-black text-slate-900 mb-3 uppercase tracking-wider">
                3. Choose Add-ons
              </label>
              <div className="space-y-2.5">
                {ADDON_OPTIONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  const price = currency === "INR" ? addon.priceDisplayINR : addon.priceDisplayUSD;
                  return (
                    <button
                      type="button"
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isChecked
                          ? "bg-slate-100 border-black text-slate-900 shadow-xs"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-400"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${isChecked ? "bg-black border-black text-white" : "border-slate-300 bg-white"}`}>
                          {isChecked && <Check className="w-3.5 h-3.5 font-black text-white" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{addon.name}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-700 ml-2 flex-shrink-0">
                        +{price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total Summary Row & Razorpay Checkout CTA */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Total Estimated Cost</p>
                <motion.p
                  key={totalEstimate}
                  initial={{ scale: 0.95, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl font-black text-black"
                >
                  {currency === "INR" ? `₹${totalEstimate.toLocaleString()}` : `$${totalEstimate.toLocaleString()}`}
                </motion.p>
              </div>

              <button
                type="button"
                onClick={handleRazorpayPayment}
                disabled={isProcessingPayment}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl btn-yellow-solid text-white font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md"
              >
                <CreditCard className="w-4 h-4 text-white" />
                <span>{isProcessingPayment ? "Processing..." : `Pay 50% Advance (${currency === "INR" ? `₹${Math.round(totalEstimate * 0.5).toLocaleString()}` : `$${Math.round(totalEstimate * 0.5).toLocaleString()}`})`}</span>
              </button>
            </div>
          </div>

          {/* PART 2 (RIGHT SIDE): Clean Video Player Only */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative bg-black rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-800">
              <video
                src="/video1.mp4"
                controls
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-3xl"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Trust Assurance Card */}
            <div className="p-5 rounded-2xl bg-slate-100 border border-slate-300 text-xs text-slate-800 space-y-2">
              <div className="flex items-center space-x-2 font-bold text-black">
                <ShieldCheck className="w-4 h-4 text-black" />
                <span>Fixed Pricing Guarantee</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                50% advance to start, 50% on delivery. Support for 30 days post-delivery (free) with zero hidden fees.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
