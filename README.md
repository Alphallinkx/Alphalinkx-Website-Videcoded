# Alphalinkx — Premium 3D Digital Agency Platform

> **Live Preview:** [http://localhost:3000](http://localhost:3000)  
> **Backend Engine:** [http://localhost:5001/api](http://localhost:5001/api)  
> **Admin Portal:** [http://localhost:3000/admin](http://localhost:3000/admin)  

---

## 1. Project Overview

**Alphalinkx** is a full-stack, 3D digital agency platform built for category-defining enterprises and high-growth technology companies. It unites the visual prestige of an Awwwards-caliber creative agency with a production TypeScript backend, Prisma database architecture, lead capture engine, and protected administrative dashboard.

### Brand Identity & Design Tokens

Derived directly from the official **Alphalinkx** logo:
- **Primary Brand Color:** Electric Magma Orange (`#FC6603`, RGB `252, 102, 3`)
- **Background & Surfaces:** Obsidian Black (`#060709`, `#0B0D13`, `#10131C`)
- **Typography:** *Space Grotesk* (Display/Headlines), *Plus Jakarta Sans* (Body/Interface), *JetBrains Mono* (Code/Metrics)
- **Glassmorphism:** Layered `backdrop-filter: blur(16px)` with 1px border refraction (`rgba(255, 255, 255, 0.08)`) and electric orange subtle lighting

---

## 2. Technology Stack

### Frontend
- **Framework:** React 19 + Vite 6 + TypeScript
- **Styling:** Tailwind CSS with custom design system tokens
- **3D Experiences:** Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
- **Animations:** Motion for React (`motion/react`) + GSAP ScrollTrigger + Lenis smooth scrolling
- **Routing:** React Router v7 (`react-router-dom`)
- **Form State & Feedback:** Canvas Confetti + Zod + SVG Micro-interactions

### Backend & Database
- **Server:** Node.js with Express + TypeScript (`server/index.ts`)
- **Database & ORM:** Prisma ORM with SQLite locally (100% production-ready for PostgreSQL via `prisma/schema.prisma`)
- **Authentication:** JWT (JSON Web Tokens) with `bcryptjs` password hashing
- **Security:** In-memory IP rate limiting, anti-spam honeypot detection, duplicate submission suppression
- **Notifications:** Asynchronous email dispatch engine (Nodemailer with graceful dev simulation)

---

## 3. Site Map & Routes

- `/` — **Homepage** (10 Immersive Sections)
  1. *Section 01:* Navigation with services mega-dropdown & live beacon CTA
  2. *Section 02:* Cinematic 3D Hero with interactive sculpture & particle field
  3. *Section 03:* Trust Marquee (single marquee per page rule)
  4. *Section 04:* About Alphalinkx (editorial narrative & core pillars)
  5. *Section 05:* Services & Capabilities (6 core capability cards)
  6. *Section 06:* Selected Work (browser-framed project gallery & case study modal)
  7. *Section 07:* Why Choose Alphalinkx (asymmetric bento grid)
  8. *Section 08:* 4-Stage Phased Engine (interactive timeline tabs)
  9. *Section 09:* Technology & Innovation (3D tech constellation)
  10. *Section 10:* Verified Endorsements (attributions compliant with line limits)
  11. *Section 11:* Multi-Step Project Inquiry & Brief submission
  12. *Section 12:* Premium Footer with newsletter subscription & legal links
- `/about` — Dedicated agency story, metrics, and core code
- `/services` — All capabilities directory
- `/services/:slug` — Dedicated blueprints for each of the 6 specializations:
  - `/services/website-development`
  - `/services/seo`
  - `/services/digital-marketing`
  - `/services/app-development`
  - `/services/graphic-designing`
  - `/services/ai-development`
- `/projects` — Full portfolio gallery with category filters
- `/projects/:slug` — Deep-dive case studies with challenge, solution, and measurable outcomes
- `/contact` — Dedicated consultation and global hubs page
- `/privacy-policy` & `/terms-of-service` — Full compliance policies
- `/admin` — Protected administrative dashboard

---

## 4. Administrative Credentials

- **URL:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Email:** `admin@alphalinkx.com`
- **Password:** `Alphalinkx2026!`

*Features available in the admin portal:*
- Real-time agency statistics (Total Leads, New Inquiries, Projects, Newsletter Subscribers)
- Full lead management table with live search and status filters (`NEW`, `IN_REVIEW`, `CONTACTED`, `ARCHIVED`)
- Internal notes editor for recording client call logs
- Permanent lead deletion action

---

## 5. Development & Deployment Commands

```bash
# Install dependencies
npm install

# Push database schema & generate Prisma client
npm run db:push
npm run db:generate

# Seed sample data (admin user, services, projects, testimonials)
npm run db:seed

# Launch full-stack application (client on port 3000, server on port 5001)
npm run dev

# Production build verification (type-checks and bundles client & server)
npm run build
```
