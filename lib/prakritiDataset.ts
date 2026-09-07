export interface QAPair {
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}

export const PRAKRITI_DATASET: QAPair[] = [
  // 1. ABOUT US & FOUNDER (VISHAL)
  {
    question: "Who is Vishal?",
    answer: "Vishal is a Full-Stack Web & AI Systems Engineer specializing in Next.js 16, Python AI pipelines, and business workflow automation. He leads CustomAI.",
    category: "about",
    keywords: ["who", "vishal", "founder", "developer", "engineer", "owner"],
  },
  {
    question: "What is CustomAI?",
    answer: "CustomAI is a modern web engineering agency platform building custom Next.js 16 websites, full-stack portals, and AI agent automation systems delivered in 7 to 21 days.",
    category: "about",
    keywords: ["what", "CustomAI", "agency", "company", "platform", "business"],
  },
  {
    question: "Where is CustomAI located?",
    answer: "We operate remotely with global client coverage across India, the US, UK, and UAE.",
    category: "about",
    keywords: ["where", "location", "office", "country", "city", "remote", "india"],
  },
  {
    question: "What is your core mission?",
    answer: "Our mission is to eliminate manual operational waste by engineering high-speed custom websites and automated AI systems with 100% transparent math and zero hidden fees.",
    category: "about",
    keywords: ["mission", "goal", "vision", "purpose"],
  },
  {
    question: "Why choose CustomAI over solo freelancers?",
    answer: "Unlike freelancers who take 4-8 weeks with unpredictable hourly billing, we deliver in 7-21 days with fixed itemized pricing, sub-second Next.js 16 performance, and 30 days free support.",
    category: "about",
    keywords: ["freelancer", "freelance", "why", "choose", "versus", "compare"],
  },
  {
    question: "Why choose CustomAI over traditional agencies?",
    answer: "Traditional agencies charge $30k+ markups and take months. We deliver identical enterprise-grade Next.js 16 & AI systems in 7-21 days starting at ₹12,000 ($150) with 100% code IP ownership.",
    category: "about",
    keywords: ["agency", "traditional", "versus", "compare", "markup", "expensive"],
  },
  {
    question: "How can I contact Vishal directly?",
    answer: "You can email Vishal directly at vishal.buildss@gmail.com or submit a 15-minute consultation audit booking on our website.",
    category: "about",
    keywords: ["contact", "email", "reach", "phone", "vishal.buildss@gmail.com", "talk"],
  },
  {
    question: "What is your email address?",
    answer: "Our official contact email is vishal.buildss@gmail.com.",
    category: "about",
    keywords: ["email", "address", "mail"],
  },
  {
    question: "What is your working style?",
    answer: "We work in rapid 7-to-21-day engineering sprints with clear milestone updates, zero fluff, and 50% advance / 50% delivery terms.",
    category: "about",
    keywords: ["working", "style", "sprint", "methodology", "process"],
  },
  {
    question: "Are you accepting new projects?",
    answer: "Yes! We are currently scheduling new website design and AI pipeline builds for this month.",
    category: "about",
    keywords: ["accepting", "available", "schedule", "new", "project", "slot"],
  },

  // 2. PRICING & PACKAGES
  {
    question: "What are your website packages?",
    answer: "We offer 3 fixed packages: 1. Launch Package (₹12,000 / $150), 2. Business Package (₹30,000 / $375), 3. Automate Package (₹65,000 / $800).",
    category: "pricing",
    keywords: ["packages", "plans", "pricing", "cost", "rates", "list"],
  },
  {
    question: "How much does a basic 1-page website cost?",
    answer: "Our Launch Package for a 1-page high-converting landing site costs ₹12,000 ($150) delivered in 5 to 7 days.",
    category: "pricing",
    keywords: ["basic", "1-page", "landing", "starter", "launch", "12000", "150"],
  },
  {
    question: "What is included in the Launch Package?",
    answer: "The Launch Package (₹12,000 / $150) includes a 1-page landing site, mobile responsive layout, smooth animations, contact + WhatsApp button, basic SEO setup, and 1 revision round in 5-7 days.",
    category: "pricing",
    keywords: ["launch", "package", "details", "includes", "features", "12000"],
  },
  {
    question: "How much does the Business Package cost?",
    answer: "Our Business Package costs ₹30,000 ($375) delivered in 2 to 3 weeks. It is our most popular tier.",
    category: "pricing",
    keywords: ["business", "cost", "price", "30000", "375"],
  },
  {
    question: "What is included in the Business Package?",
    answer: "The Business Package (₹30,000 / $375) includes up to 8 pages, custom design + GSAP animations, CMS/blog system, payment gateway integration, basic AI chatbot, SEO optimization, and 3 revision rounds in 2-3 weeks.",
    category: "pricing",
    keywords: ["business", "package", "details", "includes", "features", "30000"],
  },
  {
    question: "How much does the Automate Package cost?",
    answer: "Our Automate Package costs ₹65,000 ($800) delivered in 4 to 6 weeks.",
    category: "pricing",
    keywords: ["automate", "cost", "price", "65000", "800"],
  },
  {
    question: "What is included in the Automate Package?",
    answer: "The Automate Package (₹65,000 / $800) includes everything in Business + custom AI chatbot trained on your data, lead capture automation, WhatsApp/email automation, admin dashboard, API integrations, and unlimited revisions in 4-6 weeks.",
    category: "pricing",
    keywords: ["automate", "package", "details", "includes", "features", "65000"],
  },
  {
    question: "What is the price range for Launch Package?",
    answer: "The Launch Package price range is ₹12,000 to ₹18,000 ($150 to $220).",
    category: "pricing",
    keywords: ["range", "launch", "18000", "220"],
  },
  {
    question: "What is the price range for Business Package?",
    answer: "The Business Package price range is ₹30,000 to ₹50,000 ($375 to $625).",
    category: "pricing",
    keywords: ["range", "business", "50000", "625"],
  },
  {
    question: "What is the price range for Automate Package?",
    answer: "The Automate Package price range is ₹65,000 to ₹1,20,000 ($800 to $1,500).",
    category: "pricing",
    keywords: ["range", "automate", "120000", "1500"],
  },
  {
    question: "Do you offer custom pricing quotes?",
    answer: "Yes! Use our interactive quote estimator on the homepage to customize pages and add-ons for an instant custom quote.",
    category: "pricing",
    keywords: ["custom", "quote", "estimator", "tailored", "calculator"],
  },
  {
    question: "Are your prices fixed?",
    answer: "Yes, all our package quotes are 100% fixed with zero hidden charges.",
    category: "pricing",
    keywords: ["fixed", "hidden", "charges", "surprises", "honest"],
  },
  {
    question: "Do you support INR and USD currencies?",
    answer: "Yes, we support both ₹ INR and $ USD payments with an instant currency toggle on our pricing section.",
    category: "pricing",
    keywords: ["inr", "usd", "currency", "dollars", "rupees", "toggle"],
  },
  {
    question: "Why are your prices lower than big software agencies?",
    answer: "We eliminate bloated account manager overhead and use Next.js 16 AI engineering workflows to deliver high quality directly to you.",
    category: "pricing",
    keywords: ["lower", "cheap", "affordable", "reason", "value"],
  },
  {
    question: "Can I upgrade my package later?",
    answer: "Yes! You can upgrade from Launch to Business or add AI features at any time as your business grows.",
    category: "pricing",
    keywords: ["upgrade", "expand", "later", "scale"],
  },

  // 3. ADD-ONS & MAINTENANCE
  {
    question: "What add-ons do you offer?",
    answer: "Our add-ons include: Extra page (₹2,000), Logo design (₹5,000), AI chatbot only (₹15,000), Monthly maintenance (₹3,500/mo), SEO monthly (₹5,000/mo), and Content writing (₹1,500/page).",
    category: "addons",
    keywords: ["add-ons", "addons", "extras", "options", "services"],
  },
  {
    question: "How much does an extra page cost?",
    answer: "An additional custom page costs ₹2,000 ($25).",
    category: "addons",
    keywords: ["extra", "page", "2000", "25", "addition"],
  },
  {
    question: "How much does logo design cost?",
    answer: "Custom vector brand logo design costs ₹5,000 ($65).",
    category: "addons",
    keywords: ["logo", "design", "branding", "5000", "65"],
  },
  {
    question: "How much does a standalone AI chatbot cost?",
    answer: "An autonomous AI chatbot trained on your business data costs ₹15,000 ($190).",
    category: "addons",
    keywords: ["ai chatbot", "standalone", "bot", "15000", "190"],
  },
  {
    question: "How much is monthly maintenance?",
    answer: "Monthly website maintenance, security backups, and speed telemetry cost ₹3,500 / month ($45 / mo).",
    category: "addons",
    keywords: ["maintenance", "monthly", "care", "3500", "45"],
  },
  {
    question: "How much does monthly SEO service cost?",
    answer: "Monthly keyword ranking, technical SEO, and content optimization cost ₹5,000 / month ($65 / mo).",
    category: "addons",
    keywords: ["seo", "monthly", "ranking", "google", "5000", "65"],
  },
  {
    question: "How much does content writing cost per page?",
    answer: "Professional SEO content writing costs ₹1,500 per page ($20).",
    category: "addons",
    keywords: ["content", "writing", "copywriting", "text", "1500", "20"],
  },
  {
    question: "Is domain and hosting included?",
    answer: "No, domain name and hosting server subscription costs are paid directly by you to providers like Vercel, Cloudflare, or GoDaddy.",
    category: "addons",
    keywords: ["domain", "hosting", "godaddy", "vercel", "extra"],
  },
  {
    question: "Can I order just logo design or AI chatbot?",
    answer: "Yes, all add-on services can be ordered individually as standalone tasks.",
    category: "addons",
    keywords: ["order", "individual", "standalone", "just"],
  },
  {
    question: "Do you handle website migration?",
    answer: "Yes, we can migrate your old WordPress, Wix, or Squarespace site over to Next.js 16.",
    category: "addons",
    keywords: ["migrate", "migration", "wordpress", "wix", "squarespace"],
  },

  // 4. PAYMENT TERMS & RAZORPAY
  {
    question: "What are your payment terms?",
    answer: "Our ground rule is 50% advance deposit to start engineering, and 50% balance upon final project delivery.",
    category: "payments",
    keywords: ["payment", "terms", "advance", "deposit", "rule", "policy"],
  },
  {
    question: "How do I pay the 50% advance?",
    answer: "You can pay the 50% advance directly on our website using our integrated Razorpay payment gateway button.",
    category: "payments",
    keywords: ["pay", "advance", "deposit", "how", "button", "online"],
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept UPI, Credit Cards, Debit Cards, Net Banking, and Wallet payments via Razorpay.",
    category: "payments",
    keywords: ["upi", "card", "netbanking", "methods", "accept", "razorpay"],
  },
  {
    question: "Is Razorpay payment secure?",
    answer: "Yes! All transactions are encrypted via 256-bit SSL and verified with server-side HMAC SHA256 signatures.",
    category: "payments",
    keywords: ["secure", "razorpay", "safe", "encryption", "ssl"],
  },
  {
    question: "When do I pay the remaining 50%?",
    answer: "The final 50% balance is paid upon full project completion and final review before domain handover.",
    category: "payments",
    keywords: ["remaining", "final", "balance", "delivery", "when"],
  },
  {
    question: "Do you issue official invoices?",
    answer: "Yes, an official GST / tax invoice is issued upon payment completion.",
    category: "payments",
    keywords: ["invoice", "receipt", "gst", "tax"],
  },
  {
    question: "What is your refund policy?",
    answer: "If work has not started within 48 hours of advance deposit, a 100% full refund is issued immediately.",
    category: "payments",
    keywords: ["refund", "policy", "cancellation", "money back"],
  },
  {
    question: "Can international clients pay via Razorpay?",
    answer: "Yes, Razorpay accepts international credit and debit cards in USD and multi-currency formats.",
    category: "payments",
    keywords: ["international", "us", "uk", "card", "foreign"],
  },
  {
    question: "Are there any installment options?",
    answer: "Our standard milestone payment structure is 50% advance and 50% on delivery.",
    category: "payments",
    keywords: ["installment", "parts", "milestone", "split"],
  },
  {
    question: "Do I get a receipt after paying?",
    answer: "Yes, an instant automated email receipt with Payment ID is sent by Razorpay.",
    category: "payments",
    keywords: ["receipt", "proof", "confirmation", "email"],
  },

  // 5. TIMELINES & REQUIREMENTS
  {
    question: "How long does a website build take?",
    answer: "Delivery takes 5-7 days for Launch Package, 2-3 weeks for Business Package, and 4-6 weeks for Automate Package.",
    category: "timeline",
    keywords: ["time", "duration", "days", "weeks", "how long", "timeline"],
  },
  {
    question: "When does the delivery timeline start?",
    answer: "Ground rule: Delivery timeline starts official countdown after we receive your text content, images, and logo assets.",
    category: "timeline",
    keywords: ["start", "countdown", "content", "delay", "begins"],
  },
  {
    question: "What if I don't have text content or logo ready?",
    answer: "No problem! You can select our 'Logo Design' or 'Content Writing' add-ons and we will create them for you.",
    category: "requirements",
    keywords: ["no logo", "no content", "don't have", "text", "copy"],
  },
  {
    question: "What information do you need from me to start?",
    answer: "We need your business name, target services/products, reference websites you like, brand colors, and any text/images you have.",
    category: "requirements",
    keywords: ["need", "information", "requirement", "provide", "assets"],
  },
  {
    question: "What happens if I change the project scope mid-way?",
    answer: "Ground rule: Any additions or scope changes mid-sprint will receive a transparent revised quote before implementation.",
    category: "requirements",
    keywords: ["scope", "change", "revision", "new features", "midway"],
  },
  {
    question: "How many revision rounds are included?",
    answer: "Launch Package includes 1 revision round, Business Package includes 3 revision rounds, and Automate Package includes unlimited revisions.",
    category: "timeline",
    keywords: ["revision", "rounds", "changes", "edits", "feedback"],
  },
  {
    question: "Can you deliver faster for an urgent launch?",
    answer: "Yes, express priority engineering is available upon request for urgent product launches.",
    category: "timeline",
    keywords: ["urgent", "express", "fast track", "rush", "asap"],
  },
  {
    question: "Will my website work on mobile phones?",
    answer: "Yes, 100% of our websites are mobile-first responsive and tested across iPhone, Android, tablets, and desktop displays.",
    category: "technical",
    keywords: ["mobile", "phone", "responsive", "ipad", "tablet"],
  },
  {
    question: "How do we communicate during project build?",
    answer: "We provide daily updates via WhatsApp, Email, or Google Meet video calls based on your preference.",
    category: "timeline",
    keywords: ["communicate", "updates", "status", "whatsapp", "meet"],
  },
  {
    question: "Can I provide my own design wireframes?",
    answer: "Yes! If you have Figma or Adobe XD wireframes, we can code them directly into Next.js 16.",
    category: "requirements",
    keywords: ["figma", "wireframe", "design", "adobe xd", "convert"],
  },

  // 6. CODE OWNERSHIP & WARRANTY
  {
    question: "Do I own 100% of the source code?",
    answer: "Yes! Ground rule: 100% of full source code, repositories, design assets, and database schemas are handed over to you upon full payment.",
    category: "ownership",
    keywords: ["own", "ownership", "source code", "code", "rights", "github", "ip"],
  },
  {
    question: "Do you charge any monthly code license fee?",
    answer: "Never! You own the code 100% with zero recurring code licensing fees.",
    category: "ownership",
    keywords: ["license", "lock-in", "recurring", "fee", "ownership"],
  },
  {
    question: "What post-launch support is included?",
    answer: "Ground rule: Every project includes 30 days of free post-delivery support covering bug fixes and speed monitoring.",
    category: "support",
    keywords: ["support", "warranty", "post launch", "after", "free"],
  },
  {
    question: "What happens after the 30-day warranty expires?",
    answer: "You can optionally subscribe to our Monthly Maintenance plan (₹3,500/mo) or request on-demand support hourly.",
    category: "support",
    keywords: ["expires", "after 30 days", "subsequent", "future"],
  },
  {
    question: "How do you deliver the source code?",
    answer: "We transfer a private GitHub repository directly to your GitHub account alongside a zip archive.",
    category: "ownership",
    keywords: ["deliver", "github", "transfer", "repo", "zip"],
  },

  // 7. TECHNICAL & PERFORMANCE
  {
    question: "What tech stack do you use for websites?",
    answer: "We build modern websites using Next.js 16 (Turbopack), React 19, TypeScript, Tailwind CSS v4, and Framer Motion 12.",
    category: "technical",
    keywords: ["tech stack", "technology", "nextjs", "react", "tailwind"],
  },
  {
    question: "What tech stack do you use for AI agents?",
    answer: "We build AI systems using Python FastAPI microservices, Groq LLaMA-3.3-70B models, and Qdrant / MongoDB vector databases.",
    category: "technical",
    keywords: ["ai stack", "python", "fastapi", "groq", "llama", "vector"],
  },
  {
    question: "What database do you use?",
    answer: "We use MongoDB Atlas for dynamic lead storage, user authentication, and consultation management.",
    category: "technical",
    keywords: ["database", "mongodb", "atlas", "mongoose", "store"],
  },
  {
    question: "Will my website load fast on Google?",
    answer: "Yes! We optimize all Next.js 16 sites to target sub-second load times and 98-100 Google PageSpeed scores.",
    category: "technical",
    keywords: ["speed", "pagespeed", "google", "fast", "lighthouse", "score"],
  },
  {
    question: "Is SEO setup included?",
    answer: "Yes, basic SEO meta tags, open-graph tags, and sitemap XML generation are included in all packages.",
    category: "technical",
    keywords: ["seo", "meta", "sitemap", "google ranking", "search"],
  },
  {
    question: "Can I manage content myself without coding?",
    answer: "Yes! In Business & Automate packages, we integrate a CMS so you can edit text and blog posts easily.",
    category: "technical",
    keywords: ["cms", "manage", "admin", "edit", "without code"],
  },
  {
    question: "Do you support custom API integrations?",
    answer: "Yes, we integrate WhatsApp API, Zendesk, Stripe, Razorpay, Google Maps, CRM webhooks, and custom REST APIs.",
    category: "technical",
    keywords: ["api", "integration", "whatsapp", "crm", "webhook"],
  },
  {
    question: "Is SSL security included?",
    answer: "Yes, free SSL HTTPS encryption is enabled automatically when deployed to Vercel or Cloudflare.",
    category: "technical",
    keywords: ["ssl", "https", "security", "encryption"],
  },
  {
    question: "Where will my website be hosted?",
    answer: "We recommend hosting on Vercel or Cloudflare Edge CDN for global sub-second speed.",
    category: "technical",
    keywords: ["hosted", "server", "cloudflare", "vercel", "host"],
  },
  {
    question: "Can you build a full SaaS platform?",
    answer: "Yes, we build full-stack SaaS applications with user login dashboards, database sync, and subscription billing.",
    category: "technical",
    keywords: ["saas", "platform", "app", "dashboard", "full stack"],
  },

  // 8. AI CHATBOT & AUTOMATION SPECIFICS
  {
    question: "What can a custom AI chatbot do for my business?",
    answer: "A custom AI chatbot can answer customer FAQs 24/7, qualify leads, extract document data, and schedule appointments automatically.",
    category: "ai",
    keywords: ["ai chatbot", "benefits", "bot", "what can it do", "automation"],
  },
  {
    question: "How is the AI chatbot trained on my business data?",
    answer: "We ingest your company PDFs, website pages, and product FAQs into a RAG vector database so the AI answers with 100% accurate facts.",
    category: "ai",
    keywords: ["trained", "training", "rag", "vector", "pdf", "data"],
  },
  {
    question: "Can the AI chatbot connect to WhatsApp?",
    answer: "Yes, we can connect your AI chatbot to WhatsApp Business API for instant mobile lead replies.",
    category: "ai",
    keywords: ["whatsapp", "connect", "bot", "chat", "mobile"],
  },
  {
    question: "Can the AI chatbot collect leads and send them to my email?",
    answer: "Yes! Every lead captured by the AI chatbot is stored in your database and emailed directly to your inbox.",
    category: "ai",
    keywords: ["leads", "collect", "email", "capture", "notifications"],
  },
  {
    question: "Does the AI chatbot replace human support?",
    answer: "It handles ~80% of routine inquiries automatically and passes complex questions over to your human team seamlessly.",
    category: "ai",
    keywords: ["human", "replace", "support", "handoff", "team"],
  },

  // 9. BOOKING & NEXT STEPS
  {
    question: "How do I start a project with CustomAI?",
    answer: "Step 1: Select a package or build a quote. Step 2: Pay the 50% advance deposit via Razorpay. Step 3: Send us your text & logo to launch the build sprint!",
    category: "booking",
    keywords: ["how to start", "begin", "hire", "steps", "order"],
  },
  {
    question: "How do I book a consultation call?",
    answer: "Fill out the 15-Minute Consultation Booking form on our website. Vishal will reach out within 2 hours to schedule the call.",
    category: "booking",
    keywords: ["book", "consultation", "audit", "schedule", "call", "meet"],
  },
  {
    question: "Is the 15-minute consultation call free?",
    answer: "Yes! The initial 15-minute diagnostic engineering audit call is 100% free with zero obligation.",
    category: "booking",
    keywords: ["free", "audit", "call", "obligation", "cost"],
  },
  {
    question: "How soon will Vishal respond to my inquiry?",
    answer: "We respond to all website consultation submissions and emails within 2 hours during business hours.",
    category: "booking",
    keywords: ["respond", "response time", "reply", "how fast"],
  },
  {
    question: "Can I call Vishal on WhatsApp?",
    answer: "Yes, you can request a direct WhatsApp callback by submitting your phone number in our booking form.",
    category: "booking",
    keywords: ["whatsapp call", "callback", "phone number"],
  },

  // 10. GENERAL & MISC (REACHING 100+ COVERAGE)
  {
    question: "What industries do you build websites for?",
    answer: "We build websites for E-Commerce, LegalTech, Healthcare, Real Estate, EdTech, SaaS startups, Consultants, and Local Service Businesses.",
    category: "general",
    keywords: ["industries", "niche", "ecommerce", "real estate", "healthcare", "legal"],
  },
  {
    question: "Do you build e-commerce online stores?",
    answer: "Yes! We build custom e-commerce stores with product catalogs, shopping cart, Razorpay payment gateway, and dynamic coupons.",
    category: "general",
    keywords: ["ecommerce", "e-commerce", "store", "shop", "products", "cart"],
  },
  {
    question: "Can you redesign my existing website?",
    answer: "Yes, we can redesign your existing website into a modern, sub-second Next.js 16 platform.",
    category: "general",
    keywords: ["redesign", "revamp", "old website", "update", "refresh"],
  },
  {
    question: "What is your quality guarantee?",
    answer: "We guarantee 100% clean Next.js 16 code, sub-second page performance, mobile responsiveness, and 30 days post-launch support.",
    category: "general",
    keywords: ["quality", "guarantee", "promise", "standards"],
  },
  {
    question: "Thank you!",
    answer: "You're very welcome! If you have any more questions or want to start your build, feel free to ask me or book an audit call above!",
    category: "general",
    keywords: ["thank you", "thanks", "thx", "awesome", "great"],
  },
];
