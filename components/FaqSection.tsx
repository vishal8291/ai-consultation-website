"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How long will my project take?",
    a: "It depends on what you need built. We agree the timeline with you on the first call, before any work or payment starts.",
  },
  {
    q: "How do you work out pricing?",
    a: "We look at the time it'll take, what's involved (design, database, AI setup), and hosting costs, then give you one clear price. No hidden agency markups.",
  },
  {
    q: "Do I own the website and all the code?",
    a: "Yes. Once the project is complete and paid for, everything, code, designs, all of it, is yours.",
  },
  {
    q: "Why is my site fast? What makes it fast?",
    a: "We build with modern, well-tested tools that are simply built for speed, and host them on fast, reliable servers. Most of our sites score 98 to 100 out of 100 on Google's own speed test.",
  },
  {
    q: "Can I add AI features later, like a support bot or invoice reader?",
    a: "Yes. We build every site so new features can be added later without rebuilding it from scratch: AI chat support, smart document readers, or online payments, whenever you're ready.",
  },
  {
    q: "What support do I get after launch?",
    a: "Every project includes 30 to 90 days of free support. We fix bugs and keep an eye on performance during that time.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="section-light py-24 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight">
            FAQ
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white overflow-hidden border-b border-slate-100"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between space-x-4 focus:outline-none"
                >
                  <span className="text-base font-semibold text-slate-900 leading-snug flex gap-3">
                    {/* The site already speaks terminal elsewhere; carrying a
                        mono prompt marker here is cheaper than an icon and
                        reads as part of the same voice. */}
                    <span
                      aria-hidden="true"
                      className="font-mono text-sm shrink-0 select-none"
                      style={{ color: "var(--accent)" }}
                    >
                      Q&gt;
                    </span>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 text-slate-500 ${isOpen ? "rotate-180" : ""}`}
                  />
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
