"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Calendar, Sparkles, Clock, Shield } from "lucide-react";

export default function ConsultationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    business: "",
    contact: "",
    projectScope: "Business Package (₹30,000 / $375)",
    budget: "₹30,000 - ₹65,000",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          business: `${formData.business} [Scope: ${formData.projectScope} | Budget: ${formData.budget}]`,
          contact: formData.contact,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || data.message || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Network error. Please try submitting again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-black text-white relative overflow-hidden border-t border-slate-800 bg-grid-pattern">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-xs font-semibold uppercase tracking-wider inline-block mb-3">
            SHARE YOUR PROBLEM
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4 tracking-tight">
            What's slowing your business down?
          </h2>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            No packages to pick from yet. Describe the actual problem, and we'll reply within 24 hours with an honest read on whether it's a website fix, an AI system, or something else entirely &mdash; plus a real price.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-slate-900 p-8 sm:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-800">
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-10 h-10 text-black" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold text-white">Got it &mdash; we're on it.</h3>

              <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed font-medium">
                Thank you <strong className="text-white font-semibold">{formData.name}</strong>. We'll read what you sent and reach out to you at <span className="text-white font-bold">{formData.contact}</span> within 24 hours with an honest take on the fix.
              </p>

              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="px-8 py-3.5 rounded-xl bg-white hover:bg-slate-200 text-black font-semibold text-sm transition-colors"
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-950/50 border border-red-800 text-red-400 text-xs font-bold">
                  {errorMsg}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-white placeholder-slate-500 focus:border-white focus:bg-slate-800 focus:ring-2 focus:ring-white/20 outline-none transition-all text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Email or Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="jane@company.com or +91 9999999999"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-white placeholder-slate-500 focus:border-white focus:bg-slate-800 focus:ring-2 focus:ring-white/20 outline-none transition-all text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.business}
                    onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                    placeholder="Acme Systems Inc."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-white placeholder-slate-500 focus:border-white focus:bg-slate-800 focus:ring-2 focus:ring-white/20 outline-none transition-all text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Closest Fit, If You Had to Guess *
                  </label>
                  <select
                    value={formData.projectScope}
                    onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-white focus:border-white focus:bg-slate-800 focus:ring-2 focus:ring-white/20 outline-none transition-all text-sm font-bold cursor-pointer"
                  >
                    <option value="Launch Package (₹12,000 / $150)">A simple website (Launch, ₹12,000 / $150)</option>
                    <option value="Business Package (₹30,000 / $375)">A full business website (Business, ₹30,000 / $375)</option>
                    <option value="Automate Package (₹65,000 / $800)">A website + automation (Automate, ₹65,000 / $800)</option>
                    <option value="Custom AI Support & Automation System">Not sure &mdash; it's more of an AI/automation problem</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  What's Actually Going Wrong? *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. 'Customers can't find us on Google', 'I spend 2 hours a day replying to the same WhatsApp questions', 'Our site looks outdated and nobody trusts it'..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-white placeholder-slate-500 focus:border-white focus:bg-slate-800 focus:ring-2 focus:ring-white/20 outline-none transition-all text-sm font-semibold"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4.5 rounded-2xl btn-white-solid text-black font-semibold text-sm flex items-center justify-center space-x-2 disabled:opacity-50 shadow-xl hover:scale-[1.01] transition-all"
              >
                {submitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Us the Problem</span>
                    <Send className="w-4 h-4 text-black ml-1" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
