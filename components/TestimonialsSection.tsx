"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, Code, DollarSign, CheckCircle2, Lock, Cpu, Sparkles } from "lucide-react";

const ENGINEERING_STANDARDS = [
  {
    icon: Clock,
    title: "7 to 21 Days Delivery",
    desc: "Milestone-based delivery keeps your website or AI system on schedule.",
    badge: "Fast Turnaround",
  },
  {
    icon: Code,
    title: "100% Source Code & IP Ownership",
    desc: "You own the full source code, repositories, and database — no vendor lock-in.",
    badge: "Full Ownership",
  },
  {
    icon: DollarSign,
    title: "Transparent Quotes",
    desc: "Every quote includes a full scope breakdown, with no hidden fees.",
    badge: "Itemized Pricing",
  },
  {
    icon: ShieldCheck,
    title: "30 to 90 Days Warranty",
    desc: "Post-launch support including monitoring, bug fixes, and optimization.",
    badge: "Post-Launch Warranty",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
            Built on Clear Engineering Standards
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Every project follows the same engineering and delivery standards.
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
                    <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center font-black shadow-md group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 text-black" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest border border-slate-700">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white mb-3 group-hover:text-slate-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-700/60 flex items-center space-x-2 text-xs font-bold text-white">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Verified Standard</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
