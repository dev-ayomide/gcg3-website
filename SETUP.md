# GCG3 Frontend — Setup Guide

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Then set your domain to point to the Vercel deployment.

## Project Structure

```
gcg3-frontend/
├── app/                  ← All pages (Next.js App Router)
│   ├── layout.tsx        ← Root layout: Navbar + Footer
│   ├── page.tsx          ← Homepage
│   ├── about/page.tsx
│   ├── programs/page.tsx
│   ├── events/
│   │   ├── page.tsx      ← Events listing
│   │   └── [slug]/page.tsx ← Event detail
│   └── contact/page.tsx
├── components/           ← Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── EventCard.tsx
│   ├── ProgramCard.tsx
│   └── SectionReveal.tsx ← Framer Motion scroll wrapper
├── lib/
│   └── wordpress.ts      ← All WP REST API fetch functions
└── types/
    └── wp.ts             ← TypeScript types for WP responses
```

## WordPress Integration

All data is pulled live from `https://gcg3official.com/wp-json/wp/v2/`:

- **Events** → `/wp-json/wp/v2/events?per_page=20&_embed`
- **Pages** → `/wp-json/wp/v2/pages?slug=<slug>`
- **Media** → embedded via `_embed` param (no extra request)

Pages use ISR (Incremental Static Regeneration):
- Events: revalidate every **1 hour**
- Pages: revalidate every **24 hours**

## Form / Payment Strategy

- **Free events** → iframe the original WP event page (WPForms/CF7 handles submission)
- **Paid events ($30)** → redirect button opens WP WooCommerce/Stripe checkout
- **Contact form** → iframe the WP contact page

This keeps all payment and form logic on WordPress — zero duplication.

## Colors

| Token | Value | Use |
|---|---|---|
| `bg` | `#0D1B2A` | Page background |
| `surface` | `#132236` | Cards, sections |
| `primary` | `#1A5276` | Mid blue |
| `accent` | `#F4A528` | CTAs, highlights |
| `text` | `#F0F4F8` | Body text |
| `muted` | `#8FA3BB` | Secondary text |

## Fonts

- **Headings:** Bricolage Grotesque (Google Fonts)
- **Body:** Inter (Google Fonts)
