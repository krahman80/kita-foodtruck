# Readiness Check & Gap Analysis — Kita Chili Dogs

**Date:** 2026-09-04
**Scope:** PRD (`prd.md`), DDD (`ddd.md`), ERD (`erd.mermaid`) vs. current `project/` codebase
**Verdict:** **NOT READY**

---

## Summary of Current State

The repo is a **Breeze (Vue/Inertia) scaffold + a large, fully-static front-end prototype** of the public page. The design system (Tailwind v4 oklch tokens, fonts, layouts) is real and well-aligned with the PRD. **None of the two core domains (Location Scheduling, Menu Management) exist on the backend**, and there is **no admin panel at all**. Every data-driven section is hardcoded HTML/CSS mock content.

---

## ✅ Implemented Features (matching docs)

| Area                      | What exists                                                                                                                                               | Notes                                                                                          |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Foundation stack**      | Laravel 12, Inertia v2 (`inertiajs/inertia-laravel`), Vue 3, Tailwind v4 via `@tailwindcss/vite`, Vite 7, Breeze (session auth), Sanctum installed, Ziggy | Matches PRD §5 tech stack exactly. Composer + `package.json` confirmed.                        |
| **Design tokens**         | Full oklch `@theme` in `resources/css/app.css`: warm-white, truck-orange, cheddar-yellow, charcoal-brown, toasted-tan, chili-red                          | Matches PRD §10 palette. Fonts (Outfit / Plus Jakarta Sans) wired in `PublicLayout.vue` + CSS. |
| **Public shell**          | `PublicLayout.vue` contains §1 Navigation (desktop + mobile drawer) and §8 Footer (3-column + social + copyright)                                         | §1 & §8 exist, with SEO `<meta>`/OG tags in `PublicLayout`.                                    |
| **Static page copy**      | `Pages/Welcome.vue` holds §2 Hero, §3 Location, §4 Menu, §5 About, §6 Allergens, §7 FAQ as **static mockups**                                             | Visually complete prototype; all 8 sections render.                                            |
| **SEO basics (partial)**  | Title/description/OG/Twitter meta set in `PublicLayout` via `title`/`description` props                                                                   | Meets part of NFR §9.                                                                          |
| **Auth (generic domain)** | Full Breeze session auth: controllers, `Auth/*` pages, `AuthenticatedLayout`, `GuestLayout`, profile management                                           | Matches DDD §4.4 (off-the-shelf, no custom identity logic).                                    |

---

## ❌ Missing Infrastructure / Schema

| Requirement (ERD/DDD/PRD)                        | Status                                                                                                                                                                                            |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`locations` migration**                        | **Missing** — only default `users/cache/jobs` migrations exist.                                                                                                                                   |
| **`menu_items` migration**                       | **Missing** — no table, no enum columns (`spice_level`, `category`, `badge_type`, `status`), no `slug UK`, no unique index on `schedule_date`.                                                    |
| **`LocationEntry` model**                        | **Missing** — no `Location`/`LocationEntry` Eloquent model.                                                                                                                                       |
| **`MenuItem` model**                             | **Missing**.                                                                                                                                                                                      |
| **Domain invariants in model layer**             | **Missing** — "one entry per `schedule_date`", `start_time < end_time`, "event requires `event_name`", `is_active` precedence, price positive int, etc. (DDD §4.1/§4.2) not implemented anywhere. |
| **`MenuFeaturingService` (exactly-one popular)** | **Missing** — DDD §4.2 requires a domain service to clear `is_popular` cross-aggregate.                                                                                                           |
| **Location/Menu controllers**                    | **Missing** — only Breeze `Auth/*` + `ProfileController` exist. No `LocationController`, `MenuItemController`, no Form Requests.                                                                  |
| **API/Inertia endpoints**                        | **Missing** — no route returns today's scheduled `LocationEntry` or active `MenuItems` as Inertia props.                                                                                          |
| **Admin account seeding**                        | **Missing** — `DatabaseSeeder` only creates `Test User`, not a single admin identity.                                                                                                             |
| **Map provider key setup**                       | **Missing** — public page embeds a hardcoded Google Maps iframe (`maps.google.com/maps?...output=embed`), not a configured provider/key (PRD NFR §9 / Sprint 4).                                  |
| **Public registration disabled**                 | **Not done** — `register` routes exist in `routes/auth.php`, plus `Register.vue` + `RegisteredUserController`. PRD §6.3 requires single admin, **no public sign-up**.                             |

---

## ❌ Missing UI / Routes

