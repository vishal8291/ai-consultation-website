"use client";
import React from "react";
import { motion } from "framer-motion";
import { Cpu, Sparkles, Code2, Database, Zap, Layers, Server, ShieldCheck, Terminal } from "lucide-react";

const TECH_ITEMS = [
  { name: "Loads in under a second", category: "Speed", icon: Code2 },
  { name: "Clean, modern design", category: "Interface", icon: Layers },
  { name: "Built-in AI smarts", category: "Artificial Intelligence", icon: Cpu },
  { name: "Smooth, natural animations", category: "Feel", icon: Sparkles },
  { name: "Consistent, polished look", category: "Design", icon: Zap },
  { name: "Reliable behind the scenes", category: "Backend", icon: Terminal },
  { name: "AI that searches your own files", category: "Smart Search", icon: Database },
  { name: "Your data, stored safely", category: "Data Storage", icon: Server },
  { name: "Fast servers, worldwide", category: "Hosting", icon: ShieldCheck },
];

export default function TechMarquee() {
  return (
    <div className="py-8 sm:py-10 bg-[var(--surface-alt)] border-y border-[var(--border-default)] overflow-hidden relative">
      {/* Side Fade Overlays */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[var(--surface-alt)] via-[var(--surface-alt)]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[var(--surface-alt)] via-[var(--surface-alt)]/80 to-transparent z-10 pointer-events-none" />

      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-5 text-center">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-700 flex items-center justify-center space-x-2">
          <Sparkles style={{ color: "var(--accent)" }} className="w-4 h-4 mr-1.5" />
          <span>WHAT EVERY PROJECT INCLUDES</span>
        </p>
      </div>

      {/* Continuous Marquee Ticker */}
      <div className="flex space-x-4 whitespace-nowrap overflow-hidden py-2">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex space-x-4 items-center"
        >
          {[...TECH_ITEMS, ...TECH_ITEMS].map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="glass-card-pro inline-flex items-center space-x-3 px-5 sm:px-6 py-3 sm:py-3.5 cursor-default"
              >
                <div style={{ color: "var(--accent)" }} className="w-9 h-9 rounded-lg bg-white border border-[var(--border-default)] flex items-center justify-center">
                  <IconComp className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    {item.category}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
