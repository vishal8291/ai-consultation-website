"use client";
import React from "react";
import Footer from "@/components/Footer";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ConsultationForm from "@/components/ConsultationForm";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 antialiased">

      {/* Hero Header */}
      <section className="relative pt-16 pb-16 bg-slate-950 overflow-hidden border-b border-slate-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent mb-6"
          >
            Showcase Projects & AI Systems
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Detailed technical case studies showcasing AI agents, intelligent document automation, custom web portals, and predictive enterprise dashboards.
          </motion.p>
        </div>
      </section>

      {/* Main Filterable Projects Showcase */}
      <ProjectsShowcase showFilters={true} />

      {/* Booking Form CTA */}
      <ConsultationForm />

      {/* Footer */}
      <Footer />
    </main>
  );
}
