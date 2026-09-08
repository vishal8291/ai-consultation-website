"use client";
import React from "react";
import Link from "next/link";
import { Heart, Zap, ArrowUp, Globe, Github, Instagram, Mail } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white text-slate-900 border-t border-[var(--border-default)] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white border border-[var(--border-default)] p-1 flex items-center justify-center overflow-hidden">
                <img
                  src="/images/newlogo-clean.png"
                  alt="CustomeAI logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-semibold text-slate-900">
                Custome<span style={{ color: "var(--accent)" }} className="font-semibold">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              A small studio that builds websites, AI systems, and custom software around the specific problem a small business brings us &mdash; led by Vishal Tiwari.
            </p>

            {/* Social & Portfolio Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://vishal-tiwari.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-[var(--border-default)] hover:border-[var(--border-strong)] text-slate-700 flex items-center justify-center transition-colors"
                title="Personal Portfolio: vishal-tiwari.me"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-[var(--border-default)] hover:border-[var(--border-strong)] text-slate-700 flex items-center justify-center transition-colors"
                title="GitHub Account"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/vishal.buildss?igsi=eHBvNHVtZzJkemNp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-[var(--border-default)] hover:border-[var(--border-strong)] text-slate-700 flex items-center justify-center transition-colors"
                title="Instagram Account"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links with Packages */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Services</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-semibold">
              <li><a href="/#services" className="hover:text-slate-900 transition-colors">Custom website design</a></li>
              <li><a href="/#services" className="hover:text-slate-900 transition-colors">Business &amp; website review</a></li>
              <li><a href="/#services" className="hover:text-slate-900 transition-colors">AI assistants &amp; automation</a></li>
              <li><a href="/#services" className="hover:text-slate-900 transition-colors">Custom apps &amp; dashboards</a></li>
              <li><a href="/#pricing" className="hover:text-slate-900 transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Quick Legal & Company Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Company & Socials</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-semibold">
              <li><Link href="/about" className="hover:text-slate-900 transition-colors">About Us & Founder</Link></li>
              <li><a href="https://vishal-tiwari.me" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors flex items-center space-x-1"><span>Portfolio (vishal-tiwari.me)</span></a></li>
              <li><Link href="/terms" className="hover:text-slate-900 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Direct Contact</h4>
            <div className="space-y-1.5 text-xs text-slate-600 font-medium">
              <p>Email: <a href="mailto:vishal.buildss@gmail.com" className="text-slate-900 font-bold hover:underline">vishal.buildss@gmail.com</a></p>
              <p>Based in <span className="text-slate-800 font-bold">Mumbai, India</span>. We work remotely with clients across India and overseas.</p>
              <p>Hours: <span className="text-slate-800 font-bold">Mon&ndash;Sat, 10:00&ndash;19:00 IST</span></p>
              <p>We reply to every enquiry within <span className="text-slate-800 font-bold">24 hours</span>.</p>
              <p>Payment terms: <span className="text-slate-800 font-bold">50% advance, 50% on delivery</span></p>
              <div className="pt-2">
                <a
                  href="/#contact"
                  className="btn-yellow-solid inline-block px-4 py-2 text-sm"
                >
                  Book a Call
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--border-default)] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0 font-medium">
          <p>© {new Date().getFullYear()} CustomeAI. All rights reserved. </p>
          <div className="flex items-center space-x-6">
            <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy</Link>
            <Link href="/about" className="hover:text-slate-900 transition-colors">About</Link>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-[var(--border-default)] hover:border-[var(--border-strong)] text-slate-700 transition-colors font-bold"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
