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
    <div className="py-16 sm:py-20 bg-black border-y-2 border-slate-800 overflow-hidden relative bg-grid-pattern">
      {/* Side Fade Overlays */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 text-center">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-white flex items-center justify-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <Sparkles className="w-4 h-4 text-white mr-1.5" />
          <span>WHAT EVERY PROJECT INCLUDES</span>
        </p>
      </div>

      {/* Continuous Marquee Ticker */}
      <div className="flex space-x-6 sm:space-x-8 whitespace-nowrap overflow-hidden py-2">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex space-x-6 sm:space-x-8 items-center"
        >
          {[...TECH_ITEMS, ...TECH_ITEMS].map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="inline-flex items-center space-x-3.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-slate-900 border-2 border-slate-700 text-white shadow-md hover:shadow-xl hover:border-white transition-all duration-300 group cursor-default"
              >
                <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center font-semibold shadow-sm group-hover:scale-110 transition-transform">
                  <IconComp className="w-5 h-5 text-black" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm sm:text-base font-semibold text-white tracking-tight group-hover:text-slate-300 transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
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
