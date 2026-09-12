"use client";
import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

/**
 * Every snippet below is real code running in this repository, trimmed for
 * readability. Nothing here is illustrative or invented: the previous version
 * of this component showed a Groq/Qdrant/LangChain Python stack that does not
 * exist anywhere in the codebase, which would have been a false technical
 * claim on a client-facing page.
 */
const SNIPPETS = [
  {
    id: "payments",
    tab: "Payment verification",
    concern: "A payment can't be faked by editing the page",
    filename: "app/api/razorpay/verify-payment/route.ts",
    explanation:
      "The browser tells us a payment succeeded. We never take its word for it: the signature is re-computed server-side with your secret key, compared in constant time, and the amount is read back from Razorpay rather than from the request.",
    code: `const body = razorpay_order_id + "|" + razorpay_payment_id;
const expectedSignature = crypto
  .createHmac("sha256", key_secret)
  .update(body.toString())
  .digest("hex");

// Constant-time compare: a plain === leaks timing information
const isSignatureValid = timingSafeStringCompare(
  expectedSignature,
  razorpay_signature
);

if (!isSignatureValid) {
  return NextResponse.json(
    { error: "Invalid payment verification signature" },
    { status: 400 }
  );
}

// Authoritative amount comes from Razorpay, never from the client,
// which could otherwise claim it paid any figure it liked.
const order = await razorpay.orders.fetch(razorpay_order_id);
const amount = Number(order.amount) / 100;`,
  },
  {
    id: "leads",
    tab: "Lead capture",
    concern: "An enquiry never gets silently lost",
    filename: "app/api/consultation/route.ts",
    explanation:
      "Enquiries are rate-limited against spam, trimmed to safe lengths, and stored before anything else happens. The notification email is deferred with after() so a slow mail provider can never delay or fail the customer's submission.",
    code: `// Max 5 submissions per minute per IP
const rateCheck = await checkRateLimit(\`consultation_submit_\${ip}\`, {
  limit: 5,
  windowSeconds: 60,
});
if (!rateCheck.success) {
  return NextResponse.json(
    { error: "Too many submission attempts." },
    { status: 429 }
  );
}

const consultation = await Consultation.create({
  name: cleanName,
  business: cleanBusiness,
  contact: cleanContact,
  message: cleanMessage,
});

// Deferred until after the response is sent. An un-awaited bare call
// gets frozen mid-flight by the serverless runtime and the mail is lost.
after(() => sendAdminNotification(subject, html));`,
  },
  {
    id: "ai",
    tab: "AI grounding",
    concern: "The assistant can't invent a price to your customer",
    filename: "lib/gemini.ts",
    explanation:
      "The chat assistant on this page is handed its facts at runtime from the same pricing data the pricing section renders. It is instructed to answer only from that, so it cannot quote a number that does not exist.",
    code: `// Built from the same PRICING_TIERS data the pricing page renders,
// so the assistant can never quote a stale or invented number.
const tiersSummary = PRICING_TIERS.map(
  (t) =>
    \`- \${t.name}: \${t.priceRangeINR}, delivered in \${t.deliveryTime}.\` +
    \` Includes: \${t.features.join(", ")}.\`
).join("\\n");

const response = await ai.models.generateContent({
  model: "gemini-3.6-flash",
  contents: userMessage,
  config: {
    systemInstruction: buildSystemPrompt(),
    temperature: 0.4,
  },
});`,
  },
];

export default function InteractiveTerminal() {
  const [activeId, setActiveId] = useState(SNIPPETS[0].id);
  const [copied, setCopied] = useState(false);

  const active = SNIPPETS.find((s) => s.id === activeId) ?? SNIPPETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(active.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="engineering"
      className="py-14 sm:py-16 bg-white border-b border-[var(--border-default)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl mb-10 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Under the hood
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4 tracking-tight">
            The parts you never see are the parts that cost you money
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Anyone can show you a homepage. Below is real code from this site,
            handling the three things that quietly break a small business online:
            a payment that can be faked, an enquiry that vanishes, and an AI that
            invents an answer.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* Concern selector — the tabs are phrased as the business risk, not
              the filename, so a non-technical visitor knows why it matters. */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {SNIPPETS.map((s) => {
              const isActive = s.id === active.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveId(s.id)}
                  aria-pressed={isActive}
                  className={`text-left p-4 sm:p-5 rounded-md border transition-colors ${
                    isActive
                      ? "border-[var(--foreground)] bg-[var(--surface-alt)]"
                      : "border-[var(--border-default)] bg-white hover:border-[var(--border-strong)]"
                  }`}
                >
                  <span
                    className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                    style={{ color: isActive ? "var(--accent)" : undefined }}
                  >
                    {s.tab}
                  </span>
                  <span className="block text-sm font-semibold text-slate-900 leading-snug">
                    {s.concern}
                  </span>
                </button>
              );
            })}

            <p className="text-sm text-slate-600 leading-relaxed mt-3">
              {active.explanation}
            </p>
          </div>

          {/* Code viewer. Deliberately the one dark surface on the page: it
              reads as a real editor and gives the layout a visual anchor. */}
          <div className="lg:col-span-8 w-full rounded-lg overflow-hidden border border-[var(--border-default)] bg-[#0f1216]">
            <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-white/10">
              <span className="font-mono text-xs text-slate-400 truncate">
                {active.filename}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="overflow-x-auto p-5 sm:p-6">
              <pre className="font-mono text-xs sm:text-[13px] leading-relaxed text-slate-200">
                <code>{active.code}</code>
              </pre>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
