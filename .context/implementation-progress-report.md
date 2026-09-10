# Implementation Progress Report — Kita Chili Dogs

**Generated:** 2026-09-08
**Basis:** cross-check of `.context/development-plan.md` (Sprint 0–4), `prd.md`, `ddd.md`, and the current codebase.

---

## 1. Overall Status

| Sprint   | Focus                                  | Status              |
| -------- | -------------------------------------- | ------------------- |
| Sprint 0 | Foundation (auth/admin shell/accounts) | ✅ Complete         |
| Sprint 1 | Location vertical slice                | ✅ Complete         |
| Sprint 2 | Menu vertical slice                    | ✅ Complete         |
| Sprint 3 | Static content decomposition           | ✅ Complete         |
| Sprint 4 | Polish, QA & launch                    | 🟡 Partial (see §5) |

> Plus several **user-directed scope additions** made on top of the plan (see §4).

---

## 2. Sprint-by-Sprint Detail

### Sprint 0 — Foundation ✅

- Public self-registration **removed** (no `register` routes in `routes/auth.php`); registration link gone from guest pages.
- **Accounts are created from inside `/admin/accounts`** by an existing admin (multi-admin, single role — `User` only, no roles table, per DDD §4.4).
- **Seeded bootstrap admin** (`admin@kitachilidogs.jp`, password from `config/admin.php` ← env) via `DatabaseSeeder` `updateOrCreate`.
- Protected `/admin` shell with `AdminLayout.vue` and nav (Dashboard / Locations / Menu / Accounts) + Profile/Log out.
- **Outcome met:** owner logs in with seeded creds, can change password / update profile / manage accounts, lands on a dashboard whose cards link to Locations/Menu/Accounts.

### Sprint 1 — Location vertical slice ✅

- Migration `locations` (one `schedule_date` per entry, unique; status scheduled/cancelled; event + time + geo + notes columns).
- `LocationEntry` model (`$table = 'locations'`) with domain queries `scopeScheduledOn()`, `todayScheduled()`, `nextScheduled()`, and constants.
- **Admin UX (agreed):** single `/admin/locations` page = PrimeVue **inline month calendar** with day markers (routine vs event vs cancelled), plus a **disabled-by-default inline form** that enables on date selection; past dates read-only; save returns to calendar with updated marker.
  - Extra: **Leaflet map click-to-set-coordinates** picker beside lat/lng inputs (scope addition).
