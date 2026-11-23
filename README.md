# MOODMATCH — Your Mood. Your Diary. Your Story.
### Premium Interactive Diary Discovery Experience for [CUMID Store](https://cumid.store/)

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.18.2-FF0055?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📌 Project Information

- **Project:** CUMID MoodMatch
- **Category:** Interactive Frontend / E-commerce Micro-Experience
- **Purpose:** Mood-based diary discovery
- **Stack:** React, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, Canvas Confetti, LocalStorage
- **Target Platform:** Web (Desktop, Tablet, Mobile Responsive)
- **Official Brand:** [CUMID Pocket Diaries (cumid.store)](https://cumid.store/)

---

## 📖 Executive Summary & Brand Alignment

**MOODMATCH** is a production-grade, editorial-style interactive e-commerce micro-experience designed specifically for **CUMID Store** ([cumid.store](https://cumid.store/)), a brand renowned for its square pocket diaries with top spiral binding and authentic personality.

Rather than presenting customers with a static grid or an impersonal filter bar, **MoodMatch** guides users through an intuitive discovery ritual. By pairing emotional vibes, aesthetic preferences, journaling habits, and personal mindsets, MoodMatch uses a **deterministic weighted recommendation engine** in TypeScript to match each individual with their quintessential diary cover.

Every single product featured in this experience represents **actual CUMID products**, verified catalogue prices (₹149 preorder + ₹50 shipping across India), authentic cover artwork, SKU codes, and exact taglines extracted directly from `cumid.store`.

---

## 🎨 Design Direction & Aesthetics

Inspired by luxury Japanese stationery brands, minimalist lifestyle editorial layouts, and high-end interactive discovery experiences, MoodMatch avoids generic AI templates and purple-blue gradients.

- **Background Palette:** Warm ivory (`#faf8f5`), soft linen cream (`#f7f4ef`), and warm sand borders (`#eee9e0`).
- **Typography Hierarchy:**
  - *Headings:* `Newsreader` (Editorial Serif with italics) for elegance, warmth, and literary prestige.
  - *Body / UI:* `Plus Jakarta Sans` for crisp legibility, modern proportions, and clean UI navigation.
- **Accents:** Soft pastel lavender (`#d7cee5`), botanical sage (`#929c8a`), earthy terracotta (`#c86d51`), and signature plum (`#6b5b84`).
- **Card Proportions:** Gentle `2xl` and `3xl` rounded radii, tactile top-spiral binding indicators, and soft multi-layered shadows mimicking physical paper stock.

---

## 🌟 Key Features & User Journey

### 1. Landing & Hero Showcase
- Clean, uncluttered header with CUMID wordmark and active MoodMatch pill.
- Main headline: *"Your next favourite diary is written in your mood."*
- Interactive stacked preview of authentic CUMID covers (*Lavender Bloom*, *Kal Se Productive*, *Low Battery*) with hover elevation and quick-save buttons.
- Direct dual CTAs (*"Find My Diary"* and *"Explore All 13 Diaries"*) and verified trust indicators (₹149 Preorder, Square Pocket, Top Spiral Binding).

### 2. Immersive Mood Selection (5 Distinct Vibes)
Users select their foundational emotional state from five thoughtfully calibrated archetypes:
1. **Calm & Minimal** (*Sage & Slate*) — For quiet clarity, soothing rituals, and uncluttered thoughts.
2. **Creative & Artistic** (*Terracotta & Ochre*) — For wild brainstorms, raw doodles, and spontaneous sparks.
3. **Ambitious & Productive** (*Cobalt & Emerald*) — For bold targets, relentless checklists, and milestones.
4. **Cute & Playful** (*Peach & Lilac*) — For witty observations, cozy chuckles, and daily whimsy.
5. **Deep & Reflective** (*Plum & Midnight*) — For late-night musings, overthinking with purpose, and soul searching.

### 3. Multi-Step Interactive Quiz
A four-step quiz featuring smooth Framer Motion slide transitions:
- **Q1: Intended Usage** — *Daily planning, Journaling my thoughts, Creative ideas & doodles, Everything in one place.*
- **Q2: Preferred Aesthetic** — *Soft & floral, Bold & expressive, Cute & colourful, Clean & minimal.*
- **Q3: Personality Mindset** — *Dreamer, Overthinker, Go-getter, Creative soul.*
- **Q4: Ideal Diary Experience** — *Peaceful space, Plan big goals, Express myself, Cute companion.*

*Capabilities:* Progress bar (Step X of 4 with percentage), step jumping, backward/forward navigation, full validation, and active selection states.

### 4. Deterministic Recommendation Engine
Located in `src/utils/matchingAlgorithm.ts`, the matching logic is completely decoupled from the UI:
$$\text{Score} = w_{\text{mood}} (35\%) + w_{\text{aesthetic}} (25\%) + w_{\text{personality}} (20\%) + w_{\text{usage}} (10\%) + w_{\text{experience}} (10\%) + \text{tieBreaker}$$
- **100% Deterministic:** Same answers produce the exact same soul match every time.
- **Top Soul Match:** Returns match percentage (88%–99%), custom editorial rationale, and trait breakdown.
- **Alternative Matches:** Recommends the 2 runner-up diaries for discovery.

### 5. Animated Result Reveal & Confetti
- Pulsing multi-stage loading animation (*"Analyzing your creative vibe...", "Calibrating against 13 verified CUMID covers..."*).
- Celebratory confetti burst powered by `canvas-confetti`.
- Animated compatibility counter incrementing to final percentage.
- High-resolution cover artwork with top-spiral graphic and price tag.
- Direct shopping CTA linking to the official preorder page on `cumid.store`.
- Web Share API integration with automatic fallback to clipboard copy and toast notification.

### 6. Full Catalogue & Quick-View Modal
- Complete collection of all **13 verified CUMID diaries** (*Lavender Bloom, Kal Se Productive, Low Battery, Complicated Thoughts, Grounded Temporarily, Plans in Overdrive, Soft Looks Strong Opinions, Afterburner, Desi by Default, Built for Grit, Boo. Whatever., Too Many Tabs, Hero in Progress*).
- Live real-time search, category filtering (All, Floral, Cute, Hinglish, Cars & Jets, Originals), and sorting.
- Quick View modal displaying dimensions, format specifications, WhatsApp preorder instructions, and verified ₹149 pricing.

### 7. Wishlist & LocalStorage Persistence
- Persistent favorites stored under `cumid_moodmatch_favorites_v1`.
- Slide-out Saved Diaries drawer with direct checkout links and count badges.
- Toast feedback notifications for every micro-interaction.

---

## 📁 Scalable Architecture & Folder Structure

```
cumid-moodmatch/
├── index.html                   # HTML5 entry with Newsreader & Plus Jakarta Sans fonts
├── package.json                 # Dependencies & build scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Custom CUMID color palette & typography tokens
├── tsconfig.json                # Strict TypeScript configuration
├── tsconfig.node.json           # Node configuration for Vite
├── vercel.json                  # Deployment configuration for Vercel SPA routing
├── vite.config.ts               # Vite bundler configuration
├── public/
│   ├── images/
│   │   ├── brand/               # Official CUMID logos & brand illustrations
│   │   └── products/            # 13 verified CUMID cover images (WebP format)
│   └── screenshots/             # Application preview evidence
└── src/
    ├── main.tsx                 # React application mounting
    ├── App.tsx                  # Master application orchestrator
    ├── index.css                # Tailwind directives & typography layers
    ├── types/
    │   └── index.ts             # Domain models (Products, Quiz, Matches, Toasts)
    ├── data/
    │   ├── products.ts          # 13 verified CUMID products with personality matrices
    │   └── quizQuestions.ts     # 5 mood archetypes & 4 multi-step questions
    ├── hooks/
    │   └── useFavorites.ts      # LocalStorage persistence hook for wishlist
    ├── utils/
    │   └── matchingAlgorithm.ts # Deterministic weighted scoring algorithm
    └── components/
        ├── Navbar.tsx           # Responsive navigation with favorites drawer toggle
        ├── Hero.tsx             # Editorial landing section & product showcases
        ├── MoodSelector.tsx     # 5-card interactive mood selection
        ├── MatchReveal.tsx      # Animated reveal, confetti & personalized recommendations
        ├── ProductCard.tsx      # Individual diary card with cover, price & actions
        ├── ProductGrid.tsx      # 13-product grid with search, filter & sorting
        ├── QuickViewModal.tsx   # Detailed product specification modal
        ├── FavoritesDrawer.tsx  # Slide-out saved diaries drawer
        ├── HowItWorks.tsx       # 4-step process explanation
        ├── Toast.tsx            # Animated notification container
        ├── Footer.tsx           # Brand story, preorder terms & internship attribution
        └── Quiz/
            ├── QuizContainer.tsx   # Multi-step questionnaire coordinator
            └── QuizProgressBar.tsx # Animated step progress bar
```

---

## ⚙️ Installation & Local Development

### Prerequisites
- **Node.js**: v18.0.0 or higher (Tested on v22.19.0)
- **npm**: v9.0.0 or higher (Tested on v10.9.3)

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/cumid-moodmatch.git
   cd cumid-moodmatch
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5200/](http://localhost:5200/) in your browser.

4. **Run TypeScript verification and build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

---

## 🚀 Deployment Guide (Vercel Ready)

This repository includes a preconfigured `vercel.json` file for immediate, zero-configuration deployment to [Vercel](https://vercel.com/):

### Option A: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B: Deploy via GitHub / Vercel Dashboard
1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com/) and click **"Add New Project"**.
3. Import your repository.
4. Framework Preset will automatically detect **Vite**.
5. Click **"Deploy"**.

---

## 🧪 Verification & Testing Highlights

- **TypeScript Strict Mode:** Fully typed with zero `any` leaks and no compilation errors.
- **End-to-End User Journeys Tested:**
  - *Calm & Minimal* + *Journaling* + *Floral* + *Dreamer* $\rightarrow$ **Lavender Bloom (98% match)**
  - *Ambitious & Productive* + *Planning* + *Expressive* + *Go-getter* $\rightarrow$ **Kal Se Productive (99% match)**
  - *Cute & Playful* + *Journaling* + *Cute* + *Overthinker* $\rightarrow$ **Low Battery (99% match)**
- **Responsiveness:** Verified across Desktop (1440px), Laptop (1024px), Tablet (768px), and Mobile (375px).
- **Accessibility:** Semantic HTML5, full keyboard navigation (`Tab`, `Enter`, `Space`, `Escape`), visible focus rings, and high contrast ratios.

---

## 📄 License & Attribution

This project was built for the **CUMID Web Development Internship Selection Assignment**.  
Designed and engineered with care for stationery enthusiasts and the CUMID community.

Product details, cover artwork concepts, and brand trademarks are property of [CUMID Store](https://cumid.store/).
