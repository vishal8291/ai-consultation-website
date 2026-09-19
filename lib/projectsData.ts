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
  /** A real quote from the client, shown in the case study. Only add genuine, approved words. */
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
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
    tagline: "Our first paying client: a Maharashtra mushroom farming institute running since 1995, now taking course bookings and payments online in English and Marathi.",
    category: "Websites",
    clientIndustry: "Agritech Education & Vocational Training",
    results: {
      primary: "Students book and pay online, day or night",
      secondary: "Full site in English and Marathi",
      roi: "Bookings still work if the payment gateway is down",
    },
    techStack: ["Vite", "Vanilla JS", "PHP 8", "MySQL", "Razorpay", "JSON-LD Schema"],
    description: "MAHAGRO INDIA has trained people in mushroom cultivation in Maharashtra since 1995. We designed, built and launched their website, where students read about the 2-day training, work out what they could earn, and book and pay for a seat in English or Marathi. It is live at mahagroindia.com, and the MAHAGRO team manages bookings from their own dashboard.",
    problem: "MAHAGRO needed a website where new students could trust them, understand the 2-day training and book a seat on their own. Many students are more comfortable reading in Marathi, most visit on a phone with a slow connection, and a failed payment would mean a lost student.",
    solution: "We built a fast, simple site that works on any phone. Students switch between English and Marathi with one tap, see a profit calculator for their own numbers, and pay by UPI or card through Razorpay. If the payment gateway ever goes down, the booking quietly switches to WhatsApp and UPI, so no student is turned away. The MAHAGRO team sees every booking in a password-protected dashboard and can export the list. The site is secured against common attacks and is monitored around the clock.",
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
    id: "kesharji-saffron-ecommerce",
    engagement: "independent",
    title: "Kesharji: Luxury D2C Saffron Store",
    tagline: "A premium direct-to-consumer online store for a Kashmiri saffron brand, with Razorpay checkout, customer accounts and an owner dashboard. Available to buy as a ready-built store for any premium product brand.",
    category: "Websites",
    clientIndustry: "D2C E-Commerce & Food",
    results: {
      primary: "Shop, pay and track orders in one place",
      secondary: "Premium look built to sell high-value products",
      roi: "Owner dashboard with orders and sales funnel",
    },
    techStack: ["Node.js", "JavaScript", "MongoDB", "Razorpay", "HTML & CSS"],
    description: "A complete online store for a premium product brand: product pages with weight options, a shopping bag with coupons and a free-delivery meter, Razorpay checkout, customer accounts with order history, and a protected owner dashboard.",
    problem: "Premium brands selling only through marketplaces or Instagram lose margin to commissions and can't show the story, quality proof and gifting options that justify a higher price.",
    solution: "Built Kesharji as a fast, self-hosted D2C store: a luxury storefront with batch-wise quality report lookup, buying guides and recipes, Razorpay payments, customer login, and an owner dashboard for orders, enquiries, reviews, newsletter sign-ups and sales funnel tracking, protected with rate limiting and secure headers.",
    features: [
      "Product pages with live weight and price selection, wishlist and quick view",
      "Shopping bag with coupon codes, free-delivery progress and Razorpay checkout (UPI, cards, COD)",
      "Customer accounts with order history and profile",
      "Owner dashboard for orders, enquiries, reviews, newsletter and sales funnel stats",
      "Batch quality report lookup, buying guide and recipe sections to build trust",
      "Security built in: rate limiting, input sanitising and secure headers",
    ],
    svgType: "ecommerce-ai",
    featured: true,
    demoUrl: "https://kesharji.vercel.app/",
    previewImage: "/images/projects/kesharji-saffron-ecommerce.jpg",
    forSale: {
      priceINR: 35000,
      priceUSD: 425,
      priceDisplayINR: "₹35,000",
      priceDisplayUSD: "$425",
      whatYouGet: [
        "Full source code for the storefront, checkout and owner dashboard",
        "Deployed on your own hosting and domain, wired to your Razorpay account",
        "Rebranded with your name, colours, logo, products and photos",
        "Your product catalogue, prices and coupon codes loaded in",
        "Handover walkthrough plus 30 days of support for anything that breaks",
      ],
      runningCosts: [
        "Your own Razorpay account, which charges its usual per-transaction fee",
        "Hosting from about ₹600 a month; MongoDB Atlas has a free tier that suits low volume",
        "Product photography and your own quality certificates, if you want to show them",
      ],
    },
  },
  {
    id: "veyra-3d-real-estate-launch",
    engagement: "independent",
    title: "Veyra Residences: 3D Real Estate Launch Website",
    tagline: "A luxury property launch site with an interactive 3D tower buyers can spin, filter and click floor by floor to see live availability and prices. Available to buy and rebrand for your own project.",
    category: "Websites",
    clientIndustry: "Real Estate & Property Launches",
    results: {
      primary: "Buyers pick their floor on a live 3D tower",
      secondary: "Enquiries arrive on WhatsApp with the unit filled in",
      roi: "Smooth 60 fps on desktop and phones",
    },
    techStack: ["React", "Three.js", "React Three Fiber", "TypeScript", "Tailwind CSS", "GSAP"],
    description: "A launch website for an off-plan residential tower: a scroll-driven 3D hero, a clickable 3D floor explorer with unit availability, residence types with floor plans, amenities, location, a payment-plan and rental-yield calculator, and a WhatsApp enquiry form.",
    problem: "Property launches are sold with static brochures and PDF price lists. Buyers can't picture where a home sits in the building or tell what is still available, so sales teams spend their time answering the same questions.",
    solution: "Built Veyra as a fast 3D launch site: the tower is generated in the browser, every floor lights up to show matching available homes, and each unit links straight to a WhatsApp enquiry. Prices switch between AED, USD and INR, and the 3D scenes are tuned to stay smooth on ordinary phones.",
    features: [
      "Interactive 3D tower: drag to rotate, tap a floor to see its homes, prices and status",
      "Filter by home size and the floors with that size available light up",
      "Residence types with floor plans, photo galleries and starting prices",
      "Payment plan timeline with a rental-yield calculator",
      "Enquiry form that opens WhatsApp with the buyer's details and chosen unit",
      "Currency switcher for AED, USD and INR, and a design-film section for renders",
    ],
    svgType: "portfolio",
    featured: true,
    demoUrl: "https://veyra-residences.vercel.app/",
    previewImage: "/images/projects/veyra-3d-real-estate-launch.jpg",
    forSale: {
      priceINR: 45000,
      priceUSD: 545,
      priceDisplayINR: "₹45,000",
      priceDisplayUSD: "$545",
      whatYouGet: [
        "Full source code for the site and the 3D tower",
        "Deployed on your own hosting and domain",
        "Rebranded with your project name, logo, colours, renders and photos",
        "Your floors, unit list, prices, payment plan and WhatsApp number loaded in",
        "Handover walkthrough plus 30 days of support for anything that breaks",
      ],
      runningCosts: [
        "Hosting, from free for a demo to about ₹1,700 a month on Vercel Pro for commercial use",
        "A domain name, about ₹800 to ₹1,500 a year",
        "Your own architectural renders or walkthrough film, if you want to replace the sample ones",
      ],
    },
  },
  {
    id: "kaaya-realty-bw",
    engagement: "independent",
    title: "Kaaya Realty: Black & White Real Estate Agency Website",
    tagline: "A calm, monochrome website for a property agency, with searchable listings, a property popup with a home-loan calculator, and visits booked straight on WhatsApp. Available to buy and rebrand for your agency.",
    category: "Websites",
    clientIndustry: "Real Estate Agencies & Brokers",
    results: {
      primary: "Buyers search, shortlist and book a visit on WhatsApp",
      secondary: "Every listing has its own shareable link",
      roi: "Fast on any phone, no heavy code",
    },
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    description: "A complete agency website: a hero search for buy or rent, listings with filters and sorting, a property popup with gallery, specs, amenities and an EMI calculator, plus services, how-it-works steps, an about section and a contact form with a map.",
    problem: "Most agencies share listings as scattered WhatsApp photos and PDFs. Buyers can't search, compare or send a home to family, and agents repeat the same answers all day.",
    solution: "Built Kaaya as a fast, black-and-white agency site: buyers filter homes by area, size and budget, open any home for photos, details and a loan estimate, and tap once to book a visit on WhatsApp with the home already named. Agents share a single link per property instead of a pile of photos.",
    features: [
      "Hero search for buy or rent, locality and bedrooms that filters the listings",
      "Listings with filters and sorting; photos turn from black and white to colour on hover",
      "Property popup with gallery, price per sq ft, specs, amenities and a home-loan EMI calculator",
      "Schedule a visit on WhatsApp with the property already filled in",
      "A shareable link for every property, plus services, steps, about and a contact form with a map",
    ],
    svgType: "portfolio",
    featured: true,
    demoUrl: "https://kaaya-realty.vercel.app/",
    previewImage: "/images/projects/kaaya-realty-bw.jpg",
    forSale: {
      priceINR: 25000,
      priceUSD: 299,
      priceDisplayINR: "₹25,000",
      priceDisplayUSD: "$299",
      whatYouGet: [
        "Full source code for the website",
        "Deployed on your own hosting and domain",
        "Rebranded with your agency name, logo, colours and RERA number",
        "Your listings, prices, photos and WhatsApp number loaded in",
        "Handover walkthrough plus 30 days of support for anything that breaks",
      ],
      runningCosts: [
        "Hosting, free to start on Vercel, or about ₹1,700 a month on Vercel Pro for commercial use",
        "A domain name, about ₹800 to ₹1,500 a year",
        "Your own property photos, to replace the sample ones",
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
