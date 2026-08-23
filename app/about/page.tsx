"use client";
import React from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { ArrowLeft, CheckCircle2, ShieldCheck, Clock, Zap, Globe, Mail, Github, Instagram, ExternalLink, Code2, Server, Database, Cpu, Layers } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fafaf8] text-slate-900 antialiased selection:bg-yellow-400 selection:text-black">
      
      {/* Top Header Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-slate-700 hover:text-amber-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-yellow-400 font-black flex items-center justify-center text-xs shadow-sm">
              vb
            </div>
            <span className="text-sm font-black text-slate-900">
              vishal<span className="text-amber-600 font-extrabold">.buildss</span>
            </span>
          </div>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Engineering High-Speed Websites & <br />
            Automated AI Systems for Modern Businesses.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            At <strong>vishal.buildss</strong>, we partner with founders and companies to design, build, and deploy production-grade Next.js 16 platforms and custom AI workflows delivered in 7 to 21 days.
          </p>
        </div>
      </section>

      {/* About Company & Founder Section */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Founder Card */}
            <div className="md:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 p-8 text-center text-white space-y-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-yellow-400 via-amber-500 to-yellow-300 flex items-center justify-center text-slate-900 font-black text-3xl shadow-xl">
                  VT
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">Vishal Tiwari</h3>
                  <p className="text-xs text-yellow-400 font-mono font-bold uppercase tracking-wider mt-1">Founder & Lead Systems Engineer</p>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  Full-stack software architect specializing in Next.js 16, React 19, Python AI microservices, and enterprise automation.
                </p>

                {/* Social & Portfolio Links */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">Connect & Socials</p>
                  <div className="flex flex-col space-y-2 text-xs font-bold">
                    <a
                      href="https://vishal-tiwari.me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-yellow-400 hover:text-black text-yellow-400 border border-slate-700 flex items-center justify-between transition-colors"
                    >
                      <span className="flex items-center space-x-2">
                        <Globe className="w-4 h-4" />
                        <span>Personal Portfolio</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-white hover:text-slate-900 text-slate-200 border border-slate-700 flex items-center justify-between transition-colors"
                    >
                      <span className="flex items-center space-x-2">
                        <Github className="w-4 h-4" />
                        <span>GitHub Account</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href="https://www.instagram.com/vishal.buildss?igsi=eHBvNHVtZzJkemNp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-pink-600 hover:text-white text-slate-200 border border-slate-700 flex items-center justify-between transition-colors"
                    >
                      <span className="flex items-center space-x-2">
                        <Instagram className="w-4 h-4" />
                        <span>Instagram</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Story & Principles */}
            <div className="md:col-span-7 space-y-6">
              <span className="px-3.5 py-1.5 rounded-full bg-yellow-100 text-amber-900 border border-yellow-300 text-xs font-black uppercase tracking-wider">
                OUR COMPANY STORY
              </span>

              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Zero Fluff. Transparent Math. 100% Code Ownership.
              </h2>
              
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Traditional web agencies bill tens of thousands of dollars, drag timelines across 3 to 6 months, and lock your website inside proprietary platforms.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                <strong>vishal.buildss</strong> was founded to solve this. We operate in rapid 7-to-21-day engineering sprints with fixed component math. Every project includes sub-second Google PageSpeed scores, 100% full source code IP ownership, and 30 days of free post-launch support.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span>7 to 21 Days Sprint Delivery</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center space-x-3">
                  <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span>100% Code & Repository IP Transfer</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>50% Advance / 50% Delivery Terms</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center space-x-3">
                  <Zap className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>30 Days Free Warranty Support</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROPER TECH STACKS SECTION */}
      <section className="py-20 bg-[#fafaf8] border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-black uppercase tracking-wider">
              OUR TECHNOLOGY STACK
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Built on Modern High-Speed Infrastructure
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              We leverage sub-second serverless frameworks, production AI engines, and secure payment integrations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Tech Pillar 1: Frontend */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-bold">
                <Code2 className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Frontend UI/UX</h3>
              <ul className="space-y-2 text-xs font-medium text-slate-600">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span><strong>Next.js 16</strong> (Turbopack Engine)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span><strong>React 19</strong> (Server Components)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span><strong>Tailwind CSS v4</strong> + Lucide Icons</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span><strong>Framer Motion 12</strong> Animations</span>
                </li>
              </ul>
            </div>

            {/* Tech Pillar 2: Backend & AI */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-bold">
                <Cpu className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Backend & AI</h3>
              <ul className="space-y-2 text-xs font-medium text-slate-600">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span><strong>Python FastAPI</strong> Microservices</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span><strong>Groq LLaMA-3.3-70B</strong> Models</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span><strong>RAG Vector Search</strong> Engines</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span><strong>Node.js</strong> Server Actions</span>
                </li>
              </ul>
            </div>

            {/* Tech Pillar 3: Database & Payments */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-bold">
                <Database className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Database & Security</h3>
              <ul className="space-y-2 text-xs font-medium text-slate-600">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span><strong>MongoDB Atlas</strong> Document Store</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span><strong>Razorpay SDK</strong> (HMAC SHA256)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span><strong>JWT + Bcrypt</strong> Hashing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span><strong>256-bit SSL</strong> TLS 1.3 Encryption</span>
                </li>
              </ul>
            </div>

            {/* Tech Pillar 4: Infrastructure */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-bold">
                <Server className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Infrastructure</h3>
              <ul className="space-y-2 text-xs font-medium text-slate-600">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span><strong>Vercel Edge</strong> CDN Network</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span><strong>Cloudflare</strong> Global DNS</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span><strong>Docker Containerization</strong></span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span><strong>GitHub Actions</strong> CI/CD</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Direct Contact & Social Reachout Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black mb-3">Get in Touch Directly</h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-medium">
              Have questions about a new website build, custom AI agent, or quote estimation? Reach out to us directly:
            </p>
          </div>

          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:vishal.buildss@gmail.com"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 text-black font-black text-xs uppercase tracking-widest flex items-center space-x-2 shadow-xl hover:scale-105 transition-transform"
            >
              <Mail className="w-4 h-4 text-black" />
              <span>Email: vishal.buildss@gmail.com</span>
            </a>

            <a
              href="https://vishal-tiwari.me"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase tracking-widest flex items-center space-x-2 border border-slate-700 transition-colors"
            >
              <Globe className="w-4 h-4 text-yellow-400" />
              <span>Visit vishal-tiwari.me</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
