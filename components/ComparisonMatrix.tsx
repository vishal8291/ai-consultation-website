"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, X, Sparkles, Shield, Zap, Award } from "lucide-react";

const COMPARISON_ROWS = [
  {
    feature: "How fast you get it",
    freelance: "4 - 8 weeks",
    agency: "2 - 4 months",
    vishal: "7 - 21 days",
    vishalHighlight: true,
  },
  {
    feature: "How well it's built",
    freelance: "Slow, template-based sites",
    agency: "Slow, overcomplicated systems",
    vishal: "Fast, modern, scores 100/100 on speed",
    vishalHighlight: true,
  },
  {
    feature: "AI & automation",
    freelance: "None, or a basic plugin",
    agency: "Expensive add-on, extra cost",
    vishal: "Built in, trained on your own data",
    vishalHighlight: true,
  },
  {
    feature: "How you're charged",
    freelance: "Hourly, hard to predict",
    agency: "High markup ($30k+)",
    vishal: "One fixed price, listed upfront",
    vishalHighlight: true,
  },
  {
    feature: "Who owns it",
    freelance: "Sometimes shared",
    agency: "Locked into their platform",
    vishal: "You own 100% of it",
    vishalHighlight: true,
  },
  {
    feature: "Support after launch",
    freelance: "0 - 7 days",
    agency: "Paid monthly plan",
    vishal: "30 - 90 days included, free",
    vishalHighlight: true,
  },
];

export default function ComparisonMatrix() {
  return (
    <section className="py-14 sm:py-16 bg-white relative overflow-hidden border-y border-[var(--border-default)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="px-3.5 py-1.5 rounded-full bg-white border border-[var(--border-default)] text-slate-700 text-xs font-semibold uppercase tracking-wider inline-block mb-3">
            COMPARISON
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4 tracking-tight">
            CustomeAI vs. Web Design Agencies
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            See how we compare against traditional agencies and freelancers.
          </p>
        </div>

        {/* Comparison Table Box */}
        <div className="glass-card-pro overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-[var(--border-default)] text-xs font-semibold uppercase tracking-wider text-slate-600">
                  <th className="p-6">What matters</th>
                  <th className="p-6 text-slate-400">A Freelancer</th>
                  <th className="p-6 text-slate-400">A Regular Agency</th>
                  <th style={{ background: "var(--accent)" }} className="p-6 text-white font-semibold">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4" />
                      <span>CustomeAI</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-default)] text-sm">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[var(--surface-alt)] transition-colors">
                    <td className="p-6 font-semibold text-slate-900 text-sm">{row.feature}</td>
                    <td className="p-6 text-slate-500 text-xs font-medium">{row.freelance}</td>
                    <td className="p-6 text-slate-500 text-xs font-medium">{row.agency}</td>
                    <td className="p-6 bg-[var(--surface-alt)] text-slate-900 font-semibold text-sm">
                      <div className="flex items-center space-x-2">
                        <div style={{ color: "var(--accent)" }} className="w-5 h-5 rounded-full bg-white border border-[var(--border-default)] flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5" />
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
