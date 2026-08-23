"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Copy, Check, Play, Code2, Cpu, Zap, ShieldCheck } from "lucide-react";

const CODE_SNIPPETS = [
  {
    id: "nextjs-action",
    title: "Next.js 16 Server Action",
    language: "typescript",
    filename: "app/actions/websiteEngine.ts",
    code: `// Next.js 16 Turbopack Server Action
"use server";

import { revalidatePath } from "next/cache";
import { dbConnect } from "@/lib/db";
import { RazorpayOrder } from "@/lib/razorpay";

export async function createCustomWebsiteOrder(data: {
  packageTier: "launch" | "business" | "automate";
  clientEmail: string;
}) {
  await dbConnect();
  
  // Calculate 50% advance deposit math
  const priceMap = { launch: 12000, business: 30000, automate: 65000 };
  const advanceAmount = Math.round(priceMap[data.packageTier] * 0.5);

  const order = await RazorpayOrder.create({
    amount: advanceAmount * 100, // in paise
    currency: "INR",
    receipt: \`rcpt_\${Date.now()}\`,
  });

  return { success: true, orderId: order.id, deposit: advanceAmount };
}`,
    output: `✓ Compiled in 12ms (Turbopack Engine)
✓ Razorpay Order Created: order_Pz92KxM8a2Q
✓ 50% Advance Calculated: ₹15,000 (Business Tier)
✓ Handshake Verified: 200 OK`,
  },
  {
    id: "python-rag",
    title: "Python AI RAG Pipeline",
    language: "python",
    filename: "services/rag_agent.py",
    code: `# Python FastAPI + Groq LLaMA RAG Pipeline
from fastapi import FastAPI, BackgroundTasks
from langchain.vectorstores import Qdrant
from groq import Groq
import os

app = FastAPI(title="vishal.buildss AI Engine")
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.post("/api/ai/query")
async def execute_rag_pipeline(user_query: str):
    # Vector similarity search across documentation
    context_docs = qdrant_store.similarity_search(user_query, k=4)
    
    completion = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are vishal.buildss AI assistant."},
            {"role": "user", "content": f"Context: {context_docs}\\nQuery: {user_query}"}
        ],
        temperature=0.2
    )
    return {"response": completion.choices[0].message.content, "latency_ms": 142}`,
    output: `INFO:     Started server process [84920]
INFO:     Groq LLaMA-3.3-70B model loaded
INFO:     Qdrant Vector DB connected (450ms)
✓ Query: "How long to build an AI chatbot?"
✓ Response: "Delivered in 14 to 21 days with 100% source code ownership." (Latency: 142ms)`,
  },
  {
    id: "razorpay-webhook",
    title: "Razorpay Webhook Handler",
    language: "typescript",
    filename: "app/api/razorpay/webhook/route.ts",
    code: `// Secure HMAC SHA256 Payment Webhook Verification
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const bodyText = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(bodyText)
    .digest("hex");

  if (expectedSignature !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const payload = JSON.parse(bodyText);
  if (payload.event === "payment.captured") {
    // 50% advance confirmed -> trigger client dashboard access
    await grantClientAccess(payload.payload.payment.entity);
  }

  return NextResponse.json({ received: true });
}`,
    output: `✓ Webhook Received: x-razorpay-signature verified
✓ HMAC SHA256 Checksum: PASS
✓ Event: payment.captured (₹15,000)
✓ Status: 200 OK — Repository Access Granted`,
  },
];

export default function InteractiveTerminal() {
  const [activeTabId, setActiveTabId] = useState<string>("nextjs-action");
  const [copied, setCopied] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showOutput, setShowOutput] = useState<boolean>(true);

  const activeSnippet = CODE_SNIPPETS.find((s) => s.id === activeTabId) || CODE_SNIPPETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunTest = () => {
    setIsRunning(true);
    setShowOutput(false);
    setTimeout(() => {
      setIsRunning(false);
      setShowOutput(true);
    }, 600);
  };

  return (
    <section className="py-24 bg-white text-slate-900 relative overflow-hidden border-t border-slate-200 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-yellow-400 text-black text-xs font-black uppercase tracking-wider shadow-sm">
            INTERACTIVE CODE DEMO
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-4 mb-4 tracking-tight">
            Production-Grade Full-Stack Architecture
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            Explore live code snippets driving our Next.js 16 web applications, Python AI microservices, and Razorpay payment webhooks.
          </p>
        </div>

        {/* IDE Terminal Window Box */}
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-slate-950 border-2 border-slate-800">
          
          {/* Terminal Titlebar & Tabs */}
          <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            
            {/* macOS Control Dots */}
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs font-mono font-bold text-slate-400 hidden sm:inline">
                vishal.buildss — bash (zsh)
              </span>
            </div>

            {/* Code Tabs Selector */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {CODE_SNIPPETS.map((snippet) => (
                <button
                  type="button"
                  key={snippet.id}
                  onClick={() => {
                    setActiveTabId(snippet.id);
                    setShowOutput(true);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    activeTabId === snippet.id
                      ? "bg-yellow-400 text-black shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {snippet.title}
                </button>
              ))}
            </div>

            {/* Run & Copy Action Buttons */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleRunTest}
                disabled={isRunning}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold hover:bg-emerald-500/30 transition-all flex items-center space-x-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-emerald-400" />
                <span>{isRunning ? "Testing..." : "Test Run"}</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                title="Copy Code"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Terminal File Path Bar */}
          <div className="bg-slate-900/60 px-6 py-2 border-b border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="text-yellow-400 font-bold">📄 {activeSnippet.filename}</span>
            <span className="text-slate-500 uppercase">{activeSnippet.language}</span>
          </div>

          {/* Code Viewer Body */}
          <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm leading-relaxed text-slate-200 overflow-x-auto max-h-[420px] bg-slate-950">
            <pre className="text-slate-200">
              <code>{activeSnippet.code}</code>
            </pre>
          </div>

          {/* Live Execution Output Panel */}
          <AnimatePresence>
            {showOutput && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-slate-900 px-6 py-4 border-t border-slate-800 font-mono text-xs text-slate-300"
              >
                <div className="flex items-center space-x-2 text-slate-400 font-bold mb-2">
                  <Terminal className="w-4 h-4 text-yellow-400" />
                  <span>Execution Output Console:</span>
                </div>
                <pre className="text-emerald-400 whitespace-pre-wrap leading-snug">
                  {activeSnippet.output}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
