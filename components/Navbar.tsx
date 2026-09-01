"use client";
import { useState, useEffect } from "react";
import { User, LogOut, Menu, X, FolderGit2, DollarSign, Zap, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
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
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/70 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Logo with Clean Transparent Globe Icon */}
          <a href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 p-1 flex items-center justify-center shadow-sm group-hover:border-black/60 group-hover:scale-105 transition-all">
              <img
                src="/images/newlogo-clean.png"
                alt="vishal.buildss logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900 flex items-center">
                vishal<span className="text-black font-extrabold ml-0.5">.buildss</span>
              </span>
            </div>
          </a>

          {/* Google Reference Style Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8 text-xs font-black uppercase tracking-widest text-slate-600">
            <a href="/" className="text-black font-black hover:text-slate-600 transition-colors">
              HOME
            </a>
            <a href="/#services" className="hover:text-slate-900 transition-colors">
              SERVICES
            </a>
            <a href="/#tech" className="hover:text-slate-900 transition-colors">
              TECHNOLOGY
            </a>
            <a href="/projects" className="hover:text-slate-900 transition-colors">
              WORK
            </a>
            <a href="/#pricing" className="hover:text-slate-900 transition-colors">
              PRICING
            </a>
          </div>

          {/* Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            <AnimatePresence mode="wait">
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-300 border-t-black rounded-full animate-spin" />
              ) : user ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-3 bg-slate-100/80 px-3.5 py-1.5 rounded-full border border-slate-200"
                >
                  <div className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center font-black text-xs shadow-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <a href="/dashboard" className="font-black text-xs text-slate-800 hover:text-black transition-colors">
                    Dashboard
                  </a>
                  <button
                    onClick={handleLogout}
                    className="p-1 hover:bg-red-500/10 rounded-full text-slate-400 hover:text-red-500 transition-all"
                    title="Logout"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ) : (
                <div className="flex items-center space-x-3">
                  <a
                    href="#contact"
                    className="px-7 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest transition-all shadow-sm hover:scale-105"
                  >
                    CONTACT
                  </a>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors"
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
            className="lg:hidden overflow-hidden bg-white border-t border-slate-200 shadow-xl"
          >
            <div className="px-6 pt-4 pb-8 space-y-4 text-xs font-black uppercase tracking-widest text-slate-900">
              <a
                href="/"
                onClick={() => setIsOpen(false)}
                className="block py-2.5 text-black font-black"
              >
                HOME
              </a>
              <a
                href="/#services"
                onClick={() => setIsOpen(false)}
                className="block py-2.5 hover:text-black"
              >
                SERVICES
              </a>
              <a
                href="/#tech"
                onClick={() => setIsOpen(false)}
                className="block py-2.5 hover:text-black"
              >
                TECHNOLOGY
              </a>
              <a
                href="/projects"
                onClick={() => setIsOpen(false)}
                className="block py-2.5 hover:text-black"
              >
                WORK
              </a>
              <a
                href="/#pricing"
                onClick={() => setIsOpen(false)}
                className="block py-2.5 hover:text-black"
              >
                PRICING
              </a>
              <a
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="block py-3 text-center rounded-full bg-slate-900 text-white font-black text-xs uppercase tracking-widest"
              >
                CONTACT
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
