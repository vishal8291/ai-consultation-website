"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How fast can you build and launch my website or AI system?",
    a: "Our Small/Starter websites launch in 5-7 days. Medium business portals and AI customer support bots launch in 14-21 days. Enterprise SaaS platforms take 21-35 days.",
  },
  {
    q: "How do you calculate your fair pricing math?",
    a: "We compute transparent pricing by adding estimated engineering hours (at fair $35-$60/hr rates), component costs (UI/UX design, database architecture, AI vector store setup), and server deployment fees without arbitrary agency markups.",
  },
  {
    q: "Do I own 100% of the source code and IP?",
    a: "Yes! Upon final project delivery and sign-off, 100% of the source code, design assets, database schemas, and intellectual property rights are fully transferred to you.",
  },
  {
    q: "What technologies do you use to ensure sub-second page speed?",
    a: "We build with Next.js 16 (Turbopack), React 19 Server Components, TailwindCSS v4, and Vercel/Cloudflare Edge networks to consistently hit 98-100 Google PageSpeed scores.",
  },
  {
    q: "Can I add AI features like a 24/7 Support Bot or PDF Invoice Extractor later?",
    a: "Absolutely. All our websites are built with modular architecture, allowing you to add AI agents, RAG search, or payment pipelines at any time.",
  },
  {
    q: "What post-launch support and warranty is included?",
    a: "Every tier includes 30 to 90 days of post-launch warranty covering bug fixes, speed telemetry monitoring, and 1-on-1 strategy handoffs.",
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-white text-slate-900 relative overflow-hidden bg-grid-pattern">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            Everything you need to know about our web engineering process, fair pricing math, and post-launch support.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:border-amber-400 transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between space-x-4 focus:outline-none"
                >
                  <span className="text-base font-extrabold text-slate-900 leading-snug">
                    {faq.q}
                  </span>
                  <div className={`p-2 rounded-xl border transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180 bg-yellow-400 text-black border-amber-500 font-bold" : "bg-slate-100 text-slate-600 border-slate-200"}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-3.5"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
