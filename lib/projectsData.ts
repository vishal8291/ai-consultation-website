export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: "Websites" | "AI Agents" | "Apps & SaaS";
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
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "lex-agent-legal-auditor",
    title: "LexAgent — AI Legal Auditor for SMEs",
    tagline: "AI-powered legal auditor that analyzes contracts, extracts clauses, and flags compliance risks in plain English.",
    category: "AI Agents",
    clientIndustry: "LegalTech & SME Compliance",
    results: {
      primary: "Clause Extraction",
      secondary: "Claude AI SDK",
      roi: "FastAPI & React",
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
  },
  {
    id: "freelance-ai-sales-agent",
    title: "Freelance AI Sales & Outreach Engine",
    tagline: "Multi-layer AI system that finds leads, conducts outreach, generates proposals, and manages a full CRM.",
    category: "AI Agents",
    clientIndustry: "Sales & B2B Lead Gen",
    results: {
      primary: "Automated Outreach",
      secondary: "Qdrant Cloud RAG",
      roi: "Gmail API Drips",
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
  },
  {
    id: "paperbag-ecommerce-leaf-ai",
    title: "Paperbag — Eco E-Commerce Platform",
    tagline: "Full-stack e-commerce platform with Razorpay payments, referral engine, and Groq/LLaMA powered 'Leaf AI' support bot.",
    category: "Websites",
    clientIndustry: "E-Commerce & Retail",
    results: {
      primary: "Razorpay Checkout",
      secondary: "Groq LLaMA Bot",
      roi: "Docker Containerized",
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
  },
  {
    id: "healthmap-shakticycle",
    title: "HealthMap AI (ShaktiCycle) — Mobile App",
    tagline: "Cross-platform mobile health app for cycle tracking, AI recommendations, and symptom logging.",
    category: "Apps & SaaS",
    clientIndustry: "Healthcare & Mobile Tech",
    results: {
      primary: "React Native Mobile",
      secondary: "Cycle & Symptoms",
      roi: "MongoDB Atlas Sync",
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
  },
  {
    id: "pdf-solution-saas",
    title: "PDFSolution — All-in-One PDF & OCR SaaS",
    tagline: "SaaS platform supporting PDF merge, split, OCR text extraction, compression, and conversion pipelines.",
    category: "Apps & SaaS",
    clientIndustry: "Document SaaS & Cloud Tools",
    results: {
      primary: "Python OCR Engine",
      secondary: "PDF Merge & Split",
      roi: "Vercel Deployed",
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
  },
  {
    id: "ai-consultation-website-gamma",
    title: "AI Consultation & Business Platform",
    tagline: "Business automation platform with AI workflow design, Razorpay paid consultations, and Framer Motion.",
    category: "AI Agents",
    clientIndustry: "AI Consulting & Technology",
    results: {
      primary: "Paid Booking Engine",
      secondary: "Next.js 16 & TS",
      roi: "Razorpay Gateway",
    },
    techStack: ["Next.js 16", "TypeScript", "MongoDB", "Tailwind CSS", "Framer Motion", "Razorpay"],
    description: "A business consultation and automation web platform featuring AI workflow blueprints, Razorpay payment processing, Google OAuth, and Framer Motion visual animations.",
    problem: "Businesses need a clear, interactive platform to book paid AI strategy audits and explore workflow automation blueprints.",
    solution: "Built a high-performance Next.js 16 agency platform with MongoDB lead management, user authentication, and responsive dark glassmorphic design.",
    features: [
      "Razorpay payment gateway integration for paid consultation bookings",
      "Framer Motion interactive animations and custom AI SVG graphics",
      "User authentication dashboard with consultation status tracking",
      "Sub-second load speed deployed on Vercel"
    ],
    svgType: "consultation-ai",
    featured: true,
    demoUrl: "https://ai-consultation-website-gamma.vercel.app",
  },
  {
    id: "vishal-developer-portfolio",
    title: "Vishal's Developer Portfolio Site",
    tagline: "Personal developer portfolio showcasing all full-stack MERN, Next.js, and AI agent projects.",
    category: "Websites",
    clientIndustry: "Software Engineering",
    results: {
      primary: "Full-Stack Hub",
      secondary: "MERN + Next.js",
      roi: "Live Vercel Hub",
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
  },
  {
    id: "entrance-exam-recommendation-system",
    title: "Entrance Exam & Recommendation System",
    tagline: "9-module MERN stack recommendation system built leading a 3-member engineering team.",
    category: "Apps & SaaS",
    clientIndustry: "EdTech & University Systems",
    results: {
      primary: "9-Module MERN System",
      secondary: "Agile Team Build",
      roi: "Matching Engine",
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
