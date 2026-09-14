export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: "Websites" | "AI Agents" | "Apps & SaaS";
  // Honest provenance: a paid, delivered client engagement vs a self-initiated
  // build. Rendered as a badge so a prospect is never misled about which is which.
  engagement: "client" | "independent";
  clientIndustry: string;
  results: {
    primary: string;
    secondary: string;
    roi: string;
  };
  techStack: string[];
  description: string;
  problem: string;
  solution: string;
  features: string[];
  svgType: "legal-ai" | "sales-ai" | "ecommerce-ai" | "health-ai" | "pdf-saas" | "consultation-ai" | "portfolio" | "edtech-ai";
  featured: boolean;
  demoUrl?: string;
  githubUrl?: string;
  previewImage?: string;
  /**
   * Present only on systems offered for sale as a ready-built product. Once
   * this exists the page is making a commercial offer rather than showing a
   * portfolio piece, so what transfers and what the buyer still has to pay for
   * are both stated explicitly rather than discovered after purchase.
   */
  forSale?: {
    priceINR: number;
    priceUSD: number;
    priceDisplayINR: string;
    priceDisplayUSD: string;
    /** What the buyer receives. */
    whatYouGet: string[];
    /** Paid third-party services the buyer supplies themselves. */
    runningCosts: string[];
  };
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "mahagro-india-training-platform",
    engagement: "client",
    title: "MAHAGRO INDIA: Mushroom Cultivation Training Platform",
    tagline: "Real client project: a bilingual booking site for a 30-year mushroom farming training institute, with resilient payments and enterprise-grade security.",
    category: "Websites",
    clientIndustry: "Agritech Education & Vocational Training",
    results: {
      primary: "Loads fast, even on slow phones",
      secondary: "Bilingual English + Marathi",
      roi: "Payment never fails, even if the gateway is down",
    },
    techStack: ["Vite", "Vanilla JS", "PHP 8", "MySQL", "Razorpay", "JSON-LD Schema"],
    description: "A real, live client project for MAHAGRO INDIA, a mushroom cultivation training institute operating in Maharashtra since 1995. Built as a bilingual (English/Marathi) booking site with seat registration, live payment processing, and an admin dashboard for the client's team.",
    problem: "MAHAGRO INDIA needed a fast, trustworthy booking site for their 2-day live training program, one that worked reliably for a bilingual audience (many prospective students are more comfortable in Marathi) and never lost a registration even if the payment gateway had issues.",
    solution: "Built a lightweight Vite + vanilla JS frontend (no framework overhead) with a real-time English/Marathi language switcher, an interactive profit calculator, and a PHP + MySQL backend. Wired Razorpay for card/UPI payments with an invisible fallback to WhatsApp + manual UPI if the gateway is ever unavailable, so registrations never get blocked. Cut the JS bundle from 600KB+ (unpinned CDN icon library) down to ~25KB by importing only the icons actually used. Locked down the site with a strict Content-Security-Policy, HSTS, and full input sanitization that's safe for Devanagari (Marathi) text. The earlier ASCII-only sanitizer was silently deleting Marathi names.",
    features: [
      "Real-time English ⇄ Marathi language switcher across the entire site",
      "Razorpay checkout with an invisible WhatsApp + UPI fallback if the gateway is down, so registration never blocks",
      "Live weekly registration counter with an honest static fallback, never a fabricated number",
      "Interactive profit calculator (bag quantity × market rate → estimated monthly revenue)",
      "Admin dashboard for the client's team: registrations list, CSV export, password-protected",
      "Strict CSP + HSTS + security headers, zero inline scripts, PDO prepared statements against SQL injection"
    ],
    svgType: "edtech-ai",
    featured: true,
    demoUrl: "https://mahagroindia.com",
    githubUrl: "https://github.com/vishal8291/mahagro-india",
    previewImage: "/images/projects/mahagro-india.jpg",
  },
  {
    id: "lex-agent-legal-auditor",
    engagement: "independent",
    title: "LexAgent: AI Legal Auditor for SMEs",
    tagline: "AI contract reviewer for Indian businesses. Flags risky clauses, checks GST terms, and explains everything in English and 22 Indian languages. Available to buy as a ready-built SaaS with subscription plans built in.",
    category: "AI Agents",
    clientIndustry: "LegalTech & SME Compliance",
    results: {
      primary: "Reviews a contract in about 20 seconds",
      secondary: "Reports in English and 22 Indian languages",
      roi: "Plans and billing built in, ready to sell",
    },
    techStack: ["Python", "FastAPI", "React", "MongoDB", "Google Gemini", "TailwindCSS"],
    description: "A complete contract review SaaS: upload a PDF or Word file, or photograph a paper contract, and get a clause-by-clause risk report with what to negotiate, in the language the reader is most comfortable with.",
    problem: "SMEs often sign vendor agreements, leases and NDAs without a lawyer, exposing them to hidden penalties, lock-ins and one-sided liability that surface only when something goes wrong.",
    solution: "Built LexAgent with FastAPI, React and Google Gemini: it reads uploaded files and phone photos, scores each risky clause, suggests what to ask for instead, and produces PDF reports in 23 languages, with free and paid plans and an admin dashboard.",
    features: [
      "Clause-by-clause risk scoring with suggested better terms and GST checks",
      "Reads PDF, Word and scanned files, plus photos taken with a phone camera",
      "Reports and PDFs in English and all 22 scheduled Indian languages",
      "Free, monthly and yearly plans with usage limits and an admin revenue dashboard",
      "Installs on phones as an app, with CA consultation booking built in",
    ],
    svgType: "legal-ai",
    featured: true,
    demoUrl: "https://lex-agent.vercel.app/",
    githubUrl: "https://github.com/vishal8291/LexAgent",
    previewImage: "/images/projects/lex-agent-legal-auditor.jpg",
    forSale: {
      priceINR: 59000,
      priceUSD: 699,
      priceDisplayINR: "₹59,000",
      priceDisplayUSD: "$699",
      whatYouGet: [
        "Full source code, React dashboard and FastAPI backend, yours to keep and modify",
        "Deployed on your own hosting and domain, connected to your own database and AI key",
        "Rebranded with your name, colours, logo and plan prices",
        "Cost and pricing sheet showing the AI cost per contract and the margin on each plan",
        "Handover walkthrough plus 30 days of support for anything that breaks",
      ],
      runningCosts: [
        "A Google Gemini API key, billed per use: about ₹3 per contract and ₹0.13 per photo page",
        "Backend hosting from about ₹700 a month; MongoDB Atlas has a free tier that suits low volume",
        "A payment gateway such as Razorpay if you want to take plan payments online, set up on request",
      ],
    },
  },
  {
    id: "freelance-ai-sales-agent",
    engagement: "independent",
    title: "Freelance AI Sales & Outreach Engine",
    tagline: "Multi-layer AI system that finds leads, conducts outreach, generates proposals, and manages a full CRM. Available to buy as a ready-built system.",
    category: "AI Agents",
    clientIndustry: "Sales & B2B Lead Gen",
    results: {
      primary: "Finds leads and writes proposals automatically",
      secondary: "Every message personalized, at scale",
      roi: "No manual follow-up needed",
    },
    techStack: ["Node.js", "React + Vite", "Claude API", "Qdrant Cloud RAG", "Gmail API", "TailwindCSS"],
    description: "An end-to-end autonomous sales agent pipeline that discovers target prospects, performs contextual RAG research, drafts personal proposals, and tracks pipeline CRM stages.",
    problem: "Freelancers and agency owners spend over 60% of their working hours manually searching for leads, drafting custom proposals, and following up on emails.",
    solution: "Built a multi-agent workflow leveraging Claude API and Qdrant Vector RAG with Gmail integration and a real-time React + Vite telemetry dashboard.",
    features: [
      "Autonomous prospect discovery and intent data scraping",
      "RAG vector retrieval via Qdrant Cloud for deep proposal personalization",
      "Direct Gmail API integration for automated outreach and follow-up drips",
      "Interactive React + Vite + Tailwind dashboard for full pipeline CRM visibility"
    ],
    svgType: "sales-ai",
    featured: true,
    githubUrl: "https://github.com/vishal8291/freelance-agent",
    previewImage: "/images/projects/freelance-ai-sales-agent.jpg",
    forSale: {
      priceINR: 35000,
      priceUSD: 425,
      priceDisplayINR: "₹35,000",
      priceDisplayUSD: "$425",
      whatYouGet: [
        "Full source code for the agent pipeline and the CRM dashboard",
        "Deployed on your own hosting, connected to your own Gmail account",
        "Rebranded with your name, colours, and logo",
        "Setup of the outreach templates and pipeline stages to match how you sell",
        "Handover walkthrough plus 30 days of support for anything that breaks",
      ],
      runningCosts: [
        "An Anthropic (Claude) API key, billed to you per use",
        "A Qdrant Cloud account for the vector search, free tier available",
        "Your own email sending limits and reputation apply",
      ],
    },
  },
  {
    id: "paperbag-ecommerce-leaf-ai",
    engagement: "independent",
    title: "Paperbag: Eco E-Commerce Platform",
    tagline: "Full-stack e-commerce platform with Razorpay payments, referral engine, and an AI support bot. Available to buy as a ready-built store.",
    category: "Websites",
    clientIndustry: "E-Commerce & Retail",
    results: {
      primary: "Checkout, referrals, and invoices all automatic",
      secondary: "AI chat bot answers customer questions",
      roi: "Built to run reliably in production",
    },
    techStack: ["React", "Node.js", "Express", "MongoDB", "Razorpay", "Groq / LLaMA API", "Docker"],
    description: "An eco-friendly full-stack e-commerce platform featuring product catalog, shopping cart, Razorpay payments, referral & coupon engine, real-time inventory, and PDF invoice generation.",
    problem: "Online stores struggle with cart abandonment and customer support delays during checkout.",
    solution: "Integrated 'Leaf AI' customer support chatbot using Groq/LLaMA API alongside JWT + Google OAuth authentication, real-time inventory tracking, and Docker containerization.",
    features: [
      "Integrated 'Leaf AI' customer service chatbot powered by Groq LLaMA API",
      "Razorpay payment gateway integration with JWT & Google OAuth",
      "Referral system, dynamic coupon engine, and instant PDF invoice exports",
      "Containerized with Docker, deployed on Vercel + Render"
    ],
    svgType: "ecommerce-ai",
    featured: true,
    demoUrl: "https://frontend-delta-inky-96.vercel.app/",
    previewImage: "/images/projects/paperbag-ecommerce-leaf-ai.jpg",
    forSale: {
      priceINR: 30000,
      priceUSD: 359,
      priceDisplayINR: "₹30,000",
      priceDisplayUSD: "$359",
      whatYouGet: [
        "Full source code for the storefront, admin, and AI support bot",
        "Deployed on your own hosting and domain, wired to your Razorpay account",
        "Rebranded with your name, colours, and logo",
        "Your product catalogue loaded in and the support bot pointed at your own answers",
        "Handover walkthrough plus 30 days of support for anything that breaks",
      ],
      runningCosts: [
        "A Groq API key for the support bot, free tier available",
        "Your own Razorpay account, which charges its usual per-transaction fee",
        "MongoDB and hosting, which have free tiers that suit low volume",
      ],
    },
  },
  {
    id: "pdf-solution-saas",
    engagement: "independent",
    title: "PDFSolution: All-in-One PDF & OCR SaaS",
    tagline: "SaaS platform supporting PDF merge, split, OCR text extraction, compression, and conversion pipelines.",
    category: "Apps & SaaS",
    clientIndustry: "Document SaaS & Cloud Tools",
    results: {
      primary: "Merge, split, and read text from any PDF",
      secondary: "Built to handle heavy use reliably",
      roi: "Live and working today",
    },
    techStack: ["React", "TypeScript", "Node.js", "Python Microservice", "MongoDB", "TailwindCSS"],
    description: "An all-in-one PDF SaaS platform supporting merge, split, OCR text extraction, compression, and format conversions.",
    problem: "Users waste time navigating multiple tools with file size restrictions and privacy concerns.",
    solution: "Engineered a unified SaaS tool powered by React/TypeScript and a specialized Python microservice for OCR processing and file transformation pipelines.",
    features: [
      "High-speed PDF merge, split, compression, and format conversion",
      "Python microservice pipeline for Optical Character Recognition (OCR)",
      "Secure file upload and temporary document processing environment",
      "Deployed live on Vercel with MongoDB telemetry"
    ],
    svgType: "pdf-saas",
    featured: true,
    demoUrl: "https://pdfsolution-seven.vercel.app",
    githubUrl: "https://github.com/vishal8291/pdfsolution",
    previewImage: "/images/projects/pdf-solution-saas.jpg",
  },
];
