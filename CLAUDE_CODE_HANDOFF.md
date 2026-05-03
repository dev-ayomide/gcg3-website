# GCG3 Website — Claude Code Handoff Prompt

---

## TASK

Build a visually stunning, production-ready **Next.js 14 (App Router) + Tailwind CSS** frontend for **GCG3** (God's Children Got Great Gifts) — a Christian children's talent and mentorship nonprofit based in Ontario, Canada.

The site must pull live data from an existing WordPress REST API and redirect to WordPress for all payments and form submissions. No payment logic. No custom form backends.

Start from scratch. Delete any existing files in this folder and rebuild cleanly.

---

## WHAT THIS SITE IS

GCG3 is a faith-based nonprofit that helps children (ages 10–17) discover, develop, and celebrate God-given talents. Think: elevated church brand meets modern nonprofit. Deep navy + amber gold. Warm, joyful, faith-forward. NOT corporate. NOT generic.

---

## TECH STACK

```
Framework:    Next.js 14 (App Router only — no pages/ router)
Styling:      Tailwind CSS
Animations:   Framer Motion (scroll reveals, hero entrance, hover effects)
Data:         WordPress REST API (gcg3official.com/wp-json/wp/v2/)
Hosting:      Vercel
Images:       next/image with remotePatterns for gcg3official.com
Fonts:        Google Fonts — Bricolage Grotesque (headings) + Inter (body)
```

---

## DESIGN SYSTEM

### Colors
```
bg:           #0D1B2A   (near-black navy — primary background)
surface:      #132236   (card/section background)
primary:      #1A5276   (mid blue)
accent:       #F4A528   (warm amber — ALL CTAs, highlights, icons)
accent-light: #FEF3DC   (pale amber)
text:         #F0F4F8   (off-white)
muted:        #8FA3BB   (secondary text)
```

### Typography
```
Headings: Bricolage Grotesque — variable weight, bold, warm
Body:     Inter — clean, readable
```

### Design Principles
- Dark backgrounds throughout (no white pages)
- Amber gold is the accent color — used for ALL CTAs, badges, icons, underlines
- Cards use `#132236` with `border: 1px solid rgba(255,255,255,0.05)`
- Hover states: cards lift slightly + get a subtle amber border glow
- Sections alternate between `#0D1B2A` and slightly lighter `#0f2033`
- Use generous spacing — padding, breathing room
- Section eyebrows: small uppercase amber text above headings (e.g. "Our Story", "What We Offer")
- Headings are large and bold (3xl–6xl depending on context)
- Rounded elements: buttons are `rounded-full`, cards are `rounded-2xl`
- Noise/grain texture overlay on hero at ~3% opacity

### Animations (Framer Motion)
- Hero: staggered `fadeInUp` on load (eyebrow → headline → subtext → pills → CTAs)
- All sections: scroll-triggered `fadeInUp` with `useInView` (once: true)
- Cards: stagger children on scroll reveal
- Navbar: slides in on load, blurs on scroll past hero
- Buttons: scale + brightness on hover
- Event cards: hover lift + amber border glow

---

## FILE STRUCTURE

```
/
├── app/
│   ├── globals.css
│   ├── layout.tsx           ← Navbar + Footer wrapper
│   ├── page.tsx             ← Homepage
│   ├── about/page.tsx
│   ├── programs/page.tsx
│   ├── events/
│   │   ├── page.tsx         ← Events listing
│   │   ├── loading.tsx      ← Skeleton loader
│   │   └── [slug]/page.tsx  ← Event detail
│   ├── contact/page.tsx
│   └── not-found.tsx
├── components/
│   ├── Navbar.tsx           ← Sticky, blur-on-scroll, mobile hamburger
│   ├── Footer.tsx
│   ├── HeroSection.tsx      ← Full viewport, Framer Motion staggered
│   ├── EventCard.tsx        ← Card with image, price badge, date, location
│   ├── ProgramCard.tsx      ← Icon + title + description + CTA
│   └── SectionReveal.tsx    ← Framer Motion scroll reveal wrapper
├── lib/
│   └── wordpress.ts         ← All WP API fetch functions
└── types/
    └── wp.ts                ← TypeScript types
```

---

## WORDPRESS API

Base URL: `https://gcg3official.com/wp-json/wp/v2`

### Confirmed working endpoints:
```
GET /events?per_page=20&_embed          ← All events (with featured images)
GET /events?slug={slug}&_embed          ← Single event
GET /pages?slug={slug}                  ← Static pages
GET /pages/14                           ← About page
GET /pages/18                           ← Programs page
```

### `_embed` includes featured image automatically:
```ts
event._embedded?.['wp:featuredmedia']?.[0]?.source_url
```

### ISR:
```ts
{ next: { revalidate: 3600 } }   // events — hourly
{ next: { revalidate: 86400 } }  // pages — daily
```

### IMPORTANT — do NOT render `content.rendered` as HTML
Elementor builds that HTML and it's full of widget divs — it will look broken. Use:
- `title.rendered` — event/page title
- `excerpt.rendered` — short description
- `acf.event_date`, `acf.event_location`, `acf.event_price` — custom fields
- If ACF fields are missing, parse `content.rendered` as a fallback or hardcode known values

---

## KNOWN CONTENT (hardcode this — don't depend on WP for static copy)

### Events (from WP CPT):
| Title | Price | Date | Location |
|---|---|---|---|
| GCG3 Christian Musical Talent Show | $30 | 15/08/2026 | 1795 Finch Avenue West, Toronto, ON M3N 1M6 |
| GCG3 Teen Mentorship Program | Free | 02/12/2023 | Green Briar Rec Centre, Brampton |
| Teen Leadership Program | Free | — | — |
| Talent Show | $30 | 11/08/2024 | 1785 Avenue West, Toronto M3N 1M6 |
| Reading Club | Free | — | — |

### Programs:
| Program | Ages | Slug |
|---|---|---|
| Teens Mentorship Program | 12–17 | `gcg3-teen-mentorship-program` |
| Book Club | All | `reading-club` |
| Teens Leadership Program | 10–17 | `teen-leadership-program` |
| Talent Show | All | `gcg3-christian-musical-talent-show` |

### About:
- Mission: To create a platform where young children can fully express their individual talents.
- Vision: To showcase the talents God has deposited in young children.
- Objectives: Promote the kingdom of God · Enhance children's self-esteem · Create a community that radiates the glory of God
- Core Values: Integrity · Fairness · Fun · Creativity · Equality
- Scripture: Matthew 25:20

### Contact:
- Phone: 416-858-4455
- Email: gcg3official@gmail.com
- Address: Suite 201a, 7581 Jane Street, Ontario, Canada
- Hours: Mon–Fri 9:00 AM – 6:00 PM · Sat–Sun Closed
- Payment: E-transfer to gcg3official@gmail.com OR WooCommerce/Stripe

---

## PAGE-BY-PAGE SPEC

### `app/layout.tsx`
- **Navbar:** sticky top, logo left ("GCG3" with amber circle), nav links center (Home / Programs / Events / About / Contact), amber "Register Now" CTA button right, mobile hamburger, blur backdrop on scroll
- **Footer:** logo + tagline ("Faith · Talent · Community"), quick links column, contact info column, Facebook link, copyright

---

### `app/page.tsx` — Homepage

**Section 1: Hero (full viewport)**
- Background: `#0D1B2A` with grain texture overlay + amber radial glow blob center
- Eyebrow: "Faith · Talent · Community" (amber, tiny uppercase)
- Headline: "God's Children Got Great Gifts" (huge, white, Bricolage Grotesque)
- Subheadline: "We help children discover, develop, and celebrate the talents God placed in them."
- Values pills row: Integrity · Fairness · Creativity · Equality (dark surface pills)
- Two CTAs: "Explore Our Events →" (amber filled) + "About Us" (outlined)
- Framer Motion: stagger each element in sequence on load

**Section 2: About Snapshot**
- 2-col layout: text left, visual right
- Eyebrow: "Our Story"
- Headline: "A Community Built on Faith & Talent"
- Copy: reference to Matthew 25:20, mission statement
- CTA: "Read Our Story →" (amber)
- Right side: styled card or image placeholder with mission quote overlay

**Section 3: Programs (2×2 or 4-col grid)**
- Eyebrow: "What We Offer"
- Headline: "Our Programs"
- 4 ProgramCards: icon + title + description + "Register →" or "Coming Soon" badge
- "See All Programs" link below

**Section 4: Upcoming Events (live from WP)**
- Eyebrow: "Live from GCG3"
- Headline: "Upcoming Events"
- 4 EventCards in a grid (fetched live)
- Loading skeleton if data is loading

**Section 5: Contact Strip**
- 3 cards: Phone & Email · Address · Hours
- "Contact Us →" CTA

---

### `app/events/page.tsx`
- Page hero with title "Upcoming Events at GCG3"
- Amber payment notice banner: "💳 Payment Option: Send e-transfer to gcg3official@gmail.com"
- All events in a 3-col grid (fetched from WP)
- Empty state if no events

---

### `app/events/[slug]/page.tsx`
- `generateStaticParams` from `getEvents()` slugs
- Featured image full-width at top (with gradient overlay)
- Price badge, title, date + location
- Excerpt/description
- **Registration section:**
  - Free events → `<iframe src={event.link + '#registration-form'} />` (WP handles the form)
  - Paid events → `<a href={event.link} target="_blank">Register & Pay ($30) →</a>` button + e-transfer note
  - DO NOT rebuild the payment flow

---

### `app/programs/page.tsx`
- Hero title "Our Programs"
- Each program as a large horizontal card: icon + title + ages badge + highlights list + description + "Register →"

---

### `app/about/page.tsx`
- Hero: "About GCG3"
- Mission card + Vision card (side by side)
- Matthew 25:20 scripture blockquote (centered, styled)
- Objectives (3 numbered cards)
- Core Values (5 pill/badge cards)
- CTA row: "Explore Events" + "Contact Us"

---

### `app/contact/page.tsx`
- Hero: "Contact Us"
- 3 info cards: Phone, Email, Address (clickable links)
- Office hours bar
- Google Maps iframe (7581 Jane Street, Concord, ON)
- Contact form iframe from `https://gcg3official.com/contact-us/`

---

## WHAT NOT TO DO

- ❌ Do NOT render Elementor `content.rendered` HTML directly
- ❌ Do NOT rebuild payment logic — redirect/iframe to WP
- ❌ Do NOT use the pages/ router — App Router only
- ❌ Do NOT fetch on the client with useEffect for static data — use Server Components
- ❌ Do NOT use white or light backgrounds — this is a dark theme
- ❌ Do NOT use generic/boring card designs — invest in the details
- ❌ Do NOT skip Framer Motion animations

---

## QUALITY BAR

This should look like a premium faith-based nonprofit site. Reference the design quality of:
- Modern church/ministry sites (Elevation Church, Transformation Church)
- Premium nonprofit sites with dark themes
- Think: polished, warm, faith-forward, NOT template-looking

Every section should feel intentional. Typography hierarchy should be clear. Spacing should be generous. The amber accent should feel like light — used purposefully, not everywhere.
