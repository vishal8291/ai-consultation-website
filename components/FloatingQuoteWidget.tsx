"use client";
import React, { useState } from "react";
import { trackLead } from "@/lib/analytics";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, CheckCircle2, Zap } from "lucide-react";

export default function FloatingQuoteWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    contact: "",
    scope: "Business Package (₹30,000 / $375)",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          business: `Quick Widget Ingestion [Scope: ${form.scope}]`,
          contact: form.contact,
          message: `Quick Quote request for ${form.scope}`,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        trackLead("quote_widget");
      }
    } catch (err) {
      // ignore
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-yellow-solid px-5 py-3.5 rounded-full text-white font-semibold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg border border-black"
        >
          <Zap className="w-4 h-4 text-white animate-bounce" />
          <span>Instant Quote</span>
        </motion.button>
      </div>

      {/* Slide-over Drawer Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-end p-4 sm:p-6 pointer-events-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-md"
            />

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-2xl z-10 space-y-6 text-slate-900"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Get Instant Quote</h3>
                    <p className="text-xs text-slate-500">24-hour turnaround guaranteed</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-black mx-auto" />
                  <h4 className="text-xl font-bold text-slate-900">Quote Request Received!</h4>
                  <p className="text-xs text-slate-600">
                    We will send an itemized estimate to <span className="text-black font-semibold">{form.contact}</span> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setIsOpen(false);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 text-xs font-bold text-white uppercase tracking-wider"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Select Website Scope</label>
                    <select
                      value={form.scope}
                      onChange={(e) => setForm({ ...form, scope: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 text-xs font-semibold focus:border-black outline-none"
                    >
                      <option value="Launch Package (₹12,000 / $150)">Launch Package (₹12,000 / $150)</option>
                      <option value="Business Package (₹30,000 / $375)">Business Package (₹30,000 / $375)</option>
                      <option value="Automate Package (₹65,000 / $800)">Automate Package (₹65,000 / $800)</option>
                      <option value="AI Customer Support Agent">AI Customer Support Agent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Your Name</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 text-xs focus:border-black outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Email or Phone</label>
                    <input
                      required
                      value={form.contact}
                      onChange={(e) => setForm({ ...form, contact: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 text-xs focus:border-black outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl btn-yellow-solid text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Submit Quote Request</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
