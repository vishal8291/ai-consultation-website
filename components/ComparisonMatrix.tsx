"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, X, Sparkles, Shield, Zap, Award } from "lucide-react";

const COMPARISON_ROWS = [
  {
    feature: "Turnaround Delivery Speed",
    freelance: "4 - 8 Weeks",
    agency: "2 - 4 Months",
    vishal: "7 - 21 Days (Sprint)",
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
    feature: "Pricing & Math Transparency",
    freelance: "Unpredictable Hourly Billing",
    agency: "High Markups ($30k+)",
    vishal: "Itemized Fixed Math Breakdown",
    vishalHighlight: true,
  },
  {
    feature: "Code & IP Ownership",
    freelance: "Partial / Shared",
    agency: "Locked SaaS platform",
    vishal: "100% Full Source Code Rights",
    vishalHighlight: true,
  },
  {
    feature: "Post-Launch Warranty",
    freelance: "0 - 7 Days",
    agency: "Paid Monthly Retainer",
    vishal: "30 - 90 Days Included Warranty",
    vishalHighlight: true,
  },
];

export default function ComparisonMatrix() {
  return (
    <section className="py-24 sm:py-32 bg-[#fafaf8] text-slate-900 relative overflow-hidden border-y border-slate-200 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1.5 rounded-full bg-slate-200 text-slate-800 text-xs font-black uppercase tracking-wider inline-block mb-3">
            TECHNICAL BENCHMARK
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            How We Compare Against The Market
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            See how our modern full-stack engineering approach compares against traditional agencies and solo freelancers.
          </p>
        </div>

        {/* Comparison Table Box */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-700">
                  <th className="p-6">Deliverable / Standard</th>
                  <th className="p-6 text-slate-500">Solo Freelancer</th>
                  <th className="p-6 text-slate-500">Traditional Agency</th>
                  <th className="p-6 bg-gradient-to-r from-yellow-400 to-amber-500 text-black border-x border-amber-500 font-black">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-black" />
                      <span>vishal.buildss</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-amber-50/30 transition-colors">
                    <td className="p-6 font-black text-slate-900 text-sm">{row.feature}</td>
                    <td className="p-6 text-slate-600 text-xs font-medium">{row.freelance}</td>
                    <td className="p-6 text-slate-600 text-xs font-medium">{row.agency}</td>
                    <td className="p-6 bg-amber-50/60 border-x border-amber-200 text-slate-900 font-black text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-700 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-amber-800" />
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
