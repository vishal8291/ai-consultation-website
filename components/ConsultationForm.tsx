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
    <section id="contact" className="py-14 sm:py-16 bg-white relative overflow-hidden border-t border-[var(--border-default)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
            Share your problem
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4 tracking-tight">
            What's slowing your business down?
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            No packages to pick from yet. Describe the actual problem, and we'll reply within 24 hours with an honest read on whether it's a website fix, an AI system, or something else entirely, plus a real price.
          </p>
        </div>

        {/* Form Container */}
        <div className="glass-card-pro bg-white p-6 sm:p-10">
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-6"
            >
              <div style={{ color: "var(--accent)" }} className="w-16 h-16 rounded-full bg-[var(--surface-alt)] border border-[var(--border-default)] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900">Got it. We're on it.</h3>

              <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed font-medium">
                Thank you <strong className="text-slate-900 font-semibold">{formData.name}</strong>. We'll read what you sent and reach out to you at <span className="text-slate-900 font-bold">{formData.contact}</span> within 24 hours with an honest take on the fix.
              </p>

              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="btn-white-solid px-8 py-3.5 text-sm"
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                  {errorMsg}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full bg-white border border-[var(--border-default)] rounded-lg p-3 text-slate-900 placeholder-slate-400 focus:border-[var(--border-strong)] focus:ring-2 focus:ring-[var(--accent)]/15 outline-none transition-all text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                    Email or Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="jane@company.com or +91 9999999999"
                    className="w-full bg-white border border-[var(--border-default)] rounded-lg p-3 text-slate-900 placeholder-slate-400 focus:border-[var(--border-strong)] focus:ring-2 focus:ring-[var(--accent)]/15 outline-none transition-all text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.business}
                    onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                    placeholder="Acme Systems Inc."
                    className="w-full bg-white border border-[var(--border-default)] rounded-lg p-3 text-slate-900 placeholder-slate-400 focus:border-[var(--border-strong)] focus:ring-2 focus:ring-[var(--accent)]/15 outline-none transition-all text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                    Closest Fit, If You Had to Guess *
                  </label>
                  <select
                    value={formData.projectScope}
                    onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                    className="w-full bg-white border border-[var(--border-default)] rounded-lg p-3 text-slate-900 focus:border-[var(--border-strong)] focus:ring-2 focus:ring-[var(--accent)]/15 outline-none transition-all text-sm font-bold cursor-pointer"
                  >
                    <option value="Launch Package (₹12,000 / $150)">A simple website (Launch, ₹12,000 / $150)</option>
                    <option value="Business Package (₹30,000 / $375)">A full business website (Business, ₹30,000 / $375)</option>
                    <option value="Automate Package (₹65,000 / $800)">A website + automation (Automate, ₹65,000 / $800)</option>
                    <option value="Custom AI Support & Automation System">Not sure, it's more of an AI/automation problem</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                  What's Actually Going Wrong? *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. 'Customers can't find us on Google', 'I spend 2 hours a day replying to the same WhatsApp questions', 'Our site looks outdated and nobody trusts it'..."
                  className="w-full bg-white border border-[var(--border-default)] rounded-lg p-3 text-slate-900 placeholder-slate-400 focus:border-[var(--border-strong)] focus:ring-2 focus:ring-[var(--accent)]/15 outline-none transition-all text-sm font-semibold"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-yellow-solid w-full py-4 text-sm flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {submitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Us the Problem</span>
                    <Send className="w-4 h-4 ml-1" />
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
