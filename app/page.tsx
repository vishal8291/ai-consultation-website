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
import { ArrowRight, Globe, Bot, FileText, Zap, CheckCircle2, ShieldCheck, Clock, ArrowUpRight, Code, Sparkles, Layers, Cpu, Lock } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafaf8] text-slate-900 antialiased selection:bg-yellow-400 selection:text-black relative overflow-x-hidden">
      
      {/* HIGH-END ADVANCED ANIMATED HERO SECTION */}
      <section className="relative pt-10 sm:pt-14 md:pt-20 pb-20 sm:pb-28 overflow-hidden bg-[#fafaf8]">
        
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
          className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-amber-300/25 via-yellow-400/20 to-amber-500/10 blur-[130px] rounded-full pointer-events-none z-0"
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
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left pt-4">
              
              {/* Clean Status Badge */}
              

              {/* Exact 3-Line Headline Format Requested by User with Framer Stagger */}
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.16] text-slate-900 font-sans"
              >
                We Build Custom <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 inline-block">
                  Websites & AI Systems
                </span> <br />
                That Automate Your Business.
              </motion.h1>

              {/* Description Text */}
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed mx-auto lg:mx-0 font-medium"
              >
                Launch a high-speed website, deploy an AI agent, or automate manual tasks. We deliver in <strong className="text-amber-800 font-black">7 to 21 days</strong> with transparent itemized pricing.
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
                  whileHover={{ scale: 1.04, boxShadow: "0 15px 35px rgba(245, 158, 11, 0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-10 py-4.5 rounded-full btn-yellow-solid text-black font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all"
                >
                  <span>GET ACCESS & PRICES</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </motion.a>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-8 py-4.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest transition-all shadow-md"
                >
                  BOOK 15-MIN AUDIT
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
                  <Clock className="w-4 h-4 text-amber-600 mr-1.5" />
                  7-21 Days Delivery
                </span>
                <span className="flex items-center">
                  <ShieldCheck className="w-4 h-4 text-amber-600 mr-1.5" />
                  100% Code IP Ownership
                </span>
              </motion.div>
            </div>

            {/* Right Column: Full Width Uncropped Video Player */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-6 relative w-full flex items-center justify-center mt-6 lg:mt-0"
            >
              <div className="relative w-full overflow-hidden shadow-2xl rounded-2xl bg-black border border-slate-800">
                <video
                  src="/video2.mp4"
                  controls
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

      {/* Featured 3-Projects Portfolio Section */}
      <ProjectsShowcase limit={3} isHomepage={true} />

      {/* Website Design Packages */}
      <PricingSection />

      {/* Interactive Custom Quote Estimator */}
      <PricingEstimator />

      {/* Agency Feature Comparison Matrix */}
      <ComparisonMatrix />

      {/* Engineering Pillars Bento Grid */}
      <section id="services" className="py-24 sm:py-32 bg-white relative overflow-hidden bg-grid-pattern border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-black uppercase tracking-wider inline-block mb-3 border border-slate-200">
              CORE CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Engineering Pillars & Deliverables
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium">
              We build custom web platforms, bespoke luxury sites, and automated AI pipelines tailored to your exact industry.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
            
            {/* Bento Card 1: Bespoke Premium Website Design (Span 7) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="md:col-span-7 bg-[#0b0f19] text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-yellow-400 text-black text-xs font-black uppercase tracking-wider shadow-sm">
                    PILLAR 01 • WEBSITES
                  </span>
                  <span className="text-xs font-mono font-bold text-yellow-400 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700">
                    100/100 SPEED SCORE
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 group-hover:text-yellow-400 transition-colors">
                  Bespoke Premium Website Design
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                  High-end, responsive Next.js 16 websites crafted with custom vector artwork, glassmorphic UI elements, and Framer Motion micro-interactions.
                </p>

                <div className="grid sm:grid-cols-3 gap-3 mb-8">
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
                    <p className="text-yellow-400 font-extrabold mb-1">Performance</p>
                    <p className="text-slate-300 font-medium">Sub-second load times & Google PageSpeed 100</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
                    <p className="text-yellow-400 font-extrabold mb-1">UI/UX Design</p>
                    <p className="text-slate-300 font-medium">Custom vector SVGs & clean hierarchy</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
                    <p className="text-yellow-400 font-extrabold mb-1">SEO & Tech</p>
                    <p className="text-slate-300 font-medium">Next.js 16 + Turbopack & Schema markup</p>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="w-full sm:w-auto px-7 py-4 rounded-xl btn-yellow-solid text-black font-black text-xs uppercase tracking-widest inline-flex items-center justify-center space-x-2 shadow-md"
              >
                <span>Request Custom Website Proposal</span>
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
              className="md:col-span-5 bg-white rounded-3xl p-8 border-2 border-amber-400/40 shadow-xl flex flex-col justify-between relative overflow-hidden group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-900 text-xs font-black uppercase tracking-wider border border-slate-200">
                    PILLAR 02 • AUDIT
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-bold shadow-sm">
                    <Cpu className="w-5 h-5 text-black" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 group-hover:text-amber-700 transition-colors">
                  System & Architecture Audit
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                  Diagnostic engineering session to map business processes, uncover manual cost leaks, and architect custom AI automation roadmaps.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-xs text-slate-800 font-bold space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Process bottleneck mapping</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-800 font-bold space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>ROI & payback timeline estimate</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-800 font-bold space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Tech stack recommendation</span>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="w-full py-3.5 px-4 rounded-xl btn-dark-solid text-white font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2"
              >
                <span>Book Diagnostic Audit</span>
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
              className="md:col-span-5 bg-white rounded-3xl p-8 border-2 border-amber-400/40 shadow-xl flex flex-col justify-between relative overflow-hidden group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-amber-900 border border-yellow-300 text-xs font-black uppercase tracking-wider">
                    PILLAR 03 • AI AGENTS
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-bold shadow-sm">
                    <Bot className="w-5 h-5 text-black" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 group-hover:text-amber-700 transition-colors">
                  AI Workflows & Agentic Systems
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                  Deployment of 24/7 AI support bots, document OCR pipelines, and multi-agent workflow automations connected to your APIs.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-xs text-slate-800 font-bold space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>RAG vector database search</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-800 font-bold space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Zendesk & WhatsApp API integrations</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-800 font-bold space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Human-in-the-loop security</span>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="w-full py-3.5 px-4 rounded-xl btn-dark-solid text-white font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2"
              >
                <span>Deploy AI Agent</span>
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
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-yellow-400 text-black text-xs font-black uppercase tracking-wider shadow-sm">
                    PILLAR 04 • WEB APPS & SAAS
                  </span>
                  <span className="text-xs font-mono font-bold text-yellow-400 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700">
                    REACT + NEXT.JS + PYTHON
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 group-hover:text-yellow-400 transition-colors">
                  Custom Web Application Portals
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                  Full-stack development of client portals, enterprise dashboards, and SaaS software built with Next.js, React, and Python microservices.
                </p>

                <div className="grid sm:grid-cols-3 gap-3 mb-8">
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
                    <p className="text-yellow-400 font-extrabold mb-1">Architecture</p>
                    <p className="text-slate-300 font-medium">Sub-second UI response time & REST APIs</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
                    <p className="text-yellow-400 font-extrabold mb-1">Security</p>
                    <p className="text-slate-300 font-medium">Role-based access & JWT/OAuth 2.0</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
                    <p className="text-yellow-400 font-extrabold mb-1">Infrastructure</p>
                    <p className="text-slate-300 font-medium">Dockerized deployment & High availability</p>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="w-full sm:w-auto px-7 py-4 rounded-xl btn-yellow-solid text-black font-black text-xs uppercase tracking-widest inline-flex items-center justify-center space-x-2 shadow-md"
              >
                <span>Request Custom App Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Interactive ROI Calculator */}
      <RoiCalculator />

      {/* Process Workflow Section */}
      <section id="process" className="py-24 sm:py-32 bg-[#fafaf8] text-slate-900 relative overflow-hidden bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="px-3.5 py-1.5 rounded-full bg-slate-200 text-slate-800 text-xs font-black uppercase tracking-wider inline-block mb-3">
              METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              From Concept to Launch in 7 - 21 Days
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              Our structured, zero-fluff methodology ensures your website or AI system is delivered rapidly with clear milestone validation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            {[
              { step: "01", title: "Discovery & Math", desc: "We review your brand goals, calculate exact component math, and define clear project milestones." },
              { step: "02", title: "Bespoke Design", desc: "We design custom vector SVG artwork, wireframes, and Framer Motion micro-interactions." },
              { step: "03", title: "Next.js 16 Build", desc: "We engineer your website or web app with sub-second page loads, database hooks, and clean code." },
              { step: "04", title: "Launch & Support", desc: "We deploy to Vercel/Cloudflare, connect analytics telemetry, and provide 30-90 days warranty." },
            ].map((p, idx) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="glass-card-pro p-7 sm:p-8 rounded-3xl relative group border border-slate-200 shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-yellow-400 to-amber-500 flex items-center justify-center font-black text-lg text-black shadow-md mb-6 group-hover:scale-105 transition-transform">
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
  );
}
