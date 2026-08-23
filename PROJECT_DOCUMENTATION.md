# 📘 Full Technical Documentation: vishal.buildss Platform

Welcome to the official technical documentation for **vishal.buildss** — a high-performance web development and AI systems platform built with Next.js 16 (Turbopack), React 19, TypeScript, Tailwind CSS v4, Framer Motion 12, MongoDB Atlas, and Razorpay Payment Gateway.

---

## 📑 Table of Contents

1. [Executive Summary & Brand Identity](#1-executive-summary--brand-identity)
2. [Tech Stack & System Architecture](#2-tech-stack--system-architecture)
3. [Page Structure & Routing Diagram](#3-page-structure--routing-diagram)
4. [Core Components & Interactive Features](#4-core-components--interactive-features)
5. [Database Models & API Endpoints](#5-database-models--api-endpoints)
6. [Razorpay Payment Gateway Integration](#6-razorpay-payment-gateway-integration)
7. [Pricing Tiers, Add-Ons & Ground Rules](#7-pricing-tiers-add-ons--ground-rules)
8. [Environment Variables Setup](#8-environment-variables-setup)
9. [Deployment & Network Mobile Testing Guide](#9-deployment--network-mobile-testing-guide)

---

## 1. Executive Summary & Brand Identity

**vishal.buildss** is a modern engineering agency platform specializing in:
- **High-Speed Next.js 16 Websites** (5–7 days delivery)
- **Full-Stack Business Web Portals** (2–3 weeks delivery)
- **Custom AI Workflows & RAG Chatbots** (4–6 weeks delivery)

### 🎨 Brand Aesthetics & UX Principles
- **Color Palette**: Swiss Architectural Off-White Canvas (`#fafaf8`), Obsidian Dark Sections (`#0f172a`), Champagne & Electric Amber Accents (`#facc15` / `#f59e0b`).
- **Typography**: Display Sans for headlines (`font-black tracking-tight`), Geist/Inter for copy, JetBrains Mono for code badges (`font-mono`).
- **Micro-Interactions**: Framer Motion 12 spring-physics, 3D tilt hover containers, glowing border beams, and real-time execution terminals.

---

## 2. Tech Stack & System Architecture

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16.1.1 (Turbopack Engine) |
| **UI Library** | React 19.2.3 + Framer Motion 12.23.26 |
| **Styling** | Tailwind CSS v4 + Lucide React Vector Icons |
| **Database** | MongoDB Atlas (Mongoose 9.0.2) |
| **Payment Gateway** | Razorpay SDK (HMAC SHA256 Webhook Verification) |
| **Language** | TypeScript 5 (Strict Mode) |
| **Authentication** | Custom JWT + Bcrypt Password Hashing |

---

## 3. Page Structure & Routing Diagram

```
app/
├── admin/
│   ├── consultations/        # Lead management table
│   ├── dashboard/            # Admin analytics metrics
│   └── login/                # Password protected admin portal
├── api/
│   ├── admin/login/          # Admin authentication endpoint
│   ├── consultation/         # Consultation booking submission & retrieval
│   └── razorpay/
│       ├── create-order/     # Order creation (50% advance deposit)
│       └── verify-payment/   # HMAC SHA256 signature verification
├── dashboard/                # Client user dashboard
├── login/                    # Client login page
├── projects/                 # Dedicated portfolio gallery
├── register/                 # Client registration page
├── layout.tsx                # Global layout wrapper & fonts
└── page.tsx                  # Awwwards-style Homepage
```

---

## 4. Core Components & Interactive Features

### 4.1 Awwwards-Style Hero Section (`app/page.tsx`)
- **Translucent Background Watermark**: Continuous floating `VISION ENGINE` typography.
- **Hero Headline**: Formatted in exact 3-line sequence:
  ```
  We Build Custom
  Websites & AI Systems
  That Automate Your Business.
  ```
- **3D Model Frame**: 3D female model character building websites surrounded by glowing holographic UI windows, code IDE panels, and floating speed score badges.
- **Live Status Radar Beacon**: Pulsing indicator badge for Next.js 16 & AI Engine status.

### 4.2 Production Code Terminal (`components/InteractiveTerminal.tsx`)
- Previews live TypeScript Server Actions, Python FastAPI RAG AI pipelines, and Razorpay webhook code.
- Includes an interactive **"Test Run"** button triggering console telemetry logs, and a 1-click **"Copy Code"** button.

### 4.3 Interactive Custom Quote Estimator (`components/PricingEstimator.tsx`)
- 2-part grid layout combining interactive mathematical sliders (page count, scope selector, add-on checkboxes) with a clean borderless video player (`/video1.mp4`).

### 4.4 Agency Comparison Matrix (`components/ComparisonMatrix.tsx`)
- Side-by-side comparison table contrasting **vishal.buildss** against solo freelancers and legacy agencies.

### 4.5 Engineering Standards (`components/TestimonialsSection.tsx`)
- Highlights 4 verified pre-launch commitments: 7-21 Days Turnaround, 100% Code IP Ownership, Fixed Math Pricing, and 30 Days Free Warranty.

---

## 5. Database Models & API Endpoints

### Consultation Model (`models/Consultation.ts`)
```ts
import mongoose from "mongoose";

const ConsultationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  business: { type: String },
  contact: { type: String, required: true },
  message: { type: String },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Consultation || mongoose.model("Consultation", ConsultationSchema);
```

---

## 6. Razorpay Payment Gateway Integration

The payment flow handles **50% Advance Deposits** for project reservations:

1. **Client Action**: Client selects a package or quote and clicks **"Pay 50% Advance"**.
2. **Order Creation (`/api/razorpay/create-order`)**:
   - Backend instantiates Razorpay SDK with `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.
   - Computes 50% deposit amount in subunits (paise/cents).
3. **Modal Checkout**: Loads official Razorpay Checkout SDK (`https://checkout.razorpay.com/v1/checkout.js`).
4. **Signature Verification (`/api/razorpay/verify-payment`)**:
   - Validates `razorpay_order_id + "|" + razorpay_payment_id` using HMAC SHA256 against `RAZORPAY_KEY_SECRET`.

---

## 7. Pricing Tiers, Add-Ons & Ground Rules

### 💰 Web & AI Packages
1. **Launch (₹12,000 – ₹18,000 / $150)**: 5–7 days • 1-page landing site, mobile responsive, smooth animations, contact + WhatsApp button, basic SEO, 1 revision.
2. **Business — Most Popular (₹30,000 – ₹50,000 / $375)**: 2–3 weeks • Up to 8 pages, custom design + GSAP, CMS / blog, payment gateway, basic AI chatbot, SEO optimized, 3 revisions.
3. **Automate (₹65,000 – ₹1,20,000 / $800)**: 4–6 weeks • Everything in Business, custom AI chatbot (trained on your data), lead capture automation, WhatsApp/email automation, admin dashboard, API integrations, unlimited revisions.

### 🔌 Add-Ons
- **Extra page:** ₹2,000 ($25)
- **Logo design:** ₹5,000 ($65)
- **AI chatbot only:** ₹15,000 ($190)
- **Monthly maintenance:** ₹3,500 / mo ($45 / mo)
- **SEO monthly:** ₹5,000 / mo ($65 / mo)
- **Content writing (per page):** ₹1,500 ($20)

### 📋 Ground Rules
- **50% advance, 50% on delivery**
- **Timeline starts after content received**
- **Scope changes = revised quote**
- **Source code handed over on full payment**
- **Domain + hosting cost extra**
- **Support for 30 days post-delivery (free)**

---

## 8. Environment Variables Setup

Create or update `.env.local` in the project root directory:

```env
MONGODB_URI=mongodb+srv://<REDACTED>@cluster0.bsi7jvp.mongodb.net/paperbag?retryWrites=true&w=majority&appName=Cluster0
ADMIN_PASSWORD=admin123
RAZORPAY_KEY_ID=rzp_test_SpzzGC6RqbwBgQ
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_SpzzGC6RqbwBgQ
RAZORPAY_KEY_SECRET=THfx4EJbTAw0q7EniSyER3Rw
```

---

## 9. Deployment & Network Mobile Testing Guide

### Running Development Server
```bash
npx next dev -H 0.0.0.0 -p 3001
```

### Production Build Verification
```bash
npm run build
```
*(Production build compiles 19 static & API routes in ~15s with 0 errors).*

### Local Network Access (Mobile Testing)
- **Localhost PC**: `http://localhost:3001`
- **Wi-Fi Mobile Testing**: `http://192.168.1.3:3001`
