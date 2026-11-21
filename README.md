# OneAtlas — AI Model Discovery, Intelligence & Evaluation Platform

[![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Custom_Design_System-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![ESLint](https://img.shields.io/badge/ESLint-0_Warnings-green?style=flat&logo=eslint)](https://eslint.org/)

**OneAtlas** ([oneatlas.dev](https://oneatlas.dev/)) is an enterprise-grade AI model discovery, intelligence, comparison, and evaluation platform designed for AI engineers, machine learning practitioners, and technical decision-makers. Inspired by frontier infrastructure tools like **OpenRouter**, **RouterPlus**, and **LiteLLM**, OneAtlas turns complex foundation model specifications, token pricing schedules, hardware latencies, and benchmark scores into an intuitive, accessible decision-making workspace.

This repository contains the complete submission for **Role 1 — Frontend Engineering**.

---

## 🌟 Key Platform Capabilities

### 1. 🔍 Intelligent Model Catalog & Multi-Faceted Search
- **Instant Search:** Sub-millisecond keystroke searching across model names, research labs, descriptions, and capabilities.
- **Deep Filtering:** Filter by AI Research Lab (Anthropic, OpenAI, DeepSeek, Google, Meta, Mistral), Modalities (Vision, Audio, Tool Use, Reasoning), and Model Licensing (Open Weights vs. Proprietary APIs).
- **Continuous Cost Bounds:** Continuous price range slider dynamically bounding maximum blended token costs ($/M).
- **Dual View Modes:** Seamlessly toggle between visual **Card View** and high-density developer **Data Table View** with sortable metrics and sparklines.
- **URL Synchronization:** Filter state is bidirectionally synchronized with browser URL query parameters (`window.history.replaceState`), enabling deep linking and browser history navigation.

### 2. ⚡ Side-by-Side Model Comparison Matrix
- **Multi-Model Evaluator:** Compare up to 4 models concurrently across context windows, per-token pricing, architectural parameters, and academic benchmarks.
- **Automated Metric Deltas:** Real-time visual callouts for best-in-class attributes (lowest input/output price, longest context window, highest LMSYS Arena ELO).
- **Contextual Single-Model Helper:** When evaluating a single model, an intelligent recommendation banner suggests 1-click popular benchmark counterparts.
- **Multi-Model ROI & Cost Simulator:** Adjust expected prompt tokens, completion tokens, and monthly request volumes to compute exact comparative monthly operational costs.
- **Shareable Matrix State:** Generates persistent, shareable URLs containing encoded model comparisons (e.g., `/compare?models=claude-3-7-sonnet,deepseek-r1`).

### 3. 📊 Deep-Dive Model Detail Specifications
- Dynamic slug routing (`/models/[slug]`) rendering complete architectural overviews, license details, and context scale gauges up to 2 million tokens.
- Granular per-million prompt and completion token pricing cards.
- **Interactive Token Playground:** Real-time single-request cost estimator based on custom input/output sliders.
- **Inference Provider Telemetry:** Live cluster hosting table detailing Time-To-First-Token (TTFT), tokens/sec throughput, and SLA uptime across providers (Groq, Together AI, Fireworks, AWS Bedrock).
- **Code Snippets:** 1-click copyable SDK integration code for cURL, Python (`openai`), and TypeScript.

### 4. 🏆 Leaderboards & Value-for-Money Index
- Interactive benchmark leaderboards filterable by LMSYS Chatbot Arena ELO, MMLU, GSM8K, and HumanEval coding benchmarks.
- Proprietary **Value-for-Money Index** (ELO points per dollar), mathematically demonstrating why frontier cost-effective models (e.g. DeepSeek R1, Claude 3.5 Sonnet) lead developer adoption.

### 5. 🏢 AI Labs & Inference Provider Directory
- Detailed directories for foundation research laboratories and inference host providers with operational latency profiles and active model catalogs.

### 6. ⌨️ Global Command Palette (`⌘K` / `Ctrl+K`)
- Accessible from anywhere in the application via keyboard shortcut.
- Auto-focusing search with categorical tagging (Models, Research Labs, Benchmarks, Tools) and 1-click quick-search tags.

### 7. 🌓 Enterprise Two-Way Design System
- Semantic Slate & Sky design tokens supporting seamless Dark Mode (`#0B0F17`) and high-contrast Light Mode (`#F8FAFC`).
- High-contrast accessibility compliant with WCAG AAA standards.

---

## 🏗️ Architecture & Tech Stack

```
src/
├── app/
│   ├── api/                     # Local Next.js Route Handlers (OpenAPI compliant)
│   │   ├── benchmarks/route.ts  # Leaderboard rankings endpoint
│   │   ├── models/              # Model search, filtering & slug resolution
│   │   └── providers/route.ts   # Inference provider directory endpoint
│   ├── benchmarks/page.tsx      # Interactive leaderboards & metric radar
│   ├── calculator/page.tsx      # Token economics & ROI planner
│   ├── compare/page.tsx         # Side-by-side comparison matrix & cost simulator
│   ├── models/[slug]/page.tsx   # Model specification & playground
│   ├── providers/page.tsx       # AI labs & host provider directory
│   ├── ClientLayout.tsx         # Global theme provider & ⌘K keyboard listener
│   ├── globals.css              # Custom scrollbars, animations, and Tailwind base
│   ├── layout.tsx               # Root HTML, SEO metadata, next/font optimization
│   ├── not-found.tsx            # Branded 404 error boundary
│   └── page.tsx                 # Core model discovery catalog with live filters
├── components/
│   ├── CommandPalette.tsx       # Cmd+K global search modal with category tabs
│   ├── ComparisonDrawer.tsx     # Floating dock showing pinned models
│   ├── Footer.tsx               # Enterprise footer with status indicators
│   ├── Header.tsx               # Main navigation bar with theme switcher
│   ├── ModelCard.tsx            # Grid view card with specs and compare toggle
│   ├── ModelFilters.tsx         # Multi-faceted sidebar filter controls
│   └── ModelTable.tsx           # High-density data grid with sorting & sparklines
├── context/
│   ├── CompareContext.tsx       # Comparison state & LocalStorage sync
│   └── ToastContext.tsx         # Notification queue
├── data/
│   └── mockData.ts              # Normalized seed dataset (20 frontier 2025/2026 models, 8 labs, 6 hosts)
├── lib/
│   └── api.ts                   # Decoupled, typed API client
└── types/
    └── index.ts                 # Strict TypeScript schemas and interfaces
```

- **Framework:** Next.js 14.2.35 (App Router)
- **UI Engine:** React 19 (Hooks, Suspense, Error Boundaries)
- **Language:** TypeScript 5 (Strict Mode enabled, 0 compiler errors)
- **Styling:** Tailwind CSS 3.4 with custom `@tailwindcss/typography`
- **Fonts:** `next/font/google` (`Inter` & `JetBrains_Mono` — self-hosted, 0 CLS)
- **Bundle Efficiency:** **87.3 kB** total First Load JS shared by all routes

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or Node.js 20+
- npm or yarn

### Installation & Run

```bash
# 1. Clone repository
git clone https://github.com/Arnaviitp/Demo-Task---The-AI-Signal.git
cd Demo-Task---The-AI-Signal

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
# Open http://localhost:3000

# 4. Production build & verification
npm run lint    # 0 warnings or errors
npm run build   # Compiles all 11 static and dynamic routes
npm run start   # Starts optimized production server
```

---

## 📑 Comprehensive Documentation & Reports

The repository includes complete engineering documentation prepared for technical evaluation:

- [FINAL_EVALUATION_REPORT.md](./FINAL_EVALUATION_REPORT.md): Audit baseline vs. post-audit state, resolved issues, performance analysis, and production readiness scorecard.
- [FINAL_REQUIREMENT_MATRIX.md](./FINAL_REQUIREMENT_MATRIX.md): Detailed traceability matrix mapping every prompt requirement to exact code files and verification proofs.
- [INTERVIEW_PREPARATION.md](./INTERVIEW_PREPARATION.md): Minute-by-minute 5–10 minute Loom video script, architectural justifications, trade-off analysis, and top 10 technical interview Q&A.
- [BACKEND_INTEGRATION_CONTRACT.md](./BACKEND_INTEGRATION_CONTRACT.md): OpenAPI 3.1 & RFC 7807 specifications for instant handoff to backend engineering.

---

## 📐 Mathematical Token Economics Formula

The Token Economics Calculator and Comparison Matrix implement industry-standard weighted token schedules:

$$\text{Total Cost} = \left(\frac{\text{Prompt Tokens} \times \text{Volume}}{1,000,000} \times \text{Price}_{\text{input}}\right) + \left(\frac{\text{Completion Tokens} \times \text{Volume}}{1,000,000} \times \text{Price}_{\text{output}}\right)$$

Frontier models bill prompt input and completion output at distinctly different schedules (e.g. Claude 3.5 Sonnet: \$3.00/M input vs \$15.00/M output). The engine calculates exact single-request and monthly projected costs with cent-level precision.

---

## 👨‍💻 Candidate & Submission Details

- **Candidate:** Arnav Anand ([beingarnavanand@gmail.com](mailto:beingarnavanand@gmail.com))
- **GitHub:** [@Arnaviitp](https://github.com/Arnaviitp)
- **Role:** Role 1 — Frontend Engineering
- **Target Platform:** OneAtlas ([oneatlas.dev](https://oneatlas.dev/))
