# Conceptual Studies — PRD

## Original Problem Statement
Build a premium, modern, SEO-first educational website for "Conceptual Studies" — a Commerce coaching brand led by mentor Komal Sejwal (PhD Scholar, NET JRF, SRF, CA Intermediate; 10+ years experience). Brand tagline: "Strong Concepts Today. Confident Results Tomorrow." Generates qualified demo class inquiries from Class 11/12 Commerce students, Parents, and CUET aspirants. Online coaching across India.

## Architecture
- **Backend**: FastAPI + Motor (async MongoDB). JWT auth via httpOnly cookies (bcrypt password hashing). API at `/api/*`. Idempotent admin + content seeding on startup.
- **Frontend**: React 19 + React Router 7 + Tailwind + Shadcn UI + Framer Motion + react-fast-marquee. Cormorant Garamond (headings) + Poppins (body).
- **DB collections**: `users`, `leads`, `blog_posts`, `reviews`. Indexes on email/id/slug.
- **SEO**: Per-page `<title>`, meta description, OG tags, canonical URLs, JSON-LD schema (EducationalOrganization, Person, FAQPage, Course, BlogPosting, AggregateRating/Review). Static `/robots.txt`, dynamic `/api/sitemap.xml` listing all pages + 8 blog slugs.

## User Personas
- **Class 11/12 Commerce students** (primary) — looking for concept-based coaching
- **Parents** — looking for credibility, structure, communication
- **CUET aspirants** — looking for domain-specific MCQ prep

## Core Requirements (static)
- 13 routes: Home, About Mentor, Accountancy, Economics, Business Studies, Crash Courses, CUET, Reviews, Contact, Blog, BlogPost, Admin Login, Admin Dashboard
- Sticky glass-morphism header, premium navy footer, floating WhatsApp button
- Demo form (Name, Class, Board, Subject, Phone, City, Message) → MongoDB
- JWT-protected admin dashboard (Leads / Blog Posts / Reviews tabs, delete actions)
- 8 pre-written SEO-optimized blog articles seeded on startup
- 3 real student testimonials (Rohit Choudhary, Gracy, Monika Choudhury) seeded

## Implemented (2026-06-19)
- ✅ All 13 pages with brand-consistent premium design (#0F2744 navy, #1E4F8C blue, #D4A93A gold)
- ✅ Hero with badges + dual CTA (Book Free Demo + Talk To Mentor)
- ✅ Marquee trust bar (10+ Years Experience, Concept-Based Learning, etc.)
- ✅ 6 "Why Us" cards, 3 subject cards with curriculum, 6 crash courses, CUET features, Student Journey stepper, Outcomes grid, Reviews, FAQ accordion, Demo form
- ✅ Admin login + dashboard with leads/blog/reviews management
- ✅ SEO: per-page title/meta, JSON-LD schema, sitemap.xml, robots.txt
- ✅ Floating WhatsApp button (wa.me link with pre-filled message)
- ✅ Mobile responsive (mobile-first; sticky header collapses to hamburger menu)
- ✅ End-to-end tested: 13/15 backend, 100% frontend flows verified

## Admin Credentials
- Email: `admin@conceptualstudies.in`
- Password: `ConceptAdmin@2025`

## Prioritized Backlog
### P1
- Admin: blog post create/edit UI (currently delete-only; backend POST/PUT endpoints already exist)
- Lead status workflow (PATCH endpoint exists — surface in UI as dropdown)
- Email notification on new lead (Resend / SMTP integration)

### P2
- Replace seeded testimonials with a dynamic review submission form (with admin moderation)
- Add gallery of student results (board scores, college admissions)
- Add a "Class Recordings / Notes" gated section for enrolled students
- Add an explicit pricing/programs comparison page

### P3
- Migrate FastAPI startup events to lifespan context manager (deprecation warning)
- Tighten CORS allow_origins (remove "*")
- Add phone number regex validation
- Sub-router refactor (auth, blog, leads, reviews into separate files)
