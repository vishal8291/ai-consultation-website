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
    tagline: "AI-powered legal auditor that analyzes contracts, extracts clauses, and flags compliance risks in plain English.",
    category: "AI Agents",
    clientIndustry: "LegalTech & SME Compliance",
    results: {
      primary: "Reads contracts and flags risky clauses automatically",
      secondary: "Explains legal terms in plain English",
      roi: "Built end-to-end, ready to use",
    },
    techStack: ["Python", "FastAPI", "React", "MongoDB", "Claude AI SDK", "TailwindCSS"],
    description: "An AI-powered legal audit system that ingests SME contracts, agreements, and legal documents, performing automated clause extraction and risk analysis.",
    problem: "SMEs often sign complex vendor and client agreements without in-house legal counsel, exposing them to hidden liability clauses and compliance penalties.",
    solution: "Engineered LexAgent using Python FastAPI, React, and Claude AI SDK to automatically parse contracts and output plain-English compliance alerts.",
    features: [
      "Automated legal clause extraction and risk scoring",
      "Plain English explanations of complex legal jargon and penalties",
      "SME regulatory and compliance risk flagging",
      "FastAPI microservice backend with MongoDB document storage"
    ],
    svgType: "legal-ai",
    featured: true,
    demoUrl: "https://lex-agent.vercel.app/",
    githubUrl: "https://github.com/vishal8291/LexAgent",
    previewImage: "/images/projects/lex-agent-legal-auditor.jpg",
  },
  {
    id: "freelance-ai-sales-agent",
    engagement: "independent",
    title: "Freelance AI Sales & Outreach Engine",
    tagline: "Multi-layer AI system that finds leads, conducts outreach, generates proposals, and manages a full CRM.",
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
  },
  {
    id: "paperbag-ecommerce-leaf-ai",
    engagement: "independent",
    title: "Paperbag: Eco E-Commerce Platform",
    tagline: "Full-stack e-commerce platform with Razorpay payments, referral engine, and Groq/LLaMA powered 'Leaf AI' support bot.",
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
  },
  {
    id: "healthmap-shakticycle",
    engagement: "independent",
    title: "HealthMap AI (ShaktiCycle): Mobile App",
    tagline: "Cross-platform mobile health app for cycle tracking, AI recommendations, and symptom logging.",
    category: "Apps & SaaS",
    clientIndustry: "Healthcare & Mobile Tech",
    results: {
      primary: "One app, works on iPhone and Android",
      secondary: "AI-personalized health tips",
      roi: "Your data syncs instantly, everywhere",
    },
    techStack: ["React Native (Expo)", "TypeScript", "Node.js", "Express.js", "MongoDB Atlas"],
    description: "A cross-platform mobile application designed for women's cycle tracking, symptom logging, personalized AI wellness insights, and push notifications.",
    problem: "Users need a private, accurate, and actionable health companion rather than static calendar prediction tools.",
    solution: "Developed a mobile-first app using React Native (Expo) and TypeScript backed by Node.js, Express, and MongoDB Atlas with real-time data sync.",
    features: [
      "AI-powered cycle prediction and personalized wellness recommendations",
      "Symptom logging and body parameter tracking",
      "Push notification reminders for cycle phases and health checkups",
      "Secure MongoDB Atlas database architecture with real-time data sync"
    ],
    svgType: "health-ai",
    featured: true,
    githubUrl: "https://github.com/vishal8291/shakticycle",
    previewImage: "/images/projects/healthmap-shakticycle.jpg",
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
  {
    id: "vishal-developer-portfolio",
    engagement: "independent",
    title: "Vishal's Developer Portfolio Site",
    tagline: "Personal developer portfolio showcasing all full-stack MERN, Next.js, and AI agent projects.",
    category: "Websites",
    clientIndustry: "Software Engineering",
    results: {
      primary: "Unified Showcase for All Live Projects",
      secondary: "Built with Next.js + TypeScript",
      roi: "Deployed Live on Vercel",
    },
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "Vercel"],
    description: "Vishal's personal developer portfolio showcasing all full-stack applications, AI integrations, technical skills, and engineering experience.",
    problem: "Showcasing a wide range of independent MERN, Next.js, and Python AI builds in one unified, responsive platform.",
    solution: "Designed a clean, fast portfolio site built with Next.js and TailwindCSS.",
    features: [
      "Comprehensive project gallery with direct GitHub and Vercel live links",
      "Technical skill sets showcase (Java, TypeScript, Python, React, Next.js, Docker)",
      "Responsive design optimized for tech recruiters and clients",
      "Hosted live on Vercel"
    ],
    svgType: "portfolio",
    featured: false,
    demoUrl: "https://my-portfolio-ashy-five-43.vercel.app",
    previewImage: "/images/projects/vishal-developer-portfolio.jpg",
  },
  {
    id: "entrance-exam-recommendation-system",
    engagement: "independent",
    title: "Entrance Exam & Recommendation System",
    tagline: "9-module MERN stack recommendation system built leading a 3-member engineering team.",
    category: "Apps & SaaS",
    clientIndustry: "EdTech & University Systems",
    results: {
      primary: "9 Integrated Modules Shipped",
      secondary: "Led a 3-Person Agile Team",
      roi: "Automated Course-Matching Engine",
    },
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JavaScript"],
    description: "An Entrance Examination with Course Recommendation System featuring 9 integrated modules built using Agile + Iterative sprint methodologies.",
    problem: "Students struggle to choose appropriate academic courses based on their entrance exam scores and personal aptitudes.",
    solution: "Led a 3-member engineering team to design and build a 9-module MERN stack platform that evaluates entrance exam results and outputs tailored course recommendations.",
    features: [
      "Online entrance examination module with automated scoring",
      "Smart course recommendation algorithm based on score thresholds",
      "Sprint-planned 9-module system delivered through iterative Agile development",
      "Full MERN stack (React, Node, Express, MongoDB) architecture"
    ],
    svgType: "edtech-ai",
    featured: false,
  }
];
