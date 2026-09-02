"use client";
import React, { useEffect, useRef } from "react";
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
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.play().catch(() => {});
    };

    tryPlay();
    video.addEventListener("pause", tryPlay);
    return () => video.removeEventListener("pause", tryPlay);
  }, []);

  return (
    <>
    <AmbientBackground />
    <main className="min-h-screen text-slate-900 antialiased selection:bg-black selection:text-white relative z-10 overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="relative pt-10 sm:pt-14 md:pt-20 pb-20 sm:pb-28 overflow-hidden bg-white/85">

        {/* Animated Background Glowing Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-neutral-300/25 via-neutral-400/20 to-neutral-500/10 blur-[130px] rounded-full pointer-events-none z-0"
        />

        {/* Giant Translucent Animated Floating Watermark */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-12 left-1/2 -translate-x-1/2 text-[90px] sm:text-[150px] lg:text-[210px] font-black uppercase tracking-widest text-slate-200/50 select-none pointer-events-none whitespace-nowrap z-0 font-sans"
        >
          VISION ENGINE
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Content Column (smaller) */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8 text-center lg:text-left pt-4">

              {/* Exact 3-Line Headline Format Requested by User with Framer Stagger */}
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-[44px] font-black tracking-tight leading-[1.16] text-slate-900 font-sans"
              >
                We Build Websites <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-neutral-500 to-neutral-900 inline-block">
                  & AI Systems
                </span> <br />
                For Growing Businesses.
              </motion.h1>

              {/* Description Text */}
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed mx-auto lg:mx-0 font-medium"
              >
                We design, build, and launch production websites and AI automation systems, delivered in <strong className="text-black font-black">7 to 21 days</strong> with itemized pricing.
              </motion.p>

              {/* Glowing Gradient Pill CTA Button with Magnetic Hover */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <motion.a
                  href="#pricing"
                  whileHover={{ scale: 1.04, boxShadow: "0 15px 35px rgba(10, 10, 10, 0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-10 py-4.5 rounded-full btn-yellow-solid text-white font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all"
                >
                  <span>VIEW PRICING</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </motion.a>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-8 py-4.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest transition-all shadow-md"
                >
                  BOOK A CALL
                </motion.a>
              </motion.div>

              {/* Trust Metric Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="pt-6 flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-600 font-bold uppercase tracking-wider"
              >
                <span className="flex items-center">
                  <Clock className="w-4 h-4 text-black mr-1.5" />
                  7-21 Days Delivery
                </span>
                <span className="flex items-center">
                  <ShieldCheck className="w-4 h-4 text-black mr-1.5" />
                  100% Code IP Ownership
                </span>
              </motion.div>
            </div>

            {/* Video Column (larger) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-7 relative w-full flex items-center justify-center mt-6 lg:mt-0"
            >
              <div className="relative w-full overflow-hidden shadow-2xl rounded-2xl bg-black border border-slate-800">
                <video
                  ref={heroVideoRef}
                  src="/animation-optimized.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto object-contain block rounded-2xl"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <div id="tech">
        <TechMarquee />
      </div>

      {/* Trusted By */}
      <div className="py-12 bg-white/85 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 mb-6">
            Trusted By
          </p>
          <a
            href="https://mahagroindia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-7 py-4 rounded-2xl border border-slate-200 bg-white hover:border-black transition-colors"
          >
            <img src="/images/mahagro-logo.png" alt="MAHAGRO INDIA logo" className="w-11 h-11 object-contain" />
            <div className="text-sm font-black text-slate-900">MAHAGRO INDIA</div>
          </a>
        </div>
      </div>

      {/* Featured 3-Projects Portfolio Section */}
      <ProjectsShowcase limit={3} isHomepage={true} />

      {/* Website Design Packages */}
      <PricingSection />

      {/* Interactive Custom Quote Estimator */}
      <PricingEstimator />

      {/* Agency Feature Comparison Matrix */}
      <ComparisonMatrix />

      {/* Engineering Pillars Bento Grid */}
      <section id="services" className="py-24 sm:py-32 bg-white/85 relative overflow-hidden bg-grid-pattern border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-black uppercase tracking-wider inline-block mb-3 border border-slate-200">
              CORE CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Services & Deliverables
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium">
              We build web platforms, business websites, and AI automation systems tailored to your industry.
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
                  <span className="px-3 py-1 rounded-full bg-white text-black text-xs font-black uppercase tracking-wider shadow-sm">
                    PILLAR 01 • WEBSITES
                  </span>
                  <span className="text-xs font-mono font-bold text-white px-3 py-1 rounded-lg bg-slate-800 border border-slate-700">
                    100/100 SPEED SCORE
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 group-hover:text-slate-300 transition-colors">
                  Custom Website Design
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                  Responsive Next.js 16 websites with custom design, smooth animations, and a clean, fast interface.
                </p>

                <div className="grid sm:grid-cols-3 gap-3 mb-8">
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
                    <p className="text-white font-extrabold mb-1">Performance</p>
                    <p className="text-slate-300 font-medium">Sub-second load times & Google PageSpeed 100</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
                    <p className="text-white font-extrabold mb-1">UI/UX Design</p>
                    <p className="text-slate-300 font-medium">Custom vector SVGs & clean hierarchy</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
                    <p className="text-white font-extrabold mb-1">SEO & Tech</p>
                    <p className="text-slate-300 font-medium">Next.js 16 + Turbopack & Schema markup</p>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="w-full sm:w-auto px-7 py-4 rounded-xl btn-white-solid text-black font-black text-xs uppercase tracking-widest inline-flex items-center justify-center space-x-2 shadow-md"
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
              className="md:col-span-5 bg-white rounded-3xl p-8 border-2 border-slate-300 shadow-xl flex flex-col justify-between relative overflow-hidden group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-900 text-xs font-black uppercase tracking-wider border border-slate-200">
                    PILLAR 02 • AUDIT
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-bold shadow-sm">
                    <Cpu className="w-5 h-5 text-white" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 group-hover:text-slate-600 transition-colors">
                  System & Architecture Audit
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                  A working session to map your processes, identify automation opportunities, and scope a plan for your website or AI system.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-xs text-slate-800 font-bold space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" />
                    <span>Process bottleneck mapping</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-800 font-bold space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" />
                    <span>ROI & payback timeline estimate</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-800 font-bold space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" />
                    <span>Tech stack recommendation</span>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="w-full py-3.5 px-4 rounded-xl btn-dark-solid text-white font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2"
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
              className="md:col-span-5 bg-white rounded-3xl p-8 border-2 border-slate-300 shadow-xl flex flex-col justify-between relative overflow-hidden group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-900 border border-slate-300 text-xs font-black uppercase tracking-wider">
                    PILLAR 03 • AI AGENTS
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-bold shadow-sm">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 group-hover:text-slate-600 transition-colors">
                  AI Workflows & Agentic Systems
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                  24/7 AI support bots, document OCR pipelines, and multi-agent workflow automation connected to your APIs.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-xs text-slate-800 font-bold space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" />
                    <span>RAG vector database search</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-800 font-bold space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" />
                    <span>Zendesk & WhatsApp API integrations</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-800 font-bold space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" />
                    <span>Human-in-the-loop security</span>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="w-full py-3.5 px-4 rounded-xl btn-dark-solid text-white font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2"
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
                  <span className="px-3 py-1 rounded-full bg-white text-black text-xs font-black uppercase tracking-wider shadow-sm">
                    PILLAR 04 • WEB APPS & SAAS
                  </span>
                  <span className="text-xs font-mono font-bold text-white px-3 py-1 rounded-lg bg-slate-800 border border-slate-700">
                    REACT + NEXT.JS + PYTHON
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 group-hover:text-slate-300 transition-colors">
                  Custom Web Application Portals
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                  Client portals, dashboards, and SaaS software built with Next.js, React, and Python microservices.
                </p>

                <div className="grid sm:grid-cols-3 gap-3 mb-8">
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
                    <p className="text-white font-extrabold mb-1">Architecture</p>
                    <p className="text-slate-300 font-medium">Sub-second UI response time & REST APIs</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
                    <p className="text-white font-extrabold mb-1">Security</p>
                    <p className="text-slate-300 font-medium">Role-based access & JWT/OAuth 2.0</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
                    <p className="text-white font-extrabold mb-1">Infrastructure</p>
                    <p className="text-slate-300 font-medium">Dockerized deployment & High availability</p>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="w-full sm:w-auto px-7 py-4 rounded-xl btn-white-solid text-black font-black text-xs uppercase tracking-widest inline-flex items-center justify-center space-x-2 shadow-md"
              >
                <span>Request a Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Interactive ROI Calculator */}
      <RoiCalculator />

      {/* Process Workflow Section */}
      <section id="process" className="py-24 sm:py-32 bg-white/85 text-slate-900 relative overflow-hidden bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="px-3.5 py-1.5 rounded-full bg-slate-200 text-slate-800 text-xs font-black uppercase tracking-wider inline-block mb-3">
              METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              From Concept to Launch in 7 - 21 Days
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              A clear process with defined milestones, so your website or AI system ships on schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            {[
              { step: "01", title: "Discovery & Scope", desc: "We review your goals, scope the requirements, and define clear project milestones." },
              { step: "02", title: "Design", desc: "We design wireframes, custom visuals, and interactive prototypes." },
              { step: "03", title: "Next.js 16 Build", desc: "We build your website or app with fast page loads, clean code, and solid architecture." },
              { step: "04", title: "Launch & Support", desc: "We deploy to Vercel/Cloudflare, connect analytics, and provide 30-90 days of support." },
            ].map((p, idx) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="glass-card-pro p-7 sm:p-8 rounded-3xl relative group border border-slate-200 shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center font-black text-lg text-white shadow-md mb-6 group-hover:scale-105 transition-transform">
                  {p.step}
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2.5">{p.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Commitments & Engineering Standards */}
      <TestimonialsSection />

      {/* Frequently Asked Questions */}
      <FaqSection />

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
