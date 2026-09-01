"use client";
import React from "react";
import Link from "next/link";
import { Heart, Zap, ArrowUp, Globe, Github, Instagram, Mail } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-white/90 border border-slate-700 p-1 flex items-center justify-center overflow-hidden shadow-md">
                <img
                  src="/images/newlogo-clean.png"
                  alt="vishal.buildss logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-black text-white">
                vishal<span className="text-white font-extrabold">.buildss</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Website design packages (Launch, Business & Automate) and AI automation systems built by Vishal Tiwari.
            </p>

            {/* Social & Portfolio Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://vishal-tiwari.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-white hover:text-black text-white flex items-center justify-center transition-colors"
                title="Personal Portfolio: vishal-tiwari.me"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-white hover:text-slate-900 text-slate-300 flex items-center justify-center transition-colors"
                title="GitHub Account"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/vishal.buildss?igsi=eHBvNHVtZzJkemNp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-pink-600 hover:text-white text-slate-300 flex items-center justify-center transition-colors"
                title="Instagram Account"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links with Packages */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 mb-4">Web & AI Packages</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-semibold">
              <li><a href="/#pricing" className="hover:text-white transition-colors">Launch (₹12,000 / $150)</a></li>
              <li><a href="/#pricing" className="hover:text-white transition-colors">Business (₹30,000 / $375)</a></li>
              <li><a href="/#pricing" className="hover:text-white transition-colors">Automate (₹65,000 / $800)</a></li>
            </ul>
          </div>

          {/* Quick Legal & Company Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 mb-4">Company & Socials</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-semibold">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us & Founder</Link></li>
              <li><a href="https://vishal-tiwari.me" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center space-x-1"><span>Portfolio (vishal-tiwari.me)</span></a></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 mb-4">Direct Contact</h4>
            <div className="space-y-2 text-xs text-slate-400 font-medium">
              <p>Email: <a href="mailto:vishal.buildss@gmail.com" className="text-white font-bold hover:underline">vishal.buildss@gmail.com</a></p>
              <p>Portfolio: <a href="https://vishal-tiwari.me" target="_blank" rel="noopener noreferrer" className="text-white font-bold hover:underline">vishal-tiwari.me</a></p>
              <p>Delivery Timeline: <span className="text-slate-200 font-bold">5 Days to 4 Weeks</span></p>
              <p>Payment Terms: <span className="text-slate-200 font-bold">50% Advance, 50% Delivery</span></p>
              <div className="pt-2">
                <a
                  href="/#contact"
                  className="inline-block px-4 py-2 rounded-xl bg-white text-black font-black text-xs uppercase tracking-wider shadow-sm hover:bg-slate-200 transition-colors"
                >
                  Book a Call
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 space-y-4 sm:space-y-0 font-medium">
          <p>© {new Date().getFullYear()} vishal.buildss. All rights reserved. </p>
          <div className="flex items-center space-x-6">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-bold"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
