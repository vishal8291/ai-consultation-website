import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import PrakritiKnowledge from "@/models/PrakritiKnowledge";
import { PRAKRITI_DATASET } from "@/lib/prakritiDataset";
import { askGemini } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const rawUserQuery = (messages?.[messages.length - 1]?.content || "").trim();
    const userQueryLower = rawUserQuery.toLowerCase().replace(/[^\w\s]/gi, " ");

    if (!userQueryLower || userQueryLower.trim().length === 0) {
      return NextResponse.json({
        role: "assistant",
        content: "Hello! I am Prakriti, how I can help you?",
      });
    }

    const cleanText = userQueryLower.trim();

    // =========================================================================
    // TIER 1: SMART HUMAN INTENT CLASSIFIER (Handles formal, informal, Hinglish & slang)
    // =========================================================================

    // 1. GREETINGS & CASUAL CHAT INTENT
    if (
      /^(hi|hello|hey|namaste|good morning|good evening|good afternoon|whats up|yo|kaise ho|hi there|hey prakriti)$/.test(cleanText) ||
      cleanText.includes("hello prakriti") ||
      cleanText.includes("hi prakriti")
    ) {
      return NextResponse.json({
        role: "assistant",
        content: "Hello! 👋 I am Prakriti, your strategy assistant at **CustomeAI**.\n\nHow can I help you today? You can ask me about our website packages, pricing, AI chatbots, delivery timelines, or booking a consultation with Vishal!",
      });
    }

    // 2. WHO ARE YOU / IDENTITY INTENT
    if (
      cleanText.includes("who are you") ||
      cleanText.includes("who is prakriti") ||
      cleanText.includes("tell me about yourself") ||
      cleanText.includes("what are you") ||
      cleanText.includes("about company") ||
      cleanText.includes("what is this website")
    ) {
      return NextResponse.json({
        role: "assistant",
        content: "I'm **Prakriti**, the AI Strategy Assistant at **CustomeAI**! 🚀\n\nWe build high-speed Next.js 16 websites, full-stack web applications, and custom AI automation systems delivered in **7 to 21 days** with 100% code ownership. How can I help you build your project today?",
      });
    }

    // 3. PRICING & COST INTENT (Matches: "whats the pricing", "pricing", "cost", "package prices", "how much", "kitne ka", etc.)
    if (
      cleanText.includes("pricing") ||
      cleanText.includes("price") ||
      cleanText.includes("prices") ||
      cleanText.includes("cost") ||
      cleanText.includes("rate") ||
      cleanText.includes("charges") ||
      cleanText.includes("package") ||
      cleanText.includes("how much") ||
      cleanText.includes("kitne ka") ||
      cleanText.includes("kitna lagega") ||
      cleanText.includes("budget") ||
      cleanText.includes("quote")
    ) {
      return NextResponse.json({
        role: "assistant",
        content: `We offer 3 clear, fixed engineering packages:

🚀 **1. Launch Package — ₹12,000 ($150)**
• 5–7 days delivery | 1-page high-speed landing site, contact form & responsive design.

💼 **2. Business Package — ₹30,000 ($375)** *(Most Popular)*
• 2–3 weeks delivery | Up to 8 pages, CMS blog, AI lead chatbot & Razorpay payment gateway.

🤖 **3. Automate Package — ₹65,000 ($800)**
• 4–6 weeks delivery | Custom AI agent workflows, admin dashboard, RAG vector search & full automation.

💳 **Payment Terms**: 50% advance deposit to start engineering, 50% upon final project delivery.

Would you like a custom quote estimate for your project?`,
      });
    }

    // 4. SERVICES & CAPABILITIES INTENT (Matches: "what do you help with", "how can you help me", "what services you provide", "what do you build", etc.)
    if (
      cleanText.includes("help with") ||
      cleanText.includes("help me") ||
      cleanText.includes("services") ||
      cleanText.includes("service") ||
      cleanText.includes("provide") ||
      cleanText.includes("what do you do") ||
      cleanText.includes("what do you build") ||
      cleanText.includes("what can you do") ||
      cleanText.includes("kya karte ho") ||
      cleanText.includes("kya banate ho") ||
      cleanText.includes("capabilities")
    ) {
      return NextResponse.json({
        role: "assistant",
        content: `Here is how we can help automate and grow your business:

🌐 **Custom Next.js 16 Websites**: High-speed, SEO-optimized websites built in 7–21 days with 100/100 Google PageSpeed scores.

🤖 **AI Agents & Chatbots**: 24/7 intelligent support bots (like me!), lead capture bots, and automated WhatsApp/email pipelines.

💻 **Web Apps & Dashboards**: Full-stack SaaS portals, admin dashboards, and custom business software using React 19 & Python.

⚡ **Process Automation & Audits**: Diagnostic audits to eliminate manual operational waste and save recurring costs.

Which service fits what you are looking to build?`,
      });
    }

    // 5. TIMELINE & SPEED INTENT (Matches: "how fast", "how long", "timeline", "duration", "days", "delivery")
    if (
      cleanText.includes("timeline") ||
      cleanText.includes("how long") ||
      cleanText.includes("how fast") ||
      cleanText.includes("duration") ||
      cleanText.includes("delivery") ||
      cleanText.includes("kitne din") ||
      cleanText.includes("speed") ||
      cleanText.includes("when will")
    ) {
      return NextResponse.json({
        role: "assistant",
        content: `We deliver all projects in guaranteed 7 to 21-day engineering sprints:

• ⚡ **Launch Package**: 5 to 7 days
• 💼 **Business Package**: 2 to 3 weeks
• 🤖 **Automate Package**: 4 to 6 weeks

Timelines begin immediately after receiving your content and 50% advance deposit!`,
      });
    }

    // 6. PAYMENT TERMS INTENT (Matches: "payment", "deposit", "advance", "razorpay", "50%")
    if (
      cleanText.includes("payment") ||
      cleanText.includes("deposit") ||
      cleanText.includes("advance") ||
      cleanText.includes("razorpay") ||
      cleanText.includes("pay") ||
      cleanText.includes("terms") ||
      cleanText.includes("50")
    ) {
      return NextResponse.json({
        role: "assistant",
        content: `Our payment terms are straightforward and transparent:

• **50% Advance Deposit** to initiate engineering & reserve your sprint slot.
• **50% Balance Payment** upon final project sign-off and delivery.
• Payments are processed securely via **Razorpay** (UPI, Credit/Debit Cards, NetBanking).
• You receive 100% full source code IP ownership upon final payment.`,
      });
    }

    // 7. DIRECT CONTACT INTENT (Matches: "contact", "email", "reach", "vishal", "mail", "call", "talk")
    if (
      cleanText.includes("contact") ||
      cleanText.includes("email") ||
      cleanText.includes("mail") ||
      cleanText.includes("reach") ||
      cleanText.includes("vishal") ||
      cleanText.includes("talk") ||
      cleanText.includes("call") ||
      cleanText.includes("connect")
    ) {
      return NextResponse.json({
        role: "assistant",
        content: `You can connect with Vishal directly:

📧 **Official Email**: [vishal.buildss@gmail.com](mailto:vishal.buildss@gmail.com)
🌐 **Personal Portfolio**: [https://vishal-tiwari.me](https://vishal-tiwari.me)
📸 **Instagram**: [@vishal.buildss](https://www.instagram.com/vishal.buildss?igsi=eHBvNHVtZzJkemNp)
📅 **Book Audit Call**: Scroll to our 15-minute consultation booking form on the homepage!`,
      });
    }

    // 8. ADD-ONS INTENT (Matches: "add ons", "addons", "extra page", "logo", "maintenance", "seo")
    if (
      cleanText.includes("add on") ||
      cleanText.includes("addon") ||
      cleanText.includes("extra page") ||
      cleanText.includes("logo") ||
      cleanText.includes("maintenance") ||
      cleanText.includes("seo")
    ) {
      return NextResponse.json({
        role: "assistant",
        content: `Our optional add-on services include:

• 📄 **Extra Page**: ₹2,000 ($25) per page
• 🎨 **Logo & Brand Identity**: ₹5,000 ($65)
• 🤖 **AI Chatbot Only**: ₹15,000 ($190)
• 🛠️ **Monthly Maintenance**: ₹3,500/mo ($45/mo)
• 📈 **Monthly SEO Optimization**: ₹5,000/mo ($65/mo)
• ✍️ **Professional Content Writing**: ₹1,500/page ($20/page)`,
      });
    }

    // =========================================================================
    // TIER 2: HIGH-PRECISION DATABASE SEARCH (For specific technical questions)
    // =========================================================================
    await connectDB();
    let dbEntries = await PrakritiKnowledge.find({});
    if (!dbEntries || dbEntries.length === 0) {
      dbEntries = await PrakritiKnowledge.insertMany(PRAKRITI_DATASET);
    }

    const stopwords = new Set(["is", "are", "the", "a", "an", "what", "how", "where", "can", "do", "you", "we", "for", "in", "of", "to", "my", "your"]);
    const queryTokens = cleanText
      .split(/\s+/)
      .filter((term) => term.length > 2 && !stopwords.has(term));

    let bestMatch: any = null;
    let highestScore = 0;

    for (const entry of dbEntries) {
      let score = 0;
      const qText = entry.question.toLowerCase();

      if (qText === cleanText) {
        score += 100;
      } else if (qText.includes(cleanText) || cleanText.includes(qText)) {
        score += 50;
      }

      if (entry.keywords && Array.isArray(entry.keywords)) {
        for (const token of queryTokens) {
          if (entry.keywords.some((kw: string) => kw.toLowerCase() === token)) {
            score += 25;
          } else if (entry.keywords.some((kw: string) => kw.toLowerCase().includes(token))) {
            score += 10;
          }
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = entry;
      }
    }

    if (bestMatch && highestScore >= 25) {
      return NextResponse.json({
        role: "assistant",
        content: bestMatch.answer,
        matchedQuestion: bestMatch.question,
        score: highestScore,
      });
    }

    // =========================================================================
    // TIER 3: GEMINI-POWERED CONVERSATIONAL FALLBACK (with a static safety net
    // if GEMINI_API_KEY isn't set or the request fails for any reason)
    // =========================================================================
    const geminiReply = await askGemini(rawUserQuery);
    if (geminiReply) {
      return NextResponse.json({
        role: "assistant",
        content: geminiReply,
      });
    }

    return NextResponse.json({
      role: "assistant",
      content: `Hello! I am Prakriti. I'm here to help you build your website or AI automation system! 🚀

Here is a quick summary of what we offer:
• 🚀 **Launch Package**: ₹12,000 ($150) — 5–7 days 1-page landing site
• 💼 **Business Package**: ₹30,000 ($375) — 2–3 weeks up to 8 pages + AI bot & payments
• 🤖 **Automate Package**: ₹65,000 ($800) — 4–6 weeks full AI workflow & admin dashboard

Feel free to ask me about pricing, timelines, payment terms, or email Vishal directly at **vishal.buildss@gmail.com**!`,
    });
  } catch (error: any) {
    console.error("Prakriti MongoDB Query Error:", error);
    return NextResponse.json(
      { error: "Failed to query Prakriti knowledge base" },
      { status: 500 }
    );
  }
}
