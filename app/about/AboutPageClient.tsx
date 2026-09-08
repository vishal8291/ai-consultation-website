"use client";
import React from "react";
import Footer from "@/components/Footer";
import { CheckCircle2, ShieldCheck, Clock, Zap, Globe, Mail, Github, Instagram, ExternalLink, Code2, Server, Database, Cpu, Layers } from "lucide-react";

export default function AboutPageClient() {
  return (
    <main className="min-h-screen bg-white text-slate-900 antialiased selection:bg-black selection:text-white">

      {/* Hero Banner Section */}
      <section className="pt-36 pb-16 sm:pt-44 sm:pb-24 bg-white border-b border-[var(--border-default)] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-tight text-slate-900">
            We start with your problem, <br />
            not our services list.
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            <strong className="text-slate-900">CustomeAI</strong> is a small studio for small businesses &mdash; we design, build, and support websites and AI systems around the specific thing that's actually broken, delivered in 7 to 21 days. Based in Mumbai, working remotely with businesses across India.
          </p>
        </div>
      </section>

      {/* About Company & Founder Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Founder Card */}
            <div className="md:col-span-5 relative">
              <div className="glass-card-pro overflow-hidden p-8 text-center text-slate-900 space-y-6">
                <div style={{ color: "var(--accent)" }} className="w-24 h-24 mx-auto rounded-full bg-[var(--surface-alt)] border border-[var(--border-default)] flex items-center justify-center font-semibold text-3xl">
                  VT
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900">Vishal Tiwari</h3>
                  <p style={{ color: "var(--accent)" }} className="text-xs font-mono font-bold uppercase tracking-wider mt-1">Founder & Lead Systems Engineer</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Full-stack developer specializing in Next.js, React, Python, and AI automation.
                </p>

                {/* Social & Portfolio Links */}
                <div className="pt-4 border-t border-[var(--border-default)] space-y-3">
                  <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">Connect & Socials</p>
                  <div className="flex flex-col space-y-2 text-xs font-bold">
                    <a
                      href="https://vishal-tiwari.me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-lg bg-[var(--surface-alt)] hover:bg-white text-slate-800 border border-[var(--border-default)] hover:border-[var(--border-strong)] flex items-center justify-between transition-colors"
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
                      className="px-4 py-2.5 rounded-lg bg-[var(--surface-alt)] hover:bg-white text-slate-800 border border-[var(--border-default)] hover:border-[var(--border-strong)] flex items-center justify-between transition-colors"
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
                      className="px-4 py-2.5 rounded-lg bg-[var(--surface-alt)] hover:bg-white text-slate-800 border border-[var(--border-default)] hover:border-[var(--border-strong)] flex items-center justify-between transition-colors"
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
              <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-900 border border-slate-300 text-xs font-semibold uppercase tracking-wider">
                OUR STORY
              </span>

              <h2 className="text-2xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
                Small businesses get sold packages. We start by listening.
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Most agencies hand a small business owner a menu: Launch, Growth, Enterprise, pick one. But a shop owner losing customers to a bad Google listing has a completely different problem than a founder drowning in repetitive WhatsApp questions &mdash; and neither fits neatly into a tier.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                <strong>CustomeAI</strong> was built to work the other way around: tell us the actual problem, and we design the website, AI system, or piece of software that solves it &mdash; with fixed, itemized pricing, full source code ownership, and real support after launch. It's currently run hands-on by one engineer end to end; as it grows, more people join, but every project still starts the same way &mdash; with your problem, not our services list.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white text-xs font-bold text-slate-800 flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-black flex-shrink-0" />
                  <span>7 to 21 Days Delivery</span>
                </div>
                <div className="p-4 bg-white text-xs font-bold text-slate-800 flex items-center space-x-3">
                  <ShieldCheck className="w-5 h-5 text-black flex-shrink-0" />
                  <span>Full Code & IP Ownership</span>
                </div>
                <div className="p-4 bg-white text-xs font-bold text-slate-800 flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" />
                  <span>50% Advance / 50% Delivery Terms</span>
                </div>
                <div className="p-4 bg-white text-xs font-bold text-slate-800 flex items-center space-x-3">
                  <Zap className="w-4 h-4 text-black flex-shrink-0" />
                  <span>30 Days Free Support</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROPER TECH STACKS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider">
              TECH STACK
            </span>
            <h2 className="text-2xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
              Built on a Modern Stack
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              We use serverless frameworks, production AI tools, and secure payment integrations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Tech Pillar 1: Frontend */}
            <div className="p-6 bg-white space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-bold">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Frontend UI/UX</h3>
              <ul className="space-y-2 text-xs font-medium text-slate-600">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span><strong>Next.js 16</strong> (Turbopack Engine)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span><strong>React 19</strong> (Server Components)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span><strong>Tailwind CSS v4</strong> + Lucide Icons</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span><strong>Framer Motion 12</strong> Animations</span>
                </li>
              </ul>
            </div>

            {/* Tech Pillar 2: Backend & AI */}
            <div className="p-6 bg-white space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-bold">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Backend & AI</h3>
              <ul className="space-y-2 text-xs font-medium text-slate-600">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span><strong>Next.js API</strong> Routes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span><strong>Google Gemini</strong> Models</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span><strong>MongoDB Keyword</strong> Search</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span><strong>Node.js</strong> Server Actions</span>
                </li>
              </ul>
            </div>

            {/* Tech Pillar 3: Database & Payments */}
            <div className="p-6 bg-white space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-bold">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Database & Security</h3>
              <ul className="space-y-2 text-xs font-medium text-slate-600">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span><strong>MongoDB Atlas</strong> Document Store</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span><strong>Razorpay SDK</strong> (HMAC SHA256)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span><strong>JWT + Bcrypt</strong> Hashing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span><strong>256-bit SSL</strong> TLS 1.3 Encryption</span>
                </li>
              </ul>
            </div>

            {/* Tech Pillar 4: Infrastructure */}
            <div className="p-6 bg-white space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-bold">
                <Server className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Infrastructure</h3>
              <ul className="space-y-2 text-xs font-medium text-slate-600">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span><strong>Vercel Edge</strong> CDN Network</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span><strong>Cloudflare</strong> Global DNS</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span><strong>Docker Containerization</strong></span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span><strong>GitHub Actions</strong> CI/CD</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Direct Contact & Social Reachout Section */}
      <section className="py-20 bg-white border-t border-[var(--border-default)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div>
            <h2 className="text-3xl sm:text-5xl font-semibold mb-3 text-slate-900">Get in Touch</h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto font-medium">
              Have questions about a new website or AI project? Reach out:
            </p>
          </div>

          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:vishal.buildss@gmail.com"
              className="btn-yellow-solid px-8 py-4 text-sm flex items-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>Email: vishal.buildss@gmail.com</span>
            </a>

            <a
              href="https://vishal-tiwari.me"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-white-solid px-8 py-4 text-sm flex items-center space-x-2"
            >
              <Globe className="w-4 h-4" />
              <span>Visit vishal-tiwari.me</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
