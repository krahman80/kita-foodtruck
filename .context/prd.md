# Product Requirements Document (PRD)

## Halal Chili Dog Food Truck — Web Application

**Status:** Draft v1
**Owner:** [Truck Owner / Product Owner Name]
**Last Updated:** [Date]

---

## 1. Overview

A single-page public website for a halal chili dog food truck operating in Sapporo, Japan, paired with a lightweight admin panel for managing the two pieces of information that change regularly: **daily truck location/schedule** and **menu items**. Everything else on the site is static content maintained directly in code.

The public site's purpose is to answer the two questions a hungry visitor has first: *"Where is the truck today?"* and *"What can I order, and how much does it cost?"* — while also building trust (halal sourcing, allergen info, story) and driving social follow.

---

## 2. Goals

- Let customers quickly find **today's location, hours, and map** without confusion.
- Present the **full menu with prices (¥)** clearly, with enough detail (spice level, halal status, allergens) to support informed ordering decisions.
- Give the owner a simple way to **update the daily location** and **occasionally update the menu** without touching code.
- Establish trust and brand identity (halal, artisanal, Sapporo-local) through design and copy.
- Keep the technical footprint minimal — one small team (likely one owner) will maintain this long-term.

## 3. Non-Goals (Out of Scope for v1)

- Online ordering / pre-order / payment processing
- Loyalty programs, gift cards, merch
- Mobile app (no plans, confirmed)
- Multi-language support (English only; prices in JPY)
- Analytics/tracking (explicitly excluded for v1)
- Real-time "open now / closed" status logic tied to current time
- "Next stop" lookahead — only today's status is ever shown, never future dates, on the public site
- Halal certification detail section (kept out for now; halal status is communicated via simple badges/copy instead)
- Multiple daily stops (only one location entry per calendar date)
- Public user accounts / registration (only the owner has a login)

---

## 4. Target Users

| User | Description | Needs |
|---|---|---|
| **Customer (public visitor)** | Local resident, tourist, or event-goer in Sapporo looking for halal food | Fast answer to "where" and "what/how much," reassurance on halal/allergens |
| **Owner/Admin** | Single operator managing the truck | Simple, low-friction way to update today's location and occasionally edit the menu |

---

## 5. Tech Stack

