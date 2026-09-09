"use client";
import React from "react";
import Footer from "@/components/Footer";
import { ShieldCheck, Lock, Eye, Database } from "lucide-react";

export default function PrivacyPageClient() {
  return (
    <main className="min-h-screen bg-white text-slate-900 antialiased selection:bg-black selection:text-white">

      {/* Hero Banner */}
      <section className="pt-32 pb-12 sm:pt-40 sm:pb-16 bg-white border-b border-[var(--border-default)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div style={{ color: "var(--accent)" }} className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-[0.14em]">
            <Lock className="w-3.5 h-3.5" />
            <span>DATA PROTECTION & PRIVACY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">Privacy Policy</h1>
          <p className="text-slate-600 text-xs sm:text-sm">
            Last Updated: August 22, 2026 • Your Data Privacy & Security Commitments
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-slate-700 text-sm leading-relaxed">
          
          {/* Section 1: Overview */}
          <div className="space-y-3 border-b border-slate-200 pb-6">
            <h2 className="text-xl font-semibold text-slate-900">1. Overview</h2>
            <p>
              At <strong>CustomeAI</strong>, we respect your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, process, and safeguard information when you visit our website or interact with our services.
            </p>
          </div>

          {/* Section 2: Data We Collect */}
          <div className="space-y-4 border-b border-slate-200 pb-6">
            <h2 className="text-xl font-semibold text-slate-900">2. Information We Collect</h2>
            <p>We collect information that you voluntarily provide to us when submitting a form or booking a consultation audit:</p>
            <ul className="space-y-2 list-disc pl-5">
              <li><strong>Contact Information:</strong> Your name, email address, phone number, and business name.</li>
              <li><strong>Project Details:</strong> Project requirements, selected package tier, add-ons, and messages submitted via consultation audit forms.</li>
              <li><strong>Payment Data:</strong> Transaction ID, payment status, and order reference processed securely via Razorpay (we never store credit card numbers).</li>
              <li><strong>Technical Logs:</strong> IP address, browser type, and standard website analytics telemetry.</li>
            </ul>
          </div>

          {/* Section 3: How We Use Data */}
          <div className="space-y-4 border-b border-slate-200 pb-6">
            <h2 className="text-xl font-semibold text-slate-900">3. How We Use Your Information</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>To schedule and conduct your 15-minute diagnostic engineering audit call.</li>
              <li>To issue official invoices and process 50% advance / 50% delivery project payments via Razorpay.</li>
              <li>To engineer, deliver, and support your custom Next.js 16 website or AI system.</li>
              <li>To communicate project status updates via Email or WhatsApp.</li>
            </ul>
          </div>

          {/* Section 4: Storage & Security */}
          <div className="space-y-3 border-b border-slate-200 pb-6">
            <h2 className="text-xl font-semibold text-slate-900">4. Storage & Data Security</h2>
            <p>
              All consultation lead data is stored securely in encrypted MongoDB Atlas database clusters utilizing TLS 1.3 encryption in transit and AES-256 encryption at rest. We enforce strict role-based access control and JWT authentication for administrative access.
            </p>
          </div>

          {/* Section 5: Cookies */}
          <div className="space-y-4 border-b border-slate-200 pb-6">
            <h2 className="text-xl font-semibold text-slate-900">5. Cookies</h2>
            <p>We use a minimal set of cookies, strictly limited to what's needed to run the site:</p>
            <ul className="space-y-2 list-disc pl-5">
              <li><strong>Essential session cookies</strong> (<code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">user-token</code>, <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">admin-token</code>): keep you securely signed in to your client dashboard or the admin panel.</li>
              <li><strong>Consent preference cookie</strong> (<code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">cookie_consent</code>): remembers whether you've accepted or declined this cookie notice, so we don't ask again for 1 year.</li>
            </ul>
            <p>
              We do not use third-party advertising or tracking cookies. You can clear cookies at any time via your browser settings; doing so will simply sign you out and re-show the cookie notice on your next visit.
            </p>
          </div>

          {/* Section 6: Third-Party Processors */}
          <div className="space-y-4 border-b border-slate-200 pb-6">
            <h2 className="text-xl font-semibold text-slate-900">6. Third-Party Service Processors</h2>
            <p>We partner with trusted third-party infrastructure providers to deliver our services:</p>
            <ul className="space-y-2 list-disc pl-5">
              <li><strong>Razorpay:</strong> Secure payment processing and HMAC SHA256 payment verification.</li>
              <li><strong>MongoDB Atlas:</strong> Secure cloud database storage.</li>
              <li><strong>Vercel / Cloudflare:</strong> Edge network hosting and serverless API execution.</li>
            </ul>
          </div>

          {/* Section 7: User Rights */}
          <div className="space-y-3 border-b border-slate-200 pb-6">
            <h2 className="text-xl font-semibold text-slate-900">7. Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or permanent deletion of your personal contact data stored in our system at any time. Simply send an email request to our privacy team.
            </p>
          </div>

          {/* Section 8: Contact Privacy Team */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">8. Contact Us</h2>
            <p>
              If you have any questions or requests regarding this Privacy Policy, please contact:
            </p>
            <div className="p-4 bg-white text-sm text-slate-700">
              Email: customeai.tech@gmail.com <br />
              Platform: CustomeAI Web & AI Engineering
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