| Requirement                                      | Status                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/admin` dashboard shell                         | **Missing** — only Breeze `/dashboard` exists (`Dashboard.vue` = stock "You're logged in!").                                                                                                                                                                                                                                                            |
| `/admin/locations` (calendar CRUD)               | **Missing** — no route, no page, no controller.                                                                                                                                                                                                                                                                                                         |
| `/admin/menu` (CRUD)                             | **Missing**.                                                                                                                                                                                                                                                                                                                                            |
| **Componentized public sections**                | **Missing** — PRD §6.2/§11 & DDD require reusable components: `Hero.vue`, `LocationSchedule.vue`, `MenuGallery.vue`, `MenuCard.vue`, `AboutStory.vue`, `AllergenInfo.vue`, `Faq.vue`, `FaqItem.vue`. Today §2–§7 are one monolithic ~1050-line `Welcome.vue`. `Components/` holds only Breeze primitives (buttons/inputs) — **zero domain components**. |
| **Data-driven Location section**                 | **Missing** — current Location block is hardcoded mock copy (Odori Park, Sep 6, ¥…) with a dev "Simulate Holiday / Closed State" toggle. No real "today has a scheduled entry?" branch from the DB.                                                                                                                                                     |
| **Data-driven Menu grid**                        | **Missing** — items are hardcoded cards, not rendered from `MenuItems` via `v-for`. No sold-out/active/display-order handling from data.                                                                                                                                                                                                                |
| **Data-driven Hero popular item + event pill**   | **Missing** — popular card and event pill are static HTML.                                                                                                                                                                                                                                                                                              |
| **Nav/Footer decoupled into section components** | **Partial** — §1/§8 live inline in `PublicLayout.vue` rather than as `Navigation.vue`/`Footer.vue` components (acceptable, but not per the named-component structure).                                                                                                                                                                                  |

---

## ⚠️ Blockers & Gaps (must resolve before feature work)

1. **Architectural mismatch: static prototype vs. dynamic app.** `Welcome.vue` hardcodes what must be server-driven. The Location section even includes prototype-only UI ("Simulate Holiday" toggle) and holiday-state copy that **violates a stated non-goal** — "Next Service: Tuesday, Sep 9…" is future-date lookahead, explicitly out of scope (PRD §3). This content must be rewritten as the state-driven `LocationSchedule.vue`, not carried forward as-is.
2. **No domain layer at all.** There are no models, migrations, or the `MenuFeaturingService`. DDD's invariants live nowhere, so admin forms would otherwise have to re-implement them ad hoc (DDD §6 explicitly warns against this).
3. **No admin authorization boundary exists** beyond stock Breeze `/dashboard`. The `/admin` group + shell, plus turning off public registration, are prerequisites for the Owner-only model.
4. **Data model not started** — the single most time-sensitive feature (today's location) has no persistence or query path; it cannot be demoed live yet.
5. **Backend deps are present but nothing consumes them** for the domains; `HandleInertiaRequests`/controllers need to start passing `todayLocation`, `menuItems`, and `popularItem` props.
6. **No feature tests** for either domain (only Breeze auth tests + stock `ExampleTest`). Sprint vertical slices expect testable slices.
7. **Static page is unmaintainable as-is** for the "simplicity of maintenance" NFR (§9) — the design prototype served its purpose but must be decomposed into the specified components before data wiring.

---

## 🏁 Final Verdict: **NOT READY**

The codebase is a **design prototype + auth scaffold**, not a functioning application. It is effectively at the very start of **Sprint 0 / pre-Sprint 1**, with the visual front-end prototype ahead of the (non-existent) backend. No feature can be updated by the owner end-to-end yet, and the public site does not reflect live data.

### Prioritized Tasks to Complete First

1. **Sprint 0 completion (foundation):**
   - Disable/hide public registration (remove/guard `register` route + nav link) so it's a single-admin system.
   - Create the `/admin` protected shell (route group + `AdminLayout`/dashboard page) and seed a single admin account in `DatabaseSeeder`.
2. **Sprint 1 — Location vertical slice:**
   - Add `locations` migration (per ERD: unique `schedule_date`, `start_time < end_time`, event/status, lat/long, notes) + `LocationEntry` model with invariants.
   - Add `LocationController` + Form Request; `/admin/locations` calendar CRUD (with cancel status + duplicate-date prevention).
   - Extract `LocationSchedule.vue`; wire public `/` to pass **today's scheduled entry** as an Inertia prop; implement scheduled vs. rest-day states; **remove the "Simulate Holiday" toggle and future-date copy**.
3. **Sprint 2 — Menu vertical slice:**
   - Add `menu_items` migration + `MenuItem` model; implement `MenuFeaturingService`.
   - `/admin/menu` CRUD; extract `MenuGallery.vue`/`MenuCard.vue`; drive Hero's popular item + event pill from data.
4. **Sprint 3 — Static content decomposition:**
   - Split remaining `Welcome.vue` static sections into `AboutStory.vue`, `AllergenInfo.vue`, `Faq.vue`/`FaqItem.vue` (accordion one-open-at-a-time).
5. **Sprint 4 — QA/polish** (after features exist): responsiveness, image lazy-loading, SEO keywords, accessibility/ARIA, edge-case QA (empty menu, holiday, sold-out), map provider key, and feature tests for both domains.

**Short version:** The look and feel are done; the _application_ is not. Treat `Welcome.vue` as the approved design reference, rebuild it as the specified component tree, and build the two domain vertical slices behind it before the site is "ready."