| Layer | Technology |
|---|---|
| Backend framework | Laravel 12 (PHP ^8.2) |
| Frontend bridge | Inertia.js v2 (`inertiajs/inertia-laravel`, `@inertiajs/vue3`) |
| Frontend framework | Vue 3 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`), custom `@theme` oklch color tokens |
| Build tool | Vite 7 |
| Auth (admin only) | Laravel Breeze (session-based), Laravel Sanctum present but not actively used for token/API auth in v1 |
| Testing | PHPUnit, Mockery |
| Dev tooling | Laravel Pail (logs), Laravel Pint (formatting), Laravel Sail (optional local env) |

**Architecture decision:** Single Laravel/Inertia application. No separate API, no separate admin app, no CORS setup required. Route-based separation between public and admin areas within the same codebase.

---

## 6. Application Structure

### 6.1 Routing

```
/                    → Public SPA (single page, component-driven)
/login               → Breeze login (admin only — public registration disabled/hidden)
/admin               → Admin dashboard (protected by auth middleware)
/admin/locations     → Manage location calendar entries
/admin/menu          → Manage menu items
```

### 6.2 Public Page Composition

The `/` route is not one monolithic template — it's assembled from section-specific Vue components, matching the 8 approved sections:

1. Navigation
2. Hero
3. Location Schedule
4. Full Menu (gallery)
5. About / Story
6. Allergen & Dietary Info
7. FAQ
8. Footer (includes Contact + Social/Follow Us as columns)

Dynamic sections (Hero's popular item, Location, Menu) receive data as props passed down from the page-level component, sourced from the Laravel controller via Inertia. Static sections (About, Allergen, FAQ, Footer copy) contain their content directly.

### 6.3 Admin Panel

- Protected by Breeze session auth (`auth` middleware), single admin account, no public sign-up.
- Two management areas: **Location Calendar** and **Menu Items**.
- Visual treatment: plain, unbranded utility UI (standard forms/tables, default Breeze-style scaffolding) — does not need to match the public site's editorial branding.

---

## 7. Functional Requirements by Section

### 7.1 Navigation (static)
- Logo left, nav links right (desktop).
- Collapses into a hamburger menu on small viewports; opens a mobile drawer.
- Links scroll to in-page sections: Location, Menu, Story, Allergens, FAQ.
- Primary CTA button ("Find Truck Today") links to the Location section.

### 7.2 Hero (partially dynamic)
- Displays the current **most popular menu item** (pulled from Menu data — see 8.2).
- Displays an **upcoming event pill**, if a scheduled calendar entry is flagged as an event.
- Static headline, subheadline, and primary/secondary CTA buttons.

### 7.3 Location Schedule (dynamic)
- **If today has a calendar entry:**
  Display exact format: **"[Day], [Month] [Date] — Today we'll be at [Location] ([landmark note, if any]), from [start time] to [end time]"**
  Includes: address detail, transit note, embedded map (via lat/long), map pin caption.
- **If today has no calendar entry:**
  Display a calm holiday/closed message. No map, no time shown.
- No real-time open/closed calculation, no display of future/past dates — only today's state, binary (scheduled vs. not).

### 7.4 Full Menu with Prices (dynamic)
- Grid/gallery of menu item cards.
- Each card displays: image, name, price (¥, whole yen, tax inclusive), spice level indicator, short description, two highlight tags, and a badge (standard halal badge or limited-batch badge).
- Sold-out items marked but not removed from display (admin toggle).
- Inactive/discontinued items excluded from the public grid (admin toggle).
- Manual display order controlled by admin.

### 7.5 About / Story (static)
- Owner photo alongside narrative text about why the truck exists and its halal sourcing philosophy.

### 7.6 Allergen & Dietary Info (static for v1)
- Plain-language paragraph(s) covering halal sourcing and common allergens (dairy, gluten, nuts).
- Not tied to per-item data in v1 (see Open Decisions re: optional relational allergen model for later).

### 7.7 FAQ (static)
- Minimum required questions: where to buy/find the truck, what ingredients are used.
- Accordion interaction — one open at a time.

### 7.8 Footer (static)
- Three columns: (1) Truck identity + short description, (2) Contact info (email, phone, mobile base area), (3) Social/Follow Us (Instagram, TikTok).
- Bottom bar: copyright line.

---

## 8. Data Model Summary

Only two entities require persistence and admin management. Full column-level schema is documented separately (`database-structure.md`).

### 8.1 `locations`
One row per calendar date. Fields include: date, location name, address, landmark note, start/end time, latitude/longitude, map pin note, transit note, event flag + event name, status (scheduled/cancelled).

**Admin interaction:** Admin adds one entry per date via a calendar-style interface in `/admin/locations`.

### 8.2 `menu_items`
One row per menu item. Fields include: name, slug, description, price (¥), image, alt text, spice level, category (two categories for v1), badge type, two highlight tags, popular flag (manual admin toggle), sold-out flag, active flag, display order.

**Admin interaction:** Admin adds/edits items via `/admin/menu`. Expected to change infrequently (roughly annually, occasional additions).

### 8.3 `allergens` + `menu_item_allergens` — Not Adopted for v1
A relational model for per-item allergen tagging was proposed but is **not** used for v1. Allergen info remains static paragraph text (Section 7.6). May be revisited post-launch if per-item tagging becomes necessary.

---

## 9. Non-Functional Requirements

- **Mobile-first:** Majority of visitors will check location/menu from a phone while out; layout and performance must prioritize mobile.
- **Performance:** Menu and gallery images should be optimized/compressed; lazy-loaded where reasonable, given the photo-heavy sections.
- **SEO basics:** Page title, meta description, and location-relevant keywords (e.g., "halal food truck Sapporo") should be set, since discovery is highly local-search-driven.
- **Accessibility:** Semantic HTML, alt text on all images (already reflected in data model), keyboard-navigable nav/accordion.
- **Simplicity of maintenance:** Single deployment, single database, no external services required beyond hosting and a map provider.

---

## 10. Design Reference

- Style direction: "Calm Editorial Warmth" — cream-dominant, food-truck-appropriate, photography-led.
- Color tokens (oklch, cream-dominant ratio ~70/15/10/5): Warm White/Alabaster (dominant), Charcoal Brown (text), Truck Orange (primary accent/CTA), Cheddar Yellow (secondary accent), Toasted Bun Tan (structural/dividers), Chili Red (rare alert accent — sold out, limited specials).
- Typography: Outfit (display/headings), Plus Jakarta Sans (body).
- Full design prompt and reference mockup already produced (`design-prompt.md`, uploaded `index.html`).

---

## 11. Decisions (Finalized)

- **Menu categories:** Two categories only for v1 (chili dog, drink — confirm exact pair with owner if further narrowing needed). `menu_items.category` enum scoped accordingly; no sides/combos for v1.
- **Allergen info:** Stays static paragraph text (Section 7.6). The optional `allergens` / `menu_item_allergens` relational tables are **not** adopted for v1.
- **`is_popular`:** Confirmed as a manual toggle in the admin Menu UI — no derivation from order/analytics data.
- **`MenuCard.vue` / `FaqItem.vue`:** Built as **separate, reusable components**, rendered via `v-for` from their parent section (`MenuGallery.vue`, `Faq.vue`). Chosen over inlining for isolated props/state per item, easier testing, and reuse potential (e.g., Hero's popular-item display can reuse `MenuCard.vue`).
- **Admin panel styling:** Plain, **unbranded utility UI** (standard forms/tables, default Breeze-style scaffolding) — does not need to match the public site's editorial design system.
- **Seasonal operation:** **No off-season.** Truck operates year-round; the calendar simply has no entry on days it doesn't run, which already triggers the standard holiday/closed state (Section 7.3). No separate seasonal-closure notice needed.

---

## 12. Sprint Plan (Vertical Development)

Each sprint delivers a complete, end-to-end vertical slice — database → backend → admin UI → public UI — for one feature area, rather than building horizontally across the whole app layer by layer. This means functionality is demoable and testable at the end of every sprint, not just at final integration.

### Sprint 0 — Foundation
- Confirm Laravel + Inertia + Vue 3 + Tailwind v4 scaffold runs end-to-end (`composer run dev`)
- Breeze installed, single admin account seeded, public registration disabled/hidden
- Base route structure: `/`, `/login`, `/admin` (protected shell, no features yet)
- Static Navigation and Footer components (shared shell for all pages)
- Design tokens (`@theme` oklch colors, fonts) wired into Tailwind config

**Outcome:** Deployable skeleton — logged-out visitor sees an empty shell page; admin can log in and see an empty dashboard.

### Sprint 1 — Location Vertical Slice
- `locations` migration + Eloquent model
- Admin: `/admin/locations` — calendar-style CRUD (add/edit/cancel a date entry: location name, address, landmark note, start/end time, lat/long, map pin note, transit note, event flag + name)
- Public: `LocationSchedule.vue` — today's-entry vs. holiday state, exact copy format, embedded map
- Controller wiring: public `/` passes today's location as an Inertia prop

**Outcome:** Owner can log in, add today's stop, and see it reflected live on the public site — fully working feature, independent of Menu.

### Sprint 2 — Menu Vertical Slice
- `menu_items` migration + Eloquent model
- Admin: `/admin/menu` — CRUD for menu items (name, description, price, image, spice level, category [2 categories], badge type, highlight tags, `is_popular` toggle, `is_sold_out` toggle, `is_active` toggle, display order)
- Public: `MenuGallery.vue` rendering `MenuCard.vue` per item (separate reusable component, per earlier decision)
- Hero integration: `Hero.vue` reuses `MenuCard.vue` (or a variant) to display the `is_popular` item

**Outcome:** Owner can manage the full menu independently; public site reflects price/availability changes immediately.

### Sprint 3 — Static Content Sections
- `AboutStory.vue` (owner photo + story copy)
- `AllergenInfo.vue` (static paragraph copy)
- `Faq.vue` rendering `FaqItem.vue` (accordion, separate reusable component)
- `SocialFollow.vue` (or folded into `Footer.vue` — per Section 6.2/7.8)
- Finalize Hero's static headline/subheadline/CTAs

**Outcome:** All 8 public sections are now complete and content-accurate; site is functionally full.

### Sprint 4 — Polish, QA & Launch
- Mobile-first responsiveness pass across all sections
- Image optimization/lazy-loading for Menu gallery and Hero
- SEO basics: page title, meta description, local-search keywords
- Accessibility check: alt text, keyboard nav, accordion ARIA states
- Edge case QA: empty menu state, holiday state, sold-out items, long text overflow
- Admin UI QA: unbranded utility UI, form validation, calendar edge cases (e.g., past dates, duplicate-date prevention)
- Production deployment, domain/hosting, map provider key setup

**Outcome:** Launch-ready site.

---

### Suggested Sprint Order Rationale
Location ships before Menu because it's the single most time-sensitive, highest-value feature ("where is the truck today") — getting that vertical slice live first gives the owner immediate practical value even before the rest of the site is finished. Static content is deliberately sequenced last since it carries no backend risk and can flex around the two data-driven sprints if timeline pressure hits.
