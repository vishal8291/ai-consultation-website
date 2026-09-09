"use client";
import React from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { ArrowUp, Globe, Github, Instagram } from "lucide-react";

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
            <Logo markSize="w-9 h-9" textSize="text-xl" />
            <p className="text-sm text-slate-600 leading-relaxed">
              A small studio that builds websites, AI systems, and custom software around the specific problem a small business brings us. Led by Vishal Tiwari.
            </p>

            {/* Social & Portfolio Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://vishal-tiwari.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md bg-white border border-[var(--border-default)] hover:border-[var(--border-strong)] text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors"
                title="Personal Portfolio: vishal-tiwari.me"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/vishal8291"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md bg-white border border-[var(--border-default)] hover:border-[var(--border-strong)] text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/vishal.buildss?igsi=eHBvNHVtZzJkemNp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md bg-white border border-[var(--border-default)] hover:border-[var(--border-strong)] text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors"
                title="Instagram Account"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links with Packages */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Services</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="/#services" className="hover:text-slate-900 transition-colors">Custom website design</a></li>
              <li><a href="/#services" className="hover:text-slate-900 transition-colors">Business and website review</a></li>
              <li><a href="/#services" className="hover:text-slate-900 transition-colors">AI assistants and automation</a></li>
              <li><a href="/#services" className="hover:text-slate-900 transition-colors">Custom apps and dashboards</a></li>
              <li><a href="/#pricing" className="hover:text-slate-900 transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Quick Legal & Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/about" className="hover:text-slate-900 transition-colors">About us</Link></li>
              <li><Link href="/projects" className="hover:text-slate-900 transition-colors">Our work</Link></li>
              <li><a href="https://vishal-tiwari.me" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">Founder&apos;s portfolio</a></li>
              <li><Link href="/terms" className="hover:text-slate-900 transition-colors">Terms and conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Get in touch</h4>
            <div className="space-y-2.5 text-sm text-slate-600 leading-relaxed">
              <p>
                <a href="mailto:customeai.tech@gmail.com" className="text-slate-900 hover:underline">
                  customeai.tech@gmail.com
                </a>
              </p>
              <p>
                Based in Mumbai, India. We work remotely with clients across
                India and overseas.
              </p>
              <p>Monday to Saturday, 10:00 to 19:00 IST.</p>
              <p>We reply to every enquiry within 24 hours.</p>
              <p>Payment terms are 50% advance, 50% on delivery.</p>
              <p className="pt-1">
                <a
                  href="/#contact"
                  className="text-slate-900 font-semibold hover:underline"
                >
                  Start a conversation
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--border-default)] pt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} CustomeAI. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
