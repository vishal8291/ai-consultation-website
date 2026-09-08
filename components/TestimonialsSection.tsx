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
    color: "var(--accent)",
  },
  {
    icon: Code,
    title: "You own everything, 100%",
    desc: "The website, the code, the database — all yours. You're never locked in to us.",
    badge: "Full Ownership",
    color: "var(--accent-teal)",
  },
  {
    icon: DollarSign,
    title: "Clear, upfront pricing",
    desc: "Every quote spells out exactly what you're paying for. No hidden fees.",
    badge: "Upfront Pricing",
    color: "var(--accent-amber)",
  },
  {
    icon: ShieldCheck,
    title: "30 to 90 days of free support",
    desc: "After launch, we keep an eye on things and fix anything that comes up.",
    badge: "Free Support",
    color: "var(--accent)",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4 tracking-tight">
            Our Website &amp; AI Development Standards
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Every project we take on comes with the same four promises.
          </p>
        </div>

        {/* Engineering Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ENGINEERING_STANDARDS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-800/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-700 flex flex-col justify-between hover:border-white transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div style={{ background: item.color }} className="w-12 h-12 rounded-2xl text-white flex items-center justify-center font-semibold shadow-md group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span style={{ borderColor: item.color, color: item.color }} className="px-2.5 py-1 rounded-full bg-slate-900 text-[10px] font-semibold uppercase tracking-widest border">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-slate-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-700/60 flex items-center space-x-2 text-xs font-bold text-white">
                  <CheckCircle2 style={{ color: item.color }} className="w-4 h-4" />
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
