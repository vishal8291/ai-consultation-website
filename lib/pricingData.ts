export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  priceINR: number;
  priceRangeINR: string;
  priceUSD: number;
  priceRangeUSD: string;
  popular?: boolean;
  deliveryTime: string;
  features: string[];
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "launch",
    name: "Launch",
    tagline: "Get online fast",
    priceINR: 12000,
    priceRangeINR: "₹12,000 – ₹18,000",
    priceUSD: 150,
    priceRangeUSD: "$150 – $220",
    deliveryTime: "5–7 days",
    features: [
      "1-page landing site",
      "Mobile responsive",
      "Smooth animations",
      "Contact + WhatsApp button",
      "Basic SEO setup",
      "1 revision round",
    ],
  },
  {
    id: "business",
    name: "Business",
    badge: "Most popular",
    popular: true,
    tagline: "Full business website",
    priceINR: 30000,
    priceRangeINR: "₹30,000 – ₹50,000",
    priceUSD: 375,
    priceRangeUSD: "$375 – $625",
    deliveryTime: "2–3 weeks",
    features: [
      "Up to 8 pages",
      "Custom design + GSAP animations",
      "CMS / blog system",
      "Payment gateway integration",
      "AI chatbot (basic)",
      "SEO optimized",
      "3 revision rounds",
    ],
  },
  {
    id: "automate",
    name: "Automate",
    tagline: "Website + AI system",
    priceINR: 65000,
    priceRangeINR: "₹65,000 – ₹1,20,000",
    priceUSD: 800,
    priceRangeUSD: "$800 – $1,500",
    deliveryTime: "4–6 weeks",
    features: [
      "Everything in Business",
      "Custom AI chatbot (trained on your data)",
      "Lead capture automation",
      "WhatsApp / email automation",
      "Admin dashboard",
      "API integrations",
      "Unlimited revisions",
    ],
  },
];

export interface AddonOption {
  id: string;
  name: string;
  priceINR: number;
  priceUSD: number;
  priceDisplayINR: string;
  priceDisplayUSD: string;
  description?: string;
}

export const ADDON_OPTIONS: AddonOption[] = [
  {
    id: "extra-page",
    name: "Extra page",
    priceINR: 2000,
    priceUSD: 25,
    priceDisplayINR: "₹2,000",
    priceDisplayUSD: "$25",
    description: "Additional custom page design & development",
  },
  {
    id: "logo-design",
    name: "Logo design",
    priceINR: 5000,
    priceUSD: 65,
    priceDisplayINR: "₹5,000",
    priceDisplayUSD: "$65",
    description: "Custom vector brand logo & asset kit",
  },
  {
    id: "ai-chatbot-only",
    name: "AI chatbot only",
    priceINR: 15000,
    priceUSD: 190,
    priceDisplayINR: "₹15,000",
    priceDisplayUSD: "$190",
    description: "Autonomous RAG AI bot trained on your data",
  },
  {
    id: "monthly-maintenance",
    name: "Monthly maintenance",
    priceINR: 3500,
    priceUSD: 45,
    priceDisplayINR: "₹3,500 / mo",
    priceDisplayUSD: "$45 / mo",
    description: "Speed monitoring, backups & monthly edits",
  },
  {
    id: "seo-monthly",
    name: "SEO monthly",
    priceINR: 5000,
    priceUSD: 65,
    priceDisplayINR: "₹5,000 / mo",
    priceDisplayUSD: "$65 / mo",
    description: "Keyword ranking, technical SEO & content audits",
  },
  {
    id: "content-writing",
    name: "Content writing (per page)",
    priceINR: 1500,
    priceUSD: 20,
    priceDisplayINR: "₹1,500",
    priceDisplayUSD: "$20",
    description: "Professional copy & SEO content writing",
  },
];

export const GROUND_RULES = [
  "50% advance, 50% on delivery",
  "Timeline starts after content received",
  "Scope changes = revised quote",
  "Source code handed over on full payment",
  "Domain + hosting cost extra",
  "Support for 30 days post-delivery (free)",
];
