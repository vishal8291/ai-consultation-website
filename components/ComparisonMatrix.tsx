"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, X, Sparkles, Shield, Zap, Award } from "lucide-react";

const COMPARISON_ROWS = [
  {
    feature: "Delivery Speed",
    freelance: "4 - 8 Weeks",
    agency: "2 - 4 Months",
    vishal: "7 - 21 Days",
    vishalHighlight: true,
  },
  {
    feature: "Tech Architecture & Performance",
    freelance: "Slow WordPress / Templates",
    agency: "Heavy Monoliths",
    vishal: "Next.js 16 + Turbopack (100/100)",
    vishalHighlight: true,
  },
  {
    feature: "Built-in AI & Agentic Workflows",
    freelance: "None or basic plugin",
    agency: "Expensive custom add-on",
    vishal: "Custom RAG Agents & OCR Parsers",
    vishalHighlight: true,
  },
  {
    feature: "Pricing Transparency",
    freelance: "Unpredictable Hourly Billing",
    agency: "High Markups ($30k+)",
    vishal: "Itemized Fixed Pricing",
    vishalHighlight: true,
  },
  {
    feature: "Code & IP Ownership",
    freelance: "Partial / Shared",
    agency: "Locked SaaS platform",
    vishal: "Full Source Code Ownership",
    vishalHighlight: true,
  },
  {
    feature: "Post-Launch Support",
    freelance: "0 - 7 Days",
    agency: "Paid Monthly Retainer",
    vishal: "30 - 90 Days Included",
    vishalHighlight: true,
  },
];

export default function ComparisonMatrix() {
  return (
    <section className="py-24 sm:py-32 bg-black text-white relative overflow-hidden border-y border-slate-800 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1.5 rounded-full bg-slate-800 text-slate-200 text-xs font-black uppercase tracking-wider inline-block mb-3">
            COMPARISON
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
            How We Compare Against The Market
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-medium">
            See how we compare against traditional agencies and freelancers.
          </p>
        </div>

        {/* Comparison Table Box */}
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black border-b border-slate-800 text-xs font-black uppercase tracking-wider text-slate-300">
                  <th className="p-6">Deliverable / Standard</th>
                  <th className="p-6 text-slate-500">Solo Freelancer</th>
                  <th className="p-6 text-slate-500">Traditional Agency</th>
                  <th className="p-6 bg-white text-black border-x border-white font-black">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-black" />
                      <span>vishal.buildss</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-sm">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-6 font-black text-white text-sm">{row.feature}</td>
                    <td className="p-6 text-slate-400 text-xs font-medium">{row.freelance}</td>
                    <td className="p-6 text-slate-400 text-xs font-medium">{row.agency}</td>
                    <td className="p-6 bg-white/10 border-x border-white/20 text-white font-black text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span>{row.vishal}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
