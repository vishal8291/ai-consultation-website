"use client";
import React from "react";
import { motion } from "framer-motion";

export function HeroNeuralNetworkSVG() {
  return (
    <div className="relative w-full max-w-lg aspect-square flex items-center justify-center p-4">
      {/* Background glowing ambient light */}
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/30 via-amber-200/20 to-transparent blur-3xl rounded-full" />
      
      <svg
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-[0_10px_30px_rgba(234,179,8,0.25)]"
      >
        {/* Outer Orbit Rings */}
        <motion.circle
          cx="300"
          cy="300"
          r="240"
          stroke="rgba(234, 179, 8, 0.4)"
          strokeWidth="1.5"
          strokeDasharray="10 15"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx="300"
          cy="300"
          r="180"
          stroke="rgba(15, 23, 42, 0.15)"
          strokeWidth="2"
          strokeDasharray="8 12"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Central Core Sphere */}
        <defs>
          <radialGradient id="goldCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4d4d4" />
            <stop offset="60%" stopColor="#0a0a0a" />
            <stop offset="100%" stopColor="#404040" />
          </radialGradient>
          <linearGradient id="yellowLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#404040" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* Connecting Lines */}
        <path d="M 300 300 L 150 150 M 300 300 L 450 150 M 300 300 L 450 450 M 300 300 L 150 450 M 300 300 L 300 100 M 300 300 L 300 500" stroke="url(#yellowLine)" strokeWidth="2" opacity="0.4" />

        {/* Outer Floating Nodes */}
        <motion.g animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          <circle cx="150" cy="150" r="16" fill="#0a0a0a" stroke="#404040" strokeWidth="2" />
          <circle cx="150" cy="150" r="24" stroke="#0f172a" strokeWidth="1.5" fill="none" opacity="0.3" />
        </motion.g>

        <motion.g animate={{ y: [0, 10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
          <circle cx="450" cy="150" r="16" fill="#0f172a" />
          <circle cx="450" cy="150" r="24" stroke="#404040" strokeWidth="2" fill="none" opacity="0.6" />
        </motion.g>

        <motion.g animate={{ y: [0, -8, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}>
          <circle cx="450" cy="450" r="16" fill="#0a0a0a" stroke="#404040" strokeWidth="2" />
          <circle cx="450" cy="450" r="24" stroke="#0f172a" strokeWidth="1.5" fill="none" opacity="0.3" />
        </motion.g>

        <motion.g animate={{ y: [0, 12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
          <circle cx="150" cy="450" r="16" fill="#0f172a" />
          <circle cx="150" cy="450" r="24" stroke="#404040" strokeWidth="2" fill="none" opacity="0.6" />
        </motion.g>

        {/* Glowing Center Core */}
        <motion.circle
          cx="300"
          cy="300"
          r="48"
          fill="url(#goldCore)"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="300" cy="300" r="64" stroke="#0f172a" strokeWidth="2" fill="none" opacity="0.4" />
      </svg>
    </div>
  );
}

{/* REAL HIGH-FIDELITY PROJECT SVG ICONS */}
export function ProjectIconSVG({ type }: { type: string }) {
  // 1. LexAgent Legal AI
  if (type === "legal-ai") {
    return (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect width="64" height="64" rx="16" fill="#0f172a" />
        {/* Shield */}
        <path d="M 32 12 L 48 18 V 34 C 48 44, 32 52, 32 52 C 32 52, 16 44, 16 34 V 18 L 32 12 Z" stroke="#0a0a0a" strokeWidth="2.5" fill="none" />
        {/* Scale of Justice */}
        <path d="M 32 20 V 38 M 24 26 L 40 26 M 22 34 L 26 34 M 38 34 L 42 34" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // 2. Freelance AI Sales Agent
  if (type === "sales-ai") {
    return (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect width="64" height="64" rx="16" fill="#0a0a0a" />
        {/* Target Radar */}
        <circle cx="32" cy="32" r="18" stroke="#000000" strokeWidth="2.5" fill="none" />
        <circle cx="32" cy="32" r="10" stroke="#000000" strokeWidth="2" fill="none" strokeDasharray="3 3" />
        <circle cx="32" cy="32" r="4" fill="#000000" />
        {/* Crosshair */}
        <path d="M 32 8 V 14 M 32 50 V 56 M 8 32 H 14 M 50 32 H 56" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 3. Paperbag Eco E-Commerce & Leaf AI
  if (type === "ecommerce-ai") {
    return (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect width="64" height="64" rx="16" fill="#16a34a" />
        {/* Shopping Bag */}
        <rect x="18" y="24" width="28" height="28" rx="6" fill="#ffffff" stroke="#ffffff" strokeWidth="2" />
        <path d="M 26 24 C 26 17, 38 17, 38 24" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Eco Leaf */}
        <path d="M 32 32 C 26 32, 24 40, 32 46 C 40 40, 38 32, 32 32 Z" fill="#0a0a0a" />
      </svg>
    );
  }

  // 4. HealthMap AI (ShaktiCycle)
  if (type === "health-ai") {
    return (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect width="64" height="64" rx="16" fill="#ec4899" />
        {/* Heart Rate Pulse */}
        <path d="M 14 32 H 24 L 28 22 L 34 42 L 40 26 L 44 34 L 50 32" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="32" cy="18" r="4" fill="#0a0a0a" />
      </svg>
    );
  }

  // 5. PDFSolution SaaS
  if (type === "pdf-saas") {
    return (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect width="64" height="64" rx="16" fill="#dc2626" />
        {/* Document Stack */}
        <rect x="20" y="16" width="24" height="32" rx="4" fill="#ffffff" />
        <rect x="16" y="20" width="24" height="32" rx="4" fill="#d4d4d4" stroke="#000000" strokeWidth="1.5" />
        {/* OCR Laser */}
        <line x1="12" y1="36" x2="44" y2="36" stroke="#ffffff" strokeWidth="2.5" />
      </svg>
    );
  }

  // 6. AI Consultation Platform
  if (type === "consultation-ai") {
    return (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect width="64" height="64" rx="16" fill="#262626" />
        {/* Neural Brain Node Network */}
        <circle cx="20" cy="20" r="5" fill="#ffffff" />
        <circle cx="44" cy="20" r="5" fill="#ffffff" />
        <circle cx="32" cy="44" r="7" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
        <path d="M 20 20 L 32 44 M 44 20 L 32 44 M 20 20 H 44" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" />
      </svg>
    );
  }

  // 7. Developer Portfolio
  if (type === "portfolio") {
    return (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect width="64" height="64" rx="16" fill="#0284c7" />
        {/* IDE Code Brackets */}
        <path d="M 22 24 L 14 32 L 22 40 M 42 24 L 50 32 L 42 40 M 36 20 L 28 44" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // 8. EdTech Entrance Exam
  if (type === "edtech-ai") {
    return (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect width="64" height="64" rx="16" fill="#4f46e5" />
        {/* Graduation Cap */}
        <path d="M 32 16 L 52 26 L 32 36 L 12 26 Z" stroke="#ffffff" strokeWidth="2.5" fill="#0a0a0a" strokeLinejoin="round" />
        <path d="M 20 31 V 42 C 20 42, 32 48, 44 42 V 31" stroke="#ffffff" strokeWidth="2" fill="none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="64" height="64" rx="16" fill="#0a0a0a" />
      <circle cx="32" cy="32" r="12" fill="#000000" />
    </svg>
  );
}

{/* FULL HIGH-FIDELITY PROJECT GRAPHIC ILLUSTRATIONS */}
export function ProjectGraphicSVG({ type }: { type: string }) {
  // 1. LexAgent Legal AI
  if (type === "legal-ai") {
    return (
      <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="300" height="200" rx="16" fill="#f8fafc" />
        {/* Document Background */}
        <rect x="50" y="25" width="200" height="150" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
        
        {/* Legal Header Bar */}
        <rect x="70" y="45" width="90" height="10" rx="4" fill="#0f172a" />
        <rect x="70" y="63" width="160" height="6" rx="3" fill="#262626" />
        <rect x="70" y="77" width="140" height="6" rx="3" fill="#cbd5e1" />
        <rect x="70" y="91" width="150" height="6" rx="3" fill="#cbd5e1" />
        
        {/* Compliance Risk Alert Pill */}
        <rect x="70" y="112" width="160" height="28" rx="8" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" />
        <circle cx="86" cy="126" r="6" fill="#ef4444" />
        <text x="100" y="130" fill="#991b1b" fontSize="10" fontWeight="bold" fontFamily="system-ui">Compliance Risk Audit</text>

        {/* Real Icon Badge Overlaid */}
        <g transform="translate(195, 30)">
          <ProjectIconSVG type="legal-ai" />
        </g>
      </svg>
    );
  }

  // 2. Freelance AI Sales Agent
  if (type === "sales-ai") {
    return (
      <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="300" height="200" rx="16" fill="#f8fafc" />
        
        {/* Radar & Lead Funnel Line */}
        <circle cx="150" cy="100" r="65" stroke="rgba(202, 138, 4, 0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="150" cy="100" r="45" stroke="rgba(15, 23, 42, 0.15)" strokeWidth="1.5" />
        
        {/* Prospect Nodes */}
        <circle cx="150" cy="100" r="12" fill="#0a0a0a" stroke="#262626" strokeWidth="2" />
        <circle cx="110" cy="70" r="8" fill="#0f172a" />
        <circle cx="190" cy="70" r="8" fill="#0f172a" />
        <circle cx="110" cy="130" r="8" fill="#0f172a" />
        <circle cx="190" cy="130" r="8" fill="#0f172a" />

        <path d="M 110 70 L 150 100 M 190 70 L 150 100 M 110 130 L 150 100 M 190 130 L 150 100" stroke="#262626" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Lead CRM Status Badge */}
        <rect x="75" y="150" width="150" height="26" rx="8" fill="#ffffff" stroke="#404040" strokeWidth="1.5" />
        <text x="150" y="167" fill="#854d0e" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">⚡ Qdrant RAG + Gmail API</text>

        {/* Real Icon Badge Overlaid */}
        <g transform="translate(225, 20)">
          <ProjectIconSVG type="sales-ai" />
        </g>
      </svg>
    );
  }

  // 3. Paperbag Eco E-Commerce & Leaf AI
  if (type === "ecommerce-ai") {
    return (
      <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="300" height="200" rx="16" fill="#f8fafc" />

        {/* E-Commerce Shopping Bag */}
        <rect x="90" y="65" width="120" height="95" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
        <path d="M 125 65 C 125 45, 175 45, 175 65" stroke="#262626" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Green Eco Leaf Icon */}
        <path d="M 150 90 C 130 90, 125 115, 150 135 C 175 115, 170 90, 150 90 Z" fill="#22c55e" />
        <path d="M 150 95 L 150 130" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

        {/* Leaf AI Chat Bubble */}
        <g transform="translate(165, 30)">
          <rect width="90" height="32" rx="10" fill="#0a0a0a" stroke="#262626" strokeWidth="1" />
          <text x="45" y="20" fill="#000000" fontSize="9" fontWeight="extrabold" textAnchor="middle" fontFamily="system-ui">🤖 Leaf AI Bot</text>
        </g>

        {/* Real Icon Badge Overlaid */}
        <g transform="translate(25, 25)">
          <ProjectIconSVG type="ecommerce-ai" />
        </g>
      </svg>
    );
  }

  // 4. HealthMap AI (ShaktiCycle)
  if (type === "health-ai") {
    return (
      <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="300" height="200" rx="16" fill="#f8fafc" />

        {/* Cycle Pulse Ring */}
        <circle cx="150" cy="95" r="50" stroke="#0a0a0a" strokeWidth="4" fill="#ffffff" />
        <circle cx="150" cy="95" r="50" stroke="#ec4899" strokeWidth="4" strokeDasharray="70 200" fill="none" />

        {/* Heart Rate Wave Inside */}
        <path d="M 120 95 L 135 95 L 140 80 L 148 110 L 155 88 L 160 100 L 180 95" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Mobile Health Tracker Badge */}
        <rect x="75" y="155" width="150" height="24" rx="8" fill="#0f172a" />
        <text x="150" y="171" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">React Native • Cycle AI</text>

        {/* Real Icon Badge Overlaid */}
        <g transform="translate(225, 20)">
          <ProjectIconSVG type="health-ai" />
        </g>
      </svg>
    );
  }

  // 5. PDFSolution SaaS Platform
  if (type === "pdf-saas") {
    return (
      <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="300" height="200" rx="16" fill="#f8fafc" />

        {/* Stacked PDF Cards */}
        <rect x="90" y="45" width="110" height="120" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
        <rect x="105" y="35" width="110" height="120" rx="10" fill="#ffffff" stroke="#262626" strokeWidth="1.5" />

        {/* PDF Red Badge */}
        <rect x="120" y="55" width="35" height="18" rx="4" fill="#ef4444" />
        <text x="137" y="68" fill="#ffffff" fontSize="9" fontWeight="extrabold" textAnchor="middle" fontFamily="system-ui">PDF</text>

        {/* OCR Scanning Laser Line */}
        <line x1="115" y1="95" x2="205" y2="95" stroke="#0a0a0a" strokeWidth="3" />
        <rect x="120" y="110" width="70" height="6" rx="3" fill="#0f172a" />
        <rect x="120" y="122" width="50" height="6" rx="3" fill="#cbd5e1" />

        {/* Real Icon Badge Overlaid */}
        <g transform="translate(225, 20)">
          <ProjectIconSVG type="pdf-saas" />
        </g>
      </svg>
    );
  }

  // 6. AI Consultation Platform
  if (type === "consultation-ai") {
    return (
      <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="300" height="200" rx="16" fill="#f8fafc" />

        {/* Consultation Ticket / Workflow */}
        <rect x="60" y="40" width="180" height="120" rx="12" fill="#ffffff" stroke="#262626" strokeWidth="1.5" />
        
        {/* Node Flowchart */}
        <circle cx="100" cy="100" r="16" fill="#0f172a" />
        <circle cx="150" cy="75" r="16" fill="#0a0a0a" stroke="#262626" strokeWidth="1.5" />
        <circle cx="200" cy="100" r="16" fill="#0f172a" />

        <path d="M 116 100 L 134 75 M 166 75 L 184 100" stroke="#262626" strokeWidth="2" strokeDasharray="3 3" />

        {/* Paid Razorpay Badge */}
        <rect x="90" y="130" width="120" height="20" rx="6" fill="#000000" />
        <text x="150" y="144" fill="#0a0a0a" fontSize="9" fontWeight="extrabold" textAnchor="middle" fontFamily="system-ui">Razorpay Paid Booking</text>

        {/* Real Icon Badge Overlaid */}
        <g transform="translate(25, 25)">
          <ProjectIconSVG type="consultation-ai" />
        </g>
      </svg>
    );
  }

  // 7. Vishal's Developer Portfolio
  if (type === "portfolio") {
    return (
      <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="300" height="200" rx="16" fill="#f8fafc" />

        {/* IDE Code Window */}
        <rect x="50" y="30" width="200" height="140" rx="10" fill="#0f172a" stroke="#262626" strokeWidth="1" />
        
        {/* Dots */}
        <circle cx="70" cy="46" r="4" fill="#ef4444" />
        <circle cx="82" cy="46" r="4" fill="#f59e0b" />
        <circle cx="94" cy="46" r="4" fill="#22c55e" />

        {/* Code Snippet Lines */}
        <text x="70" y="75" fill="#e5e5e5" fontSize="11" fontWeight="bold" fontFamily="monospace">&lt;DeveloperPortfolio /&gt;</text>
        <text x="70" y="95" fill="#38bdf8" fontSize="10" fontFamily="monospace">const developer = "Vishal";</text>
        <text x="70" y="115" fill="#4ade80" fontSize="10" fontFamily="monospace">status: "Available for Clients";</text>
        <text x="70" y="135" fill="#cbd5e1" fontSize="10" fontFamily="monospace">stack: ["Next.js", "Python", "AI"];</text>

        {/* Real Icon Badge Overlaid */}
        <g transform="translate(225, 20)">
          <ProjectIconSVG type="portfolio" />
        </g>
      </svg>
    );
  }

  // 8. EdTech Examination & Course Recommendation
  if (type === "edtech-ai") {
    return (
      <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="300" height="200" rx="16" fill="#f8fafc" />

        {/* Exam Paper Background */}
        <rect x="80" y="30" width="140" height="140" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />

        {/* Grade Stamp */}
        <circle cx="180" cy="65" r="20" fill="#d4d4d4" stroke="#262626" strokeWidth="2" />
        <text x="180" y="71" fill="#854d0e" fontSize="11" fontWeight="black" textAnchor="middle" fontFamily="system-ui">MERN</text>

        {/* Exam Score Progress Lines */}
        <rect x="95" y="55" width="55" height="8" rx="3" fill="#0f172a" />
        <rect x="95" y="75" width="110" height="6" rx="3" fill="#262626" />
        <rect x="95" y="90" width="110" height="6" rx="3" fill="#cbd5e1" />
        <rect x="95" y="105" width="90" height="6" rx="3" fill="#cbd5e1" />

        {/* Course Recommendation Pill */}
        <rect x="90" y="128" width="120" height="24" rx="6" fill="#0f172a" />
        <text x="150" y="144" fill="#ffffff" fontSize="9" fontWeight="extrabold" textAnchor="middle" fontFamily="system-ui">Course Recommended</text>

        {/* Real Icon Badge Overlaid */}
        <g transform="translate(25, 25)">
          <ProjectIconSVG type="edtech-ai" />
        </g>
      </svg>
    );
  }

  // Fallback Graphic
  return (
    <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="300" height="200" rx="16" fill="#f8fafc" />
      <rect x="20" y="20" width="260" height="160" rx="12" stroke="rgba(234, 179, 8, 0.4)" strokeWidth="1.5" fill="#ffffff" />
      <rect x="40" y="60" width="120" height="12" rx="4" fill="#404040" />
    </svg>
  );
}

export function ServiceGraphicSVG({ service }: { service: string }) {
  return (
    <div className="w-12 h-12 rounded-2xl bg-yellow-400 text-black border border-yellow-500 flex items-center justify-center shadow-sm font-black">
      <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
  );
}
