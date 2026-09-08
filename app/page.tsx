"use client";
import React from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import PricingSection from "@/components/PricingSection";
import TechMarquee from "@/components/TechMarquee";
import ComparisonMatrix from "@/components/ComparisonMatrix";
import FaqSection from "@/components/FaqSection";
import FloatingQuoteWidget from "@/components/FloatingQuoteWidget";
import ConsultationForm from "@/components/ConsultationForm";
import TestimonialsSection from "@/components/TestimonialsSection";
import PrakritiChatbot from "@/components/PrakritiChatbot";
import AmbientBackground from "@/components/three/AmbientBackground";
import { ArrowRight, Globe, Bot, FileText, Zap, CheckCircle2, ShieldCheck, Clock, ArrowUpRight, Code, Sparkles, Layers, Cpu, Lock } from "lucide-react";

export default function Home() {
  return (
    <>
    <AmbientBackground />
    <main className="min-h-screen text-slate-900 antialiased selection:bg-black selection:text-white relative z-10 overflow-x-hidden">

      {/* HERO SECTION */}
      <section
        id="hero"
        className="relative pt-24 sm:pt-28 pb-14 sm:pb-16 bg-white border-b border-[var(--border-default)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">

            {/* Content Column */}
            <div className="max-w-3xl space-y-5 text-center">

              {/* Exact 3-Line Headline Format Requested by User — pure CSS entrance so it
                  paints on first frame instead of waiting on React hydration */}
              <h1
                className="hero-fade-in-up text-3xl sm:text-5xl lg:text-[44px] font-semibold tracking-tight leading-[1.16] text-[var(--foreground)] font-sans"
                style={{ animationDelay: "0.1s" }}
              >
                Tell us the problem. <br />
                <span style={{ color: "var(--accent)" }}>We build the fix.</span> <br />
                Built for small businesses.
              </h1>

              {/* Description Text */}
              <p
                className="hero-fade-in-up text-base sm:text-lg text-[#565959] max-w-xl leading-relaxed mx-auto font-medium"
                style={{ animationDelay: "0.2s" }}
              >
                CustomeAI is a studio, not a menu of packages. Describe the problem in your business &mdash; a website that isn't converting, a process eating up your week, a task you wish ran itself &mdash; and we design, build, and support the specific system that fixes it, in <strong className="text-[var(--foreground)] font-semibold">7 to 21 days</strong> with itemized pricing.
              </p>

              {/* CTA Buttons */}
              <div
                className="hero-fade-in-up pt-1 flex flex-col sm:flex-row items-center justify-center gap-3"
                style={{ animationDelay: "0.3s" }}
              >
                <a
                  href="#pricing"
                  className="btn-yellow-solid w-full sm:w-auto px-6 py-3 text-sm flex items-center justify-center space-x-2"
                >
                  <span>View pricing</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#contact"
                  className="btn-white-solid w-full sm:w-auto px-6 py-3 text-sm"
                >
                  Share your problem
                </a>
              </div>

              {/* Trust Metric Badges */}
              <div
                className="hero-fade-in-up pt-4 flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-[#565959]"
                style={{ animationDelay: "0.4s" }}
              >
                <span className="flex items-center">
                  <Clock style={{ color: "var(--accent)" }} className="w-4 h-4 mr-1.5" />
                  7-21 days delivery
                </span>
                <span className="flex items-center">
                  <ShieldCheck style={{ color: "var(--accent)" }} className="w-4 h-4 mr-1.5" />
                  100% code &amp; IP ownership
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <div id="tech">
        <TechMarquee />
      </div>

      {/* Trusted By */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 mb-6">
            Trusted By
          </p>
          <a
            href="https://mahagroindia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-7 py-4 bg-white transition-colors"
          >
            <img src="/images/mahagro-logo.png" alt="MAHAGRO INDIA logo" className="w-11 h-11 object-contain" />
            <div className="text-sm font-semibold text-slate-900">MAHAGRO INDIA</div>
          </a>
        </div>
      </div>

      <div className="marker-bar" />

      {/* Engineering Pillars Bento Grid — WHAT WE DO */}
      <section id="services" className="py-14 sm:py-16 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold uppercase tracking-wider inline-block mb-3 border border-slate-200">
              WHAT WE ACTUALLY BUILD
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4 tracking-tight">
              Website Design &amp; AI Automation, Built to Fit
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium">
              Most small-business problems land in one of these buckets. Tell us yours and we'll tell you honestly which one it is.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

            {/* Bento Card 1: Custom Website Design (Span 7) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="md:col-span-7 glass-card-pro p-8 sm:p-10 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-[var(--surface-alt)] border border-[var(--border-default)] text-[var(--foreground)] text-xs font-semibold uppercase tracking-wider">
                    PILLAR 01 • WEBSITES
                  </span>
                  <span style={{ color: "var(--accent)", borderColor: "var(--accent)" }} className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-white border">
                    100/100 SPEED SCORE
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-3 group-hover:text-slate-600 transition-colors">
                  Custom Website Design
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                  A website built just for you &mdash; looks great on every screen, loads fast, and feels smooth to use.
                </p>

                <div className="grid sm:grid-cols-3 gap-3 mb-8">
                  <div className="p-3.5 rounded-lg bg-[var(--surface-alt)] border border-[var(--border-default)] text-xs">
                    <p className="text-slate-900 font-semibold mb-1">Fast</p>
                    <p className="text-slate-600 font-medium">Loads in under a second, every time</p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[var(--surface-alt)] border border-[var(--border-default)] text-xs">
                    <p className="text-slate-900 font-semibold mb-1">Easy to use</p>
                    <p className="text-slate-600 font-medium">Clean layout that's simple to read and navigate</p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[var(--surface-alt)] border border-[var(--border-default)] text-xs">
                    <p className="text-slate-900 font-semibold mb-1">Found on Google</p>
                    <p className="text-slate-600 font-medium">Built so search engines can find you</p>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="btn-yellow-solid w-full sm:w-auto px-7 py-4 text-sm inline-flex items-center justify-center space-x-2"
              >
                <span>Request a Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Bento Card 2: System & Architecture Audit (Span 5) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="md:col-span-5 glass-card-pro p-8 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    PILLAR 02 • AUDIT
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-bold">
                    <Cpu className="w-5 h-5 text-white" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3 group-hover:text-slate-600 transition-colors">
                  Business & Website Check-up
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                  We look at how your business runs today, find what's slowing you down, and plan the right fix for your website or systems.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-xs text-slate-800 font-bold space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" />
                    <span>Find what's slowing you down</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-800 font-bold space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" />
                    <span>See how fast it pays for itself</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-800 font-bold space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" />
                    <span>Get a clear plan of what to build</span>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="btn-dark-solid w-full py-3.5 px-4 text-sm flex items-center justify-center space-x-2"
              >
                <span>Book an Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Bento Card 3: AI Workflows & Agentic Systems (Span 5) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="md:col-span-5 glass-card-pro p-8 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    PILLAR 03 • AI TOOLS
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-bold">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3 group-hover:text-slate-600 transition-colors">
                  AI Assistants & Automation
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                  AI chat support that works around the clock, tools that read and sort your documents automatically, and systems that connect your apps together.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-xs text-slate-800 font-bold space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" />
                    <span>AI that can search and answer from your own files</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-800 font-bold space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" />
                    <span>Works with WhatsApp and your support tools</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-800 font-bold space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" />
                    <span>A real person checks anything important</span>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="btn-dark-solid w-full py-3.5 px-4 text-sm flex items-center justify-center space-x-2"
              >
                <span>Discuss AI Automation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Bento Card 4: Custom Web Application Portals (Span 7) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="md:col-span-7 glass-card-pro p-8 sm:p-10 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-[var(--surface-alt)] border border-[var(--border-default)] text-[var(--foreground)] text-xs font-semibold uppercase tracking-wider">
                    PILLAR 04 • APPS
                  </span>
                  <span style={{ color: "var(--accent)", borderColor: "var(--accent)" }} className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-white border">
                    BUILT FOR YOUR BUSINESS
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-3 group-hover:text-slate-600 transition-colors">
                  Custom Apps & Dashboards
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                  Login portals, dashboards, and software built to match exactly how your business works.
                </p>

                <div className="grid sm:grid-cols-3 gap-3 mb-8">
                  <div className="p-3.5 rounded-lg bg-[var(--surface-alt)] border border-[var(--border-default)] text-xs">
                    <p className="text-slate-900 font-semibold mb-1">Feels instant</p>
                    <p className="text-slate-600 font-medium">No waiting around, even with lots of data</p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[var(--surface-alt)] border border-[var(--border-default)] text-xs">
                    <p className="text-slate-900 font-semibold mb-1">Secure logins</p>
                    <p className="text-slate-600 font-medium">Each person sees only what they should</p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[var(--surface-alt)] border border-[var(--border-default)] text-xs">
                    <p className="text-slate-900 font-semibold mb-1">Always online</p>
                    <p className="text-slate-600 font-medium">Built to stay up and reliable</p>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="btn-yellow-solid w-full sm:w-auto px-7 py-4 text-sm inline-flex items-center justify-center space-x-2"
              >
                <span>Request a Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      <div className="marker-bar" />

      {/* Featured 3-Projects Portfolio Section — PROOF of what we just described */}
      <ProjectsShowcase limit={3} isHomepage={true} />

      {/* Process Workflow Section — HOW we deliver it */}
      <section id="process" className="py-14 sm:py-16 bg-[var(--surface-alt)] text-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-[var(--border-default)] text-slate-800 text-xs font-semibold uppercase tracking-wider inline-block mb-3">
              OUR PROCESS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4 tracking-tight">
              Idea to Launch: Website or AI in 7-21 Days
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              A clear, step-by-step process, so your website or system is ready on time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {[
              { step: "01", title: "Understand", desc: "We learn about your goals and write down exactly what needs to be built.", color: "var(--accent)" },
              { step: "02", title: "Design", desc: "We design how it will look and feel, and show you before building it.", color: "var(--accent)" },
              { step: "03", title: "Build", desc: "We build it to be fast, clean, and reliable from day one.", color: "var(--accent)" },
              { step: "04", title: "Launch & support", desc: "We put it live, then stick around for 30-90 days to fix anything and help you settle in.", color: "var(--accent)" },
            ].map((p, idx) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="glass-card-pro relative group"
              >
                <div className="p-5 sm:p-6">
                  <div style={{ color: p.color }} className="text-sm font-bold mb-3">
                    {p.step}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="marker-bar" />

      {/* Agency Feature Comparison Matrix — WHY us, now that they know what "us" means */}
      <ComparisonMatrix />

      {/* Website Design Packages — pricing makes sense now */}
      <PricingSection />

      {/* Technical Commitments & Engineering Standards */}
      <TestimonialsSection />

      {/* Frequently Asked Questions */}
      <FaqSection />

      <div className="marker-bar" />

      {/* Consultation Booking Form */}
      <ConsultationForm />

      {/* Floating Instant Quote Drawer Trigger Widget */}
      <FloatingQuoteWidget />

      {/* Floating Prakriti AI Strategy Chatbot */}
      <PrakritiChatbot />

      {/* Global Footer */}
      <Footer />
    </main>
    </>
  );
}
