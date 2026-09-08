"use client";
import React from "react";
import Footer from "@/components/Footer";
import { ShieldCheck, CheckCircle2, FileText, Lock, Scale } from "lucide-react";

export default function TermsPageClient() {
  return (
    <main className="min-h-screen bg-white text-slate-900 antialiased selection:bg-black selection:text-white">

      {/* Hero Banner */}
      <section className="pt-32 pb-12 sm:pt-40 sm:pb-16 bg-white border-b border-[var(--border-default)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div style={{ color: "var(--accent)" }} className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[var(--surface-alt)] text-xs font-mono font-bold border border-[var(--border-default)]">
            <Scale className="w-3.5 h-3.5" />
            <span>LEGAL AGREEMENT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">Terms & Conditions</h1>
          <p className="text-slate-600 text-xs sm:text-sm">
            Last Updated: August 22, 2026 • Official Operating & Engineering Ground Rules
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-slate-700 text-sm leading-relaxed">
          
          {/* Introduction */}
          <div className="space-y-3 border-b border-slate-200 pb-6">
            <h2 className="text-xl font-semibold text-slate-900">1. Agreement to Terms</h2>
            <p>
              By placing an order, submitting a deposit, or engaging services with <strong>CustomeAI</strong> ("Agency", "We", "Us", or "Our"), you ("Client", "You") agree to be bound by these Terms and Conditions. These terms govern all website development, software engineering, and AI automation projects.
            </p>
          </div>

          {/* Section 2: Ground Rules */}
          <div className="space-y-4 border-b border-slate-200 pb-6">
            <h2 className="text-xl font-semibold text-slate-900">2. Core Ground Rules & Payment Terms</h2>
            <ul className="space-y-3 list-disc pl-5">
              <li>
                <strong>50% Advance & 50% Delivery Policy:</strong> All engineering projects require a 50% advance deposit via Razorpay prior to sprint commencement. The remaining 50% balance is due upon final project completion prior to domain propagation.
              </li>
              <li>
                <strong>Timeline Start Criteria:</strong> The project delivery timeline (5-7 days for Launch, 2-3 weeks for Business, 4-6 weeks for Automate) officially begins after we receive your complete text content, brand assets, and logo files.
              </li>
              <li>
                <strong>Scope Change Policy:</strong> Any requests for additional pages, custom API integrations, or architectural changes mid-sprint will receive an itemized revised quote for client approval before implementation.
              </li>
              <li>
                <strong>100% Code IP Ownership:</strong> Full source code copyright, GitHub repository ownership, and design intellectual property are completely transferred to the Client upon 100% final payment receipt.
              </li>
              <li>
                <strong>Domain & Hosting Extra:</strong> Client is responsible for direct subscription fees to domain registrars (e.g. GoDaddy, Namecheap) and hosting infrastructure (e.g. Vercel, Cloudflare, AWS).
              </li>
              <li>
                <strong>30-Day Free Support Warranty:</strong> Every project includes 30 consecutive calendar days of complimentary post-launch technical support covering bug fixes, broken link repairs, and speed telemetry.
              </li>
            </ul>
          </div>

          {/* Section 3: Payment Gateway & Razorpay */}
          <div className="space-y-3 border-b border-slate-200 pb-6">
            <h2 className="text-xl font-semibold text-slate-900">3. Payment Gateway & Security</h2>
            <p>
              All online payments are securely processed through Razorpay. We do not store credit card or bank account details on our servers. Transactions are encrypted using 256-bit SSL technology and verified via server-side HMAC SHA256 cryptographic signatures.
            </p>
          </div>

          {/* Section 4: Cancellation & Refund Policy */}
          <div className="space-y-3 border-b border-slate-200 pb-6">
            <h2 className="text-xl font-semibold text-slate-900">4. Cancellation & Refund Policy</h2>
            <p>
              If a project is cancelled by the Client prior to engineering work starting (within 48 hours of advance payment), a 100% full refund of the deposit will be issued. Once design wireframing or Next.js 16 development has commenced, the 50% advance deposit covers labor incurred and is non-refundable.
            </p>
          </div>

          {/* Section 5: Limitation of Liability */}
          <div className="space-y-3 border-b border-slate-200 pb-6">
            <h2 className="text-xl font-semibold text-slate-900">5. Limitation of Liability</h2>
            <p>
              In no event shall CustomeAI or its lead engineer Vishal be liable for any indirect, incidental, special, or consequential damages resulting from third-party server outages (Vercel, Cloudflare, AWS), domain expiration, or unauthorized client modification of delivered source code.
            </p>
          </div>

          {/* Section 6: Contact */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">6. Legal Enquiries & Contact</h2>
            <p>
              For legal inquiries or questions regarding these Terms & Conditions, please contact us directly at:
            </p>
            <div className="p-4 bg-white text-xs font-mono font-bold text-slate-800">
              Email: vishal.buildss@gmail.com <br />
              Platform: CustomeAI Web & AI Systems
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
