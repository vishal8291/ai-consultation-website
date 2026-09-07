"use client";
import React from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import PricingSection from "@/components/PricingSection";
import PricingEstimator from "@/components/PricingEstimator";
import RoiCalculator from "@/components/RoiCalculator";
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
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.82) 45%, rgba(10,10,10,0.94) 100%), url('/images/heroimg.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative pt-28 sm:pt-32 md:pt-36 pb-20 sm:pb-28 overflow-hidden bg-[#0a0a0a]"
      >

        {/* Subtle accent wash over the photo */}
        <div className="absolute top-[-100px] right-[-140px] w-[520px] h-[520px] bg-gradient-to-br from-[#533afd]/20 via-transparent to-transparent blur-[130px] rounded-full pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-center">

            {/* Content Column */}
            <div className="max-w-3xl space-y-6 sm:space-y-8 text-center pt-4 pb-6">

              {/* Exact 3-Line Headline Format Requested by User with Framer Stagger */}
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-[44px] font-semibold tracking-tight leading-[1.16] text-white font-sans"
              >
                Tell us the problem. <br />
                <span style={{ color: "var(--accent)" }}>We build the fix.</span> <br />
                Built for small businesses.
              </motion.h1>

              {/* Description Text */}
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed mx-auto font-medium"
              >
                CustomAI is a studio, not a menu of packages. Describe the problem in your business &mdash; a website that isn't converting, a process eating up your week, a task you wish ran itself &mdash; and we design, build, and support the specific system that fixes it, in <strong className="text-white font-semibold">7 to 21 days</strong> with itemized pricing.
              </motion.p>

              {/* Glowing Gradient Pill CTA Button with Magnetic Hover */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <motion.a
                  href="#pricing"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ background: "var(--accent)" }}
                  className="w-full sm:w-auto px-6 py-3 rounded-md text-white font-semibold text-sm flex items-center justify-center space-x-2 transition-all shadow-[0_2px_10px_-2px_rgba(83,58,253,0.4)]"
                >
                  <span>View pricing</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </motion.a>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-6 py-3 rounded-md bg-transparent border border-white/25 hover:border-white/50 text-white font-semibold text-sm transition-all"
                >
                  Share your problem
                </motion.a>
              </motion.div>

              {/* Trust Metric Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="pt-6 flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-slate-400"
              >
                <span className="flex items-center">
                  <Clock style={{ color: "var(--accent)" }} className="w-4 h-4 mr-1.5" />
                  7-21 days delivery
                </span>
                <span className="flex items-center">
                  <ShieldCheck style={{ color: "var(--accent-teal)" }} className="w-4 h-4 mr-1.5" />
                  100% code &amp; IP ownership
                </span>
              </motion.div>
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

      <div className="marker-bar marker-indigo" />

      {/* Engineering Pillars Bento Grid — WHAT WE DO */}
      <section id="services" className="py-24 sm:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold uppercase tracking-wider inline-block mb-3 border border-slate-200">
              WHAT WE ACTUALLY BUILD
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4 tracking-tight">
              Four ways this usually plays out
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium">
              Most small-business problems land in one of these buckets. Tell us yours and we'll tell you honestly which one it is.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">

            {/* Bento Card 1: Custom Website Design (Span 7) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="md:col-span-7 bg-[#0b0f19] text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-wider shadow-sm">
                    PILLAR 01 • WEBSITES
                  </span>
                  <span style={{ borderColor: "var(--accent)" }} className="text-xs font-mono font-bold text-white px-3 py-1 rounded-lg bg-slate-800 border">
                    100/100 SPEED SCORE
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-3 group-hover:text-slate-300 transition-colors">
                  Custom Website Design
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                  A website built just for you &mdash; looks great on every screen, loads fast, and feels smooth to use.
                </p>

                <div className="grid sm:grid-cols-3 gap-3 mb-8">
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
                    <p className="text-white font-semibold mb-1">Fast</p>
                    <p className="text-slate-300 font-medium">Loads in under a second, every time</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
                    <p className="text-white font-semibold mb-1">Easy to use</p>
                    <p className="text-slate-300 font-medium">Clean layout that's simple to read and navigate</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
                    <p className="text-white font-semibold mb-1">Found on Google</p>
                    <p className="text-slate-300 font-medium">Built so search engines can find you</p>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="w-full sm:w-auto px-7 py-4 rounded-xl btn-white-solid text-black font-semibold text-sm inline-flex items-center justify-center space-x-2 shadow-md"
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
              className="md:col-span-5 bg-white rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group"
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
                className="w-full py-3.5 px-4 rounded-xl btn-dark-solid text-white font-semibold text-sm flex items-center justify-center space-x-2"
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
              className="md:col-span-5 bg-white rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group"
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
                className="w-full py-3.5 px-4 rounded-xl btn-dark-solid text-white font-semibold text-sm flex items-center justify-center space-x-2"
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
              className="md:col-span-7 bg-[#0b0f19] text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-wider shadow-sm">
                    PILLAR 04 • APPS
                  </span>
                  <span style={{ borderColor: "var(--accent)" }} className="text-xs font-mono font-bold text-white px-3 py-1 rounded-lg bg-slate-800 border">
                    BUILT FOR YOUR BUSINESS
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-3 group-hover:text-slate-300 transition-colors">
                  Custom Apps & Dashboards
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                  Login portals, dashboards, and software built to match exactly how your business works.
                </p>

                <div className="grid sm:grid-cols-3 gap-3 mb-8">
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
                    <p className="text-white font-semibold mb-1">Feels instant</p>
                    <p className="text-slate-300 font-medium">No waiting around, even with lots of data</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
                    <p className="text-white font-semibold mb-1">Secure logins</p>
                    <p className="text-slate-300 font-medium">Each person sees only what they should</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
                    <p className="text-white font-semibold mb-1">Always online</p>
                    <p className="text-slate-300 font-medium">Built to stay up and reliable</p>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="w-full sm:w-auto px-7 py-4 rounded-xl btn-white-solid text-black font-semibold text-sm inline-flex items-center justify-center space-x-2 shadow-md"
              >
                <span>Request a Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      <div className="marker-bar marker-teal" />

      {/* Featured 3-Projects Portfolio Section — PROOF of what we just described */}
      <ProjectsShowcase limit={3} isHomepage={true} />

      {/* Process Workflow Section — HOW we deliver it */}
      <section id="process" className="py-24 sm:py-32 bg-white text-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="px-3.5 py-1.5 rounded-full bg-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider inline-block mb-3">
              OUR PROCESS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4 tracking-tight">
              From idea to launch in 7 - 21 days
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              A clear, step-by-step process, so your website or system is ready on time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            {[
              { step: "01", title: "Understand", desc: "We learn about your goals and write down exactly what needs to be built.", color: "var(--accent)" },
              { step: "02", title: "Design", desc: "We design how it will look and feel, and show you before building it.", color: "var(--accent-teal)" },
              { step: "03", title: "Build", desc: "We build it to be fast, clean, and reliable from day one.", color: "var(--accent-amber)" },
              { step: "04", title: "Launch & support", desc: "We put it live, then stick around for 30-90 days to fix anything and help you settle in.", color: "var(--accent)" },
            ].map((p, idx) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-white relative group"
              >
                <div className="p-7 sm:p-8">
                  <div className="text-lg font-semibold text-slate-900 mb-6">
                    {p.step}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2.5">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="marker-bar marker-amber" />

      {/* Agency Feature Comparison Matrix — WHY us, now that they know what "us" means */}
      <ComparisonMatrix />

      {/* Website Design Packages — pricing makes sense now */}
      <PricingSection />

      {/* Interactive Custom Quote Estimator */}
      <PricingEstimator />

      {/* Interactive ROI Calculator — justifies the price just shown */}
      <RoiCalculator />

      {/* Technical Commitments & Engineering Standards */}
      <TestimonialsSection />

      {/* Frequently Asked Questions */}
      <FaqSection />

      <div className="marker-bar marker-indigo" />

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
