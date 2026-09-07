"use client";
import { useState, useEffect } from "react";
import { User, LogOut, Menu, X, FolderGit2, DollarSign, Zap, Sparkles, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    // Stay transparent for as long as we're over the dark hero (if this page has one) —
    // only pick up a backdrop once scrolled past it, where white nav text would
    // otherwise be unreadable against a light section.
    const getThreshold = () => {
      const hero = document.getElementById("hero");
      return hero ? hero.getBoundingClientRect().height - 80 : 24;
    };
    let threshold = getThreshold();
    const onScroll = () => setScrolled(window.scrollY > threshold);
    const onResize = () => {
      threshold = getThreshold();
      onScroll();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/users/me");
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    document.cookie = "user-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    setUser(null);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/40 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Brand wordmark */}
          <a href="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-full bg-white p-1 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <img
                src="/images/newlogo-clean.png"
                alt="CustomAI logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-lg font-bold tracking-tight text-white flex items-center">
              Custom<span style={{ color: "var(--accent)" }} className="font-semibold">AI</span>
              <span style={{ color: "var(--accent-teal)" }} className="ml-0.5">.</span>
            </span>
          </a>

          {/* Deloitte-style sentence-case nav links */}
          <div className="hidden lg:flex items-center space-x-9 text-[15px] font-normal text-white/85">
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>
            <a href="/#services" className="flex items-center gap-1 hover:text-white transition-colors">
              What we do <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </a>
            <a href="/#tech" className="flex items-center gap-1 hover:text-white transition-colors">
              Our stack <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </a>
            <a href="/projects" className="hover:text-white transition-colors">
              Our work
            </a>
            <a href="/#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
          </div>

          {/* Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            <AnimatePresence mode="wait">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : user ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-3 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15"
                >
                  <div style={{ background: "var(--accent)" }} className="w-7 h-7 text-white rounded-full flex items-center justify-center font-semibold text-xs shadow-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <a href="/dashboard" className="font-semibold text-xs text-white/85 hover:text-white transition-colors">
                    Dashboard
                  </a>
                  <button
                    onClick={handleLogout}
                    className="p-1 hover:bg-red-500/10 rounded-full text-white/50 hover:text-red-400 transition-all"
                    title="Logout"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ) : (
                <div className="flex items-center space-x-3">
                  <a
                    href="#contact"
                    style={{ background: "var(--accent)" }}
                    className="px-6 py-2.5 rounded-full text-white font-semibold text-sm transition-all shadow-sm hover:scale-105"
                  >
                    Contact
                  </a>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-full bg-white/10 border border-white/15 text-white transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-xl"
          >
            <div className="px-6 pt-4 pb-8 space-y-1 text-[15px] text-white/85">
              <a
                href="/"
                onClick={() => setIsOpen(false)}
                className="block py-3 border-b border-white/10 text-white font-medium"
              >
                Home
              </a>
              <a
                href="/#services"
                onClick={() => setIsOpen(false)}
                className="block py-3 border-b border-white/10 hover:text-white"
              >
                What we do
              </a>
              <a
                href="/#tech"
                onClick={() => setIsOpen(false)}
                className="block py-3 border-b border-white/10 hover:text-white"
              >
                Our stack
              </a>
              <a
                href="/projects"
                onClick={() => setIsOpen(false)}
                className="block py-3 border-b border-white/10 hover:text-white"
              >
                Our work
              </a>
              <a
                href="/#pricing"
                onClick={() => setIsOpen(false)}
                className="block py-3 border-b border-white/10 hover:text-white"
              >
                Pricing
              </a>
              <a
                href="/#contact"
                onClick={() => setIsOpen(false)}
                style={{ background: "var(--accent)" }}
                className="block mt-4 py-3 text-center rounded-full text-white font-semibold text-sm"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
