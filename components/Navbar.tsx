"use client";
import { useState, useEffect } from "react";
import { User, LogOut, Menu, X } from "lucide-react";
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
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
            AI Consult
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-lg font-medium text-slate-700 hover:text-purple-600 transition-colors">Home</a>
            <a href="/#services" className="text-lg font-medium text-slate-700 hover:text-purple-600 transition-colors">Services</a>
            <a href="/#contact" className="text-lg font-medium text-slate-700 hover:text-purple-600 transition-colors">Contact</a>
            
            {/* Auth Buttons */}
            <AnimatePresence mode="wait">
              {loading ? (
                <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
              ) : user ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-2 bg-linear-to-r from-purple-50 to-indigo-50 p-2 rounded-xl border border-purple-100"
                >
                  <div className="w-10 h-10 bg-linear-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-slate-800 hidden sm:inline">{user.name}</span>
                  <motion.button
                    onClick={handleLogout}
                    whileHover={{ scale: 1.05 }}
                    className="ml-2 p-2 hover:bg-red-500/10 rounded-xl text-red-600 hover:text-red-500 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex space-x-3"
                >
                  <a href="/login" className="px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-2xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl">Login</a>
                  <a href="/register" className="px-6 py-2.5 bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-2xl hover:shadow-2xl hover:-translate-y-0.5 transition-all shadow-xl">Register</a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-slate-200"
          >
            <div className="px-4 pt-4 pb-6 space-y-4">
              <a href="/" className="block py-3 px-4 text-lg font-medium text-slate-700 hover:text-purple-600 rounded-xl hover:bg-slate-100 transition-all">Home</a>
              <a href="/#services" className="block py-3 px-4 text-lg font-medium text-slate-700 hover:text-purple-600 rounded-xl hover:bg-slate-100 transition-all">Services</a>
              <a href="/#contact" className="block py-3 px-4 text-lg font-medium text-slate-700 hover:text-purple-600 rounded-xl hover:bg-slate-100 transition-all">Contact</a>
              
              {loading ? (
                <div className="flex items-center py-3 px-4">
                  <div className="w-6 h-6 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mr-3" />
                  <span>Loading...</span>
                </div>
              ) : user ? (
                <div className="flex items-center py-3 px-4 space-x-3 bg-linear-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-100">
                  <div className="w-12 h-12 bg-linear-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{user.name}</p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-red-500/10 rounded-xl text-red-600 hover:text-red-500 transition-all ml-auto"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3 pt-2">
                  <a href="/login" className="py-3 px-6 bg-slate-900 text-white font-semibold rounded-2xl hover:bg-slate-800 text-center transition-all shadow-lg hover:shadow-xl">Login</a>
                  <a href="/register" className="py-3 px-6 bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-2xl hover:shadow-2xl hover:-translate-y-0.5 transition-all shadow-xl text-center">Register</a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
