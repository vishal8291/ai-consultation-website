"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, Code, DollarSign, CheckCircle2, Lock, Cpu, Sparkles } from "lucide-react";

const ENGINEERING_STANDARDS = [
  {
    icon: Clock,
    title: "Delivered in 7 to 21 days",
    desc: "We check in at each step so your project stays on time.",
    badge: "Fast Turnaround",
  },
  {
    icon: Code,
    title: "You own everything, 100%",
    desc: "The website, the code, the database, all yours. You're never locked in to us.",
    badge: "Full Ownership",
  },
  {
    icon: DollarSign,
    title: "Clear, upfront pricing",
    desc: "Every quote spells out exactly what you're paying for. No hidden fees.",
    badge: "Upfront Pricing",
  },
  {
    icon: ShieldCheck,
    title: "30 to 90 days of free support",
    desc: "After launch, we keep an eye on things and fix anything that comes up.",
    badge: "Free Support",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-14 sm:py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4 tracking-tight">
            Our Website &amp; AI Development Standards
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Every project we take on comes with the same four promises.
          </p>
        </div>

        {/* Engineering Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ENGINEERING_STANDARDS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card-pro p-5 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div style={{ color: "var(--accent)" }} className="w-11 h-11 rounded-lg bg-[var(--surface-alt)] border border-[var(--border-default)] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-[var(--border-default)] flex items-center space-x-2 text-xs font-bold text-slate-800">
                  <CheckCircle2 style={{ color: "var(--accent)" }} className="w-4 h-4" />
                  <span>Included every time</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
