"use client";
import { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import { User, LogOut, Menu, X, FolderGit2, DollarSign, Zap, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "918291569470";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to talk about a project.")}`;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 5.83 2.42 8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.21-8.25 8.21zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.81-.78.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.24-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.14.16-.24.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.36-.77-1.85-.2-.49-.41-.42-.56-.42-.14-.01-.31-.01-.48-.01a.92.92 0 0 0-.67.31c-.23.24-.87.86-.87 2.09s.9 2.42 1.02 2.58c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.19.21-.58.21-1.08.14-1.19-.06-.11-.23-.17-.48-.29z" />
    </svg>
  );
}

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
      className={`fixed top-0 inset-x-0 z-50 bg-white border-b border-[var(--border-default)] transition-shadow duration-200 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Brand wordmark — see components/Logo.tsx to swap in a real mark */}
          <a href="/" aria-label="CustomeAI home" className="flex items-center">
            <Logo />
          </a>

          {/* Sentence-case nav links */}
          <div className="hidden lg:flex items-center space-x-9 text-[15px] font-normal text-[var(--foreground)]/80">
            <a href="/#services" className="hover:text-[var(--foreground)] transition-colors">
              What we do
            </a>
            <a href="/projects" className="hover:text-[var(--foreground)] transition-colors">
              Our work
            </a>
            <a href="/#pricing" className="hover:text-[var(--foreground)] transition-colors">
              Pricing
            </a>
            <a href="/about" className="hover:text-[var(--foreground)] transition-colors">
              About
            </a>
          </div>

          {/* Right-side group: kept as one flex item so it stays anchored to the
              right edge regardless of which children inside are hidden at a given
              breakpoint (previously the actions/icon/hamburger were separate flex
              children of the justify-between row, so hiding the center nav links
              between md and lg let them drift into the middle of the bar). */}
          <div className="flex items-center">
            {/* Action Button */}
            <div className="hidden md:flex items-center space-x-4">
              <AnimatePresence mode="wait">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-[var(--border-default)] border-t-[var(--foreground)] rounded-full animate-spin" />
                ) : user ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center space-x-3 bg-[var(--surface-alt)] px-3.5 py-1.5 rounded-full border border-[var(--border-default)]"
                  >
                    <div style={{ background: "var(--accent)" }} className="w-7 h-7 text-white rounded-full flex items-center justify-center font-semibold text-xs">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <a href="/dashboard" className="font-semibold text-xs text-[var(--foreground)]/85 hover:text-[var(--foreground)] transition-colors">
                      Dashboard
                    </a>
                    <button
                      onClick={handleLogout}
                      className="p-1 hover:bg-red-50 rounded-full text-[var(--foreground)]/50 hover:text-red-600 transition-all"
                      title="Logout"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Chat on WhatsApp"
                      title="Chat on WhatsApp"
                      className="w-10 h-10 flex items-center justify-center rounded-md bg-white border border-[var(--border-default)] text-slate-600 transition-colors hover:text-[#25D366] hover:border-[#25D366]"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                    </a>
                    <a
                      href="#contact"
                      className="btn-yellow-solid px-6 py-2.5 text-sm transition-transform hover:scale-105"
                    >
                      Contact
                    </a>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* WhatsApp stays visible on mobile even with the menu closed (md+ already shows it in the actions bar above) */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              title="Chat on WhatsApp"
              className="flex md:hidden w-10 h-10 items-center justify-center rounded-md bg-white border border-[var(--border-default)] text-slate-600 transition-colors hover:text-[#25D366] hover:border-[#25D366] mr-3"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-full bg-[var(--surface-alt)] border border-[var(--border-default)] text-[var(--foreground)] transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-white border-t border-[var(--border-default)] shadow-md"
          >
            <div className="px-6 pt-4 pb-8 space-y-1 text-[15px] text-[var(--foreground)]/85">
              <a
                href="/#services"
                onClick={() => setIsOpen(false)}
                className="block py-3 border-b border-[var(--border-default)] hover:text-[var(--foreground)]"
              >
                What we do
              </a>
              <a
                href="/projects"
                onClick={() => setIsOpen(false)}
                className="block py-3 border-b border-[var(--border-default)] hover:text-[var(--foreground)]"
              >
                Our work
              </a>
              <a
                href="/#pricing"
                onClick={() => setIsOpen(false)}
                className="block py-3 border-b border-[var(--border-default)] hover:text-[var(--foreground)]"
              >
                Pricing
              </a>
              <a
                href="/about"
                onClick={() => setIsOpen(false)}
                className="block py-3 border-b border-[var(--border-default)] hover:text-[var(--foreground)]"
              >
                About
              </a>
              <a
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="btn-yellow-solid block mt-4 py-3 text-center text-sm"
              >
                Contact
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="mt-3 py-3 flex items-center justify-center gap-2 rounded-md bg-white border border-[var(--border-default)] text-slate-700 font-semibold text-sm hover:text-[#25D366] hover:border-[#25D366] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