- `LocationRequest` enforces unique date, `start < end`, event-name rule (`Rule::requiredIf`), etc.
- `LocationController`: index/store/update/**cancel** (status=history, no hard delete).
- **Public:** `LocationSchedule.vue` extracted and data-driven — active-service state (exact headline copy, address, transit, map, pin caption) and **Rest Day** state with **data-driven "Next Service"** note.
- `LocationEntryTest` added (9 tests).

### Sprint 2 — Menu vertical slice ✅

- Migration `menu_items` (name, unique slug, description, `price_yen`, image/alt, spice/category/badge enums, tags, popular/sold-out/active, display_order).
- `MenuItem` model with scopes (`scopeActive()`, `popularItem()`, `publicMenu()`) + `makeSlug()`.
- **`MenuFeaturingService`** (`feature()` single-popular transaction / `unfeature()`) — admin feature action routes through it (DDD §4.2).
- `MenuItemRequest` validates price, category, alt text, toggles, and **image upload** (jpg/png/webp, ≤2MB).
- `MenuItemController`: store/update/feature/toggle-sold-out/toggle-active + local `/storage/menu` image store/delete.
- **Admin UI** (two equal columns): left = add/edit form (file upload + preview), right = **card list with thumbnail**, name, category, price, flags, actions (Edit/Feature/Hide/Show/Sold out/Restock). Includes **success flash notification** (mirrors Location page) and form auto-resets to pristine "add" state after a successful create/edit.
- **Public:** `MenuGallery.vue` → `MenuCard.vue` (per active item), and Hero popular item + event pill data-driven.
- `MenuItemTest` added (6 tests).

### Sprint 3 — Static content decomposition ✅

- `Welcome.vue` is now a **thin composition**: `Hero`, `LocationSchedule`, `MenuGallery`, `AboutStory`, `AllergenInfo`, `Faq` (+ `FaqItem` accordion, one-open-at-a-time, ARIA).
- **`Welcome.vue` retained as the master public template** (per the ⭐ note); all components reproduce its layout/copy.
- Public static images (`hero-bg.jpg`, `owner-img.jpg`) served locally via bound `:src="'/images/...'"` (Vite-safe).

---

## 3. Tests & Build

- **Feature tests:** `LocationEntryTest` + `MenuItemTest` added on top of the Breeze auth suite (`AuthenticationTest`, `PasswordResetTest`, `PasswordUpdateTest`, `EmailVerificationTest`, `PasswordConfirmationTest`, `ProfileTest`).
- **Last known run:** 38 tests passing.
- **Front-end build:** clean (Vite). Timezone set to `Asia/Tokyo` (fixes "today" resolution in Sapporo).

---

## 4. Scope Additions / Deviations (user-directed, beyond the original plan)

1. **Multi-admin accounts inside admin** instead of removing register-only (deviation from PRD "single owner" — documented in plan §0.1).
2. **"Next Service" lookahead** on the public Rest Day state (was a PRD non-goal; later pulled into scope).
3. **Local image uploads** replaced URL image inputs in Menu admin.
4. **Leaflet map picker** in Locations admin (click-to-set lat/lng).
5. **Brand color theming** of auth/admin to the public brand palette (orange/cream/charcoal/forest), with colors **tokenized into Tailwind `@theme`** in `app.css`; replaced default Laravel/Breeze logo in admin + profile headers with the **Kita brand lockup**.
6. **Partial multi-language (EN ↔ 日本語)** via a lightweight custom i18n store (`resources/js/i18n.js`, Option A) — shared locale, persisted in `localStorage`:
   - **Public:** header/nav, footer, section headings, LocationSchedule UI text (incl. rest-day).
   - **Admin:** nav/dropdown, page headings, dashboard cards, key buttons/labels.
   - **Auth:** Login / Register / Forgot-password chrome + guest-shell tagline (carries the shared locale from the front page — no per-page toggle needed).
   - **404 page** remapped to brand tokens.
   - DB/content-driven copy intentionally left untranslated.

---

## 5. Sprint 4 — What's Done vs Remaining

### Done

- **4.1 (done):** lazy-loading for Menu gallery images (`loading="lazy"`), map iframe lazy-loading, hero image handled; **client-side image downscale/compress on upload** added (Menu page): any image is downscaled to ≤1000px on the longest side and re-encoded to WebP (fallback JPEG) to stay ≤700KB — **client-only, per decision** (no server-side dimension guard; server limit remains 2MB).
- **4.2 (most):** page title/meta description/keywords + OG tags; alt-text present; FAQ accordion ARIA + keyboard access.
- **4.3 (resolved by decision 2026-09-08):** no Google Maps API keys (behind a payment wall); keeping the current **free** map setup (public embed + Leaflet picker, no key).
- **4.4 / 4.5 manual QA**: covered ad hoc (empty menu, rest day, sold-out, inactive popular, past/duplicate dates) — checklist handoff offered.
- **4.6:** Location + Menu feature tests written.

### Not done / deferred

- **4.7:** Production launch/deployment — **not started**.

### Known open items (elaborated)

These are non-blocking, but each has a real user-visible or product-quality impact. They are grouped by who/why it matters and what resolving it involves.

#### ~~1) Menu item #3 "Tokyo Inferno Chili Dog" has a dead remote image URL~~ — ✅ RESOLVED (2026-09-08)

- **What it was:** The `image_url` for this item pointed at an **old external URL that returned 404**. (Items 1, 2 and 4 were already migrated to local `/storage/menu/...` uploads; item 3 was left on the remote link.)
- **Impact (before fix):** On the public site, the MenuCard for the item showed a **broken/blank image** — the most visibly broken asset on the page (also hurt perceived quality + SEO/alt handling).
- **Resolution:** The owner re-uploaded a local image via `/admin/menu` → Edit. All four menu items now use **local** `/storage/menu/...` URLs, and each file is confirmed present on disk under `storage/app/public/menu`.
- **Verification (DB, 2026-09-08):**
  - `1 — The Sapporo Classic 2` → `/storage/menu/XVPXfjTCc47vBjx1KYe3.jpg` ✅
  - `2 — Chilli Cheddar Dog 2` → `/storage/menu/tpLeNfbbOXP4Ac0SzPM2.jpg` ✅
  - `3 — Sapporo Inferno Chilli` → `/storage/menu/2bAkOV2MWq11KS1CPKQrBSP9jAyxTAMeoEOdhy5F.jpg` ✅ (newly uploaded)
  - `4 — The Smoky Bacon & Garlic Dog` → `/storage/menu/NCvbe8mHwokeO8d6lQRiFTnyTSoMqMIvXa5tTg6X.jpg` ✅
- No remaining menu item uses a remote URL.

#### 2) DB content & chips in JP mode — ✅ RESOLVED BY DECISION (2026-09-08)

- **Decision:** Keep all **database-stored content in English for now**. This is the intended behavior, not a gap.
- **Why this is fine:** DB content (menu item names/descriptions, location/event names, FAQ bodies, etc.) is rendered **exactly as stored** — there is no auto-translation layer that would rewrite it. So if the owner ever **updates the content to Japanese**, it will **automatically display in Japanese** with no code change. The shared-locale UI already handles the surrounding chrome.
- **Implication:** No per-locale DB columns (`name_en`/`name_ja`) and no content-translation layer are needed. The owner simply types the language they want into the admin forms (e.g. `/admin/menu`, `/admin/locations`), and the public/admin pages show it verbatim.
- **Out of scope (unchanged):** server-rendered messages the app itself generates (e.g. flash "Menu item added.", password-reset emails, seeder copy) are still English-only — these are app messages, not DB content, and would need Laravel `__()`/`lang/` files if localized later.
- **Minor leftover (chrome, not content):** the hardcoded admin **state chips** ("Active / Inactive", "Sold out" on the Menu cards) are static UI text, not DB content, so they stay English in JP mode until a few `admin.*` keys are added — cheap and purely cosmetic if ever wanted.

#### 3) Data-driven public copy not localized per locale

- **What it is:** The runtime-composed sentences in the public section are built in English in JS and are **not localized**:
  - `LocationSchedule` **headline** — e.g. `"Sep 8 — Today we'll be at Odori Park, from 11:00 to 15:00"` (`headline` computed).
  - `LocationSchedule` **next-label** — e.g. `"Sep 15 at Maruyama Park"` (`nextLabel` computed).
- **Why it's open:** These strings are assembled from `location`/`nextLocation` **data at runtime**, and the current i18n approach only swaps static chrome text via `t()`. Localizing them needs both the **wording templates** per language AND a **date formatter** that respects locale (JP date format + Japanese weekday/month names).
- **Impact:** On the Rest Day / active cards in JP mode, the sentence around the localized labels (`本日はお休みです`, `次の営業:`) is still English. This is the most visible remaining English in the _public_ data sections.
- **How to resolve (if desired):** add localized template keys (e.g. `loc.headline` with `{date}`/`{name}`/`{start}`/`{end}` placeholders) plus a locale-aware date function using `toLocaleDateString(i18n.locale === 'ja' ? 'ja-JP' : 'en-US', ...)`. This keeps the data (location names, times) as-is but localizes the surrounding sentence and date formatting.

> **Note:** Item 3 is the only remaining "content-level" i18n item — it localizes the _surrounding sentence/date format_ around DB data (which stays as-stored per the decision on item 2). It is optional and only matters if the owner wants the runtime-composed schedule sentences themselves in Japanese.

---

## 6. Recommended Next Steps (priority order)

1. ~~Re-upload the broken image for the Tokyo Inferno menu item~~ — ✅ done (all menu images are local now).
2. Optionally implement **image resize/compress on upload** (Sprint 4 §4.1) to finish the performance item.
3. ~~Decide on a map provider key~~ — ✅ resolved: sticking with the current **free** map setup (no Google Maps API key / payment).
4. Run the **full test suite** once more to reconfirm 38+ green before considering §4.7 launch prep.

---

## 7. Architecture Conventions (for future work)

- **DDD invariants live in models / domain services**, not controllers.
- **Core domains decoupled:** `LocationEntry` and `MenuItem` never reference each other; only the public layer reads both.
- **PrimeVue v4 = admin-only**, and only the inline `Calendar`/`DatePicker` month view. Public site is **pure Tailwind**.
- **`Welcome.vue` remains the master public template** — extract, don't redesign.
- **Colors** come from `@theme` tokens in `app.css` (`warm-white`, `truck-orange`, `cheddar-yellow`, `charcoal-brown`, `toasted-tan`, `chili-red`, `orange-soft/deep`, `cream`, `forest`).
- **i18n:** translate chrome text via `t('...')` from `resources/js/i18n.js`; shared locale (persisted). Translate UI labels, not DB content.

---

## 8. Planned — Feature Expansion Phase (Post-Launch)

Two additive enhancements were scoped after v1. Both are **production-safe additions with no schema changes**, and are independent of Sprints 0–4:

- **FX.1 — Public menu image lightbox:** clicking a menu image opens a **larger view** so customers can see it clearly. Reusable `ImageLightbox.vue`; accessible (Esc/backdrop close, focus returns to the trigger, `aria-modal`, preserves alt text). Uses the existing `image_url` — **no backend change**.
- **FX.2 — Admin monthly activity dashboard:** on the dashboard, show **per month** how many times the truck went out as an **Event** vs a **simple Stop** (scheduled `LocationEntry`, split by `is_event`; cancelled excluded). Read-only reporting query (last 12 months or a month/year selector) rendered on `Admin/Dashboard`.

**Cross-references:** `prd.md` §12 (Feature Expansion Phase), `development-plan.md` (Feature Expansion Phase), `ddd.md` §8.

**Status:** Not started (planned).
