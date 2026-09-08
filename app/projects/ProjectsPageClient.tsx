"use client";
import React from "react";
import Footer from "@/components/Footer";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ConsultationForm from "@/components/ConsultationForm";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function ProjectsPageClient() {
  return (
    <main className="min-h-screen bg-white text-slate-900 antialiased">

      {/* Hero Header */}
      <section className="relative pt-36 sm:pt-40 pb-16 bg-white overflow-hidden border-b border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-semibold text-slate-900 mb-6"
          >
            Our Work
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Case studies covering AI agents, document automation, web portals, and dashboards we've built.
          </motion.p>
        </div>
      </section>

      {/* Main Filterable Projects Showcase */}
      <ProjectsShowcase showFilters={true} hideHeader />

      {/* Booking Form CTA */}
      <ConsultationForm />

      {/* Footer */}
      <Footer />
    </main>
  );
}
