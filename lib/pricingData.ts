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
    priceRangeINR: "₹12,000 to ₹18,000",
    priceUSD: 150,
    priceRangeUSD: "$150 to $220",
    deliveryTime: "5 to 7 days",
    features: [
      "One-page website",
      "Works on phone, tablet, and computer",
      "Smooth, modern animations",
      "Contact + WhatsApp button",
      "Basic setup to show up on Google",
      "1 round of changes",
    ],
  },
  {
    id: "business",
    name: "Business",
    badge: "Most popular",
    popular: true,
    tagline: "Full business website",
    priceINR: 30000,
    priceRangeINR: "₹30,000 to ₹50,000",
    priceUSD: 375,
    priceRangeUSD: "$375 to $625",
    deliveryTime: "2 to 3 weeks",
    features: [
      "Up to 8 pages",
      "Custom design with smooth animations",
      "Add and edit your own blog posts",
      "Accept payments online",
      "A basic AI chat assistant",
      "Set up to show up on Google",
      "3 rounds of changes",
    ],
  },
  {
    id: "automate",
    name: "Automate",
    tagline: "Website + AI system",
    priceINR: 65000,
    priceRangeINR: "₹65,000 to ₹1,20,000",
    priceUSD: 800,
    priceRangeUSD: "$800 to $1,500",
    deliveryTime: "4 to 6 weeks",
    features: [
      "Everything in Business",
      "AI chat assistant trained on your own information",
      "Automatically collects and saves customer details",
      "Automatic replies over WhatsApp and email",
      "A dashboard to manage everything in one place",
      "Connects with the other tools you already use",
      "Unlimited rounds of changes",
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
    description: "One more page, designed and built",
  },
  {
    id: "logo-design",
    name: "Logo design",
    priceINR: 5000,
    priceUSD: 65,
    priceDisplayINR: "₹5,000",
    priceDisplayUSD: "$65",
    description: "A custom logo made just for your business",
  },
  {
    id: "ai-chatbot-only",
    name: "AI chatbot only",
    priceINR: 15000,
    priceUSD: 190,
    priceDisplayINR: "₹15,000",
    priceDisplayUSD: "$190",
    description: "An AI chat assistant trained on your own information",
  },
  {
    id: "monthly-maintenance",
    name: "Monthly maintenance",
    priceINR: 3500,
    priceUSD: 45,
    priceDisplayINR: "₹3,500 / mo",
    priceDisplayUSD: "$45 / mo",
    description: "We watch site speed, back it up, and make small edits",
  },
  {
    id: "seo-monthly",
    name: "Monthly Google ranking help",
    priceINR: 5000,
    priceUSD: 65,
    priceDisplayINR: "₹5,000 / mo",
    priceDisplayUSD: "$65 / mo",
    description: "We work on getting you found higher in Google searches",
  },
  {
    id: "content-writing",
    name: "Page writing (per page)",
    priceINR: 1500,
    priceUSD: 20,
    priceDisplayINR: "₹1,500",
    priceDisplayUSD: "$20",
    description: "We write the words for your page, clearly and well",
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
