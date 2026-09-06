# Development Plan — Kita Chili Dogs

**Source docs:** `prd.md` (Sprint Plan §12), `ddd.md`, `erd.mermaid`, `readiness-assessment.md`
**Approach:** Vertical slices per the PRD — each sprint delivers a complete, demoable feature (DB → backend → admin UI → public UI). Work proceeds in order below; each sprint ends with tests passing and a demoable outcome.

> ## ⭐ MASTER TEMPLATE — `resources/js/Pages/Welcome.vue`
>
> `Welcome.vue` has been **modified and now contains every element/section of the public page** that will later be separated into individual components (Nav, Hero, Location, Menu, About, Allergen, FAQ, Footer).
>
> **It is the initial design / master template for the public page.** Any task in this plan that touches the public page MUST keep this `Welcome.vue` layout as the master reference:
>
> - Componentization (Sprint 1 §1.4, Sprint 2 §2.5, Sprint 3) extracts markup **from** `Welcome.vue` **into** components without redesigning the layout — components must faithfully reproduce this layout's structure, copy, classes, and states.
> - Do not redesign, restructure, or discard this layout.
> - **Only minor changes are allowed**, and only after the user has reviewed the result (per user direction: "i will allow minor changes after i see the result").

---

## Sprint 0 — Foundation (complete the scaffold)

> Goal: Deployable skeleton with no public sign-up. Logged-out visitor sees the public shell; the owner logs in with seeded default credentials, can change their password / update profile / add accounts from inside the admin dashboard, and sees an empty admin dashboard.

### 0.1 Bootstrap accounts from inside the admin area (no public sign-up)

- **Remove** the public `register` GET/POST routes from `routes/auth.php`. A merely-unlinked route is still reachable by URL and would let anyone self-register as an admin — this removal is the security-critical step.
- Remove the registration link from `GuestLayout.vue` (Breeze shows a "Register" link on the Login page).
- **Re-expose account creation behind `auth`:** add an admin "Accounts" area (e.g. `/admin/accounts`) where a logged-in owner can create additional admin accounts. Repurpose `Register.vue` / a new form here.
- Keep `User` as the single identity — still no roles table; every created account is full admin (DDD §4.4).
- > **Note (scope expansion):** this deliberately extends the PRD's "single admin / only the owner has a login" into _multi-admin, single role_. Acceptable for an owner-plus-spare setup, but it's a conscious deviation from the written spec — if strict single-user is ever needed, drop the in-dashboard create action and keep only the seeded account.

### 0.2 Seed the first admin with default credentials

- Because new accounts can only be created by an _existing_ admin, the first-run admin must come from the seeder: create a deterministic bootstrap account (e.g. `admin@kitachilidogs.jp`) with a default password read from `.env` / a config value (never hardcoded in a committed file).
- Recommended: force (or strongly prompt) a password change on first login so the default credential doesn't linger (e.g. a `must_change_password` flag, or a clear "Change password" prompt after first login).

### 0.3 Build the `/admin` protected shell

- Route group `Route::prefix('admin')->middleware(['auth','verified'])` in `routes/web.php` → `name('admin.')`.
- Replace/repurpose the stock Breeze `/dashboard` with an `Admin/Dashboard` page (or add `/admin` rendering `Admin/Dashboard.vue`).
- Add an `AdminLayout.vue` (reuse Breeze `AuthenticatedLayout.vue` or build a plain unbranded admin shell per PRD §6.3 — standard forms/tables, no editorial branding).
- Add an admin nav with links to the (soon) Location & Menu areas, plus owner-account controls: **Change password / Update profile** (Breeze `/profile` forms) and **Add account**.
- **Outcome check:** owner logs in with the default credentials, can change password and update profile from inside the dashboard, and lands on an empty dashboard; public `/` shows the shell page.

---

## Sprint 1 — Location Vertical Slice (Core Domain #1)

> Goal: Owner can add today's stop in `/admin/locations` and see it live on the public site.

### 1.1 Migration — `locations`

Create `create_locations_table`. Columns per ERD, with invariants expressed at the schema level where possible:

- `id` PK
- `schedule_date` **date**, `unique` (one entry per calendar date)
- `location_name`, `address` (varchar)
- `landmark_note` nullable
- `start_time`, `end_time` (time)
- `latitude`, `longitude` (decimal, nullable-or-required — decide policy)
- `map_pin_note`, `transit_note` nullable
- `is_event` bool, `event_name` nullable (nullable is schema-only; invariant enforced in model)
- `status` enum `['scheduled','cancelled']` default `scheduled`
- `created_at`, `updated_at`

### 1.2 Model — `LocationEntry`

- `App\Models\LocationEntry`, `$fillable`/`casts()` for date + times.
- **Model/domain invariants (DDD §4.1):**
  - Validate `start_time < end_time`.
  - Validate `event_name` required when `is_event = true`.
  - Expose a scoped/public query: "today's scheduled entry" = `schedule_date = today && status = scheduled`. Cancelled ⇒ treated as Rest Day (invariant #4).
- Keep a non-default `$table` if naming it `Location`; consider naming the model `LocationEntry` to match the DDD aggregate while `$table = 'locations'`.

### 1.3 Admin — Location CRUD (agreed UX)

> **UI library decision:** **PrimeVue v4** in the admin area only, using the **`Calendar` inline month view** (no other PrimeVue views). The **public site stays pure Tailwind — no PrimeVue.**

**Interaction — single `/admin/locations` page:**

- **Layout:** an inline **month calendar** + a persistent **inline form** that is **disabled/greyed by default**. The form only becomes editable when a date is selected on the calendar.
- **Calendar markers:** every date with an **active scheduled entry** is marked (event or routine). Distinguish routine stop vs. event visually (e.g. routine = solid marker; event = distinct accent/icon). **Blank = no active stop = holiday.** **Cancelled** entries shown dimmed/struck (history only).
- **Clicking a date:**
  - future/empty → form **enables**, `schedule_date` pre-filled, **add** mode;
  - future/today marked → form **enables + pre-fills**, **edit** mode;
  - **past date → read-only / not editable** (owner plans forward).
- **Save** → returns to the same calendar view; the clicked date now shows its marker.
- Marker cell rendering via PrimeVue `Calendar` `#date` slot; selected date drives `v-model` for the form.

**Controller/routes:**

- `LocationController` with index/create/store/edit/update, plus a **`cancel`** action (sets `status = cancelled`, preserves history — no hard delete, per DDD §4.1 lifecycle).
- A `LocationRequest` Form Request enforcing the invariants (duplicate `schedule_date`, time ordering, event-name rule).
- Pages under `resources/js/Pages/Admin/Locations/` — `Index.vue` (inline PrimeVue month calendar + disabled inline form) and the form fields handled on the same page. Filterable by status (scheduled/cancelled) for the owner's history view.
- Calendar edge cases (Sprint 4 handles polish): duplicate-date prevention, past-date read-only.

### 1.4 Public — data-driven `LocationSchedule.vue`

- Extract the §3 markup out of `Welcome.vue` into `LocationSchedule.vue` driven by a `location` prop.
- **Remove** the "Simulate Holiday / Closed" toggle (prototype-only). The future-date "Next Service" copy is kept but made **data-driven** — it now shows the nearest future scheduled entry (see PRD §7.3, now in scope).
- Two states from data:
  - **Scheduled today:** render exact copy `"[Day], [Month] [Date] — Today we'll be at [Location] ([landmark note]), from [start] to [end]"` + address, transit note, embedded map from lat/long, map pin caption.
  - **Rest day** (no scheduled entry): calm holiday message, no map/time, plus a **Next Service** note naming the next scheduled stop (hidden if none).

### 1.5 Controller wiring — public `/`

- In the `/` route (or a `PublicController`), query `LocationEntry` for today's scheduled entry and pass as an Inertia prop `todayLocation` (or `null`); also query the nearest future scheduled entry and pass it as `nextLocation` for the Rest Day "Next Service" note.
- **Outcome check:** owner adds a stop for today in admin → public Location section reflects it; remove it/cancel → holiday state.

---

## Sprint 2 — Menu Vertical Slice (Core Domain #2)

> Goal: Owner manages the menu; public menu + Hero popular item reflect it live.

### 2.1 Migration — `menu_items`

Columns per ERD:

- `id` PK, `name`, `slug` **unique**
- `description` text
- `price_yen` int (whole yen, positive)
- `image_url`, `image_alt_text`
- `spice_level` enum `['mild','medium','hot','tangy']`
- `category` enum — the two v1 values (confirm exact pair, e.g. `chili_dog`/`drink`)
- `badge_type` enum `['halal_standard','limited_batch','none']`
- `highlight_tag_1`, `highlight_tag_2` nullable
- `is_popular` bool (default false), `is_sold_out` bool (default false), `is_active` bool (default true)
- `display_order` int
- `created_at`, `updated_at`

### 2.2 Model — `MenuItem`

- `App\Models\MenuItem` with `$fillable`/`casts()`.
- **Domain invariants (DDD §4.2):**
  - `price_yen` positive whole number.
  - `slug` auto-generated & unique (with `Str::slug` uniqueness handling).
  - `category` in allowed set.
  - `is_active = false` excluded from **all** public queries (grid + Hero popular), precedence over `is_popular`.
  - `is_sold_out` independent of `is_active`.
  - Media: image + non-empty alt required for publishable items (validation, since v1 admin sets both).

### 2.3 Domain service — `MenuFeaturingService`

- `App\Services\MenuFeaturingService` with `feature(MenuItem $item)`:
  - Within a transaction: clear `is_popular` on the current holder, then set `is_popular = true` on the target.
  - **Admin "Feature this item" action must call this service**, never toggle `is_popular` directly (DDD §4.2).

### 2.4 Admin — Menu CRUD

- `MenuItemController` index/create/store/edit/update.
- `MenuItemRequest` (or `StoreMenuItemRequest`/`UpdateMenuItemRequest`) validating per invariants (price, category enum, alt text, sold-out/active toggles, display order, image upload or URL).
- File/image storage decision (local `storage` or S3) — keep simple; store optimized images, wire alt text.
- Pages under `resources/js/Pages/Admin/Menu/` — table index (with reorder, feature, sold-out, active controls) + create/edit form.
- **Feature action routes through `MenuFeaturingService`.**

### 2.5 Public — data-driven Menu & Hero

- Extract §4 markup into `MenuGallery.vue` rendering **`MenuCard.vue`** per item (`v-for`) from a `menuItems` prop (only `is_active = true`, ordered by `display_order`). Each card: image, name, price ¥, spice, description, 2 highlight tags, badge, sold-out overlay.
- Extract §2 Hero dynamic parts: Hero's popular item = the single `is_popular && is_active` item (from backend), reusing `MenuCard.vue` (or a hero variant). Hero's event pill = nearest upcoming `is_event` entry.
- **Outcome check:** owner adds/edits menu, toggles popular/sold-out/active in admin → public grid + Hero update.

---

## Sprint 3 — Static Content Sections (decomposition)

> Goal: All 8 public sections complete and content-accurate; `Welcome.vue` no longer monolithic.

### 3.1 Componentize the remaining static sections

- Split §2 (Hero, after dynamic parts extracted in 2.5), §5 → `AboutStory.vue`, §6 → `AllergenInfo.vue`, §7 → `Faq.vue` rendering **`FaqItem.vue`** (accordion, one-open-at-a-time state + ARIA).
- Optionally extract Nav (§1) → `Navigation.vue` and Footer (§8) → `Footer.vue` out of `PublicLayout.vue` for parity with the named-component structure (PRD §6.2/§11).
- Reassemble: `Welcome.vue` (or `Home.vue`) becomes a thin composition of the section components, receiving the data props from the controller.
- Move final static copy (About/Allergen/FAQ/footer text) into the components.
- **Outcome check:** page renders identically to the current prototype but is composed of the specified component tree.

---

## Sprint 4 — Polish, QA & Launch

> Goal: Launch-ready site.

### 4.1 Responsiveness & performance

- Mobile-first pass across all sections.
- Image optimization + lazy-loading for Menu gallery & Hero.
- Map iframe lazy-loading.

### 4.2 SEO & accessibility

- Page title / meta description / local keywords (e.g. "halal food truck Sapporo").
- Alt text audit, keyboard-navigable nav & accordion, accordion ARIA states.

### 4.3 Map provider key

- Replace hardcoded Google Maps embed with a configured map provider key (env/`config/services`), per NFR §9 / §10.

### 4.4 Edge-case QA

- Empty menu state, holiday state, sold-out items, long-text overflow, inactive popular item (never shows), duplicate/past calendar dates.

### 4.5 Admin UI QA

- Unbranded utility UI confirmation, form validation, calendar edge cases.

### 4.6 Feature tests

- `LocationEntryTest`: one-per-date, time ordering, event-name rule, cancelled = rest day, public query today-only.
- `MenuItemTest`: slug uniqueness, price rule, active-precedence, sold-out independence, `MenuFeaturingService` single-popular guarantee, admin feature flow.
- Regression: Breeze auth tests still pass.

### 4.7 Launch

- Production deployment, domain/hosting, map key, run `npm run build` + migrations + seeder.

---

## Suggested Execution Order & Dependencies

```mermaid
flowchart LR
    S0[Sprint 0: Foundation] --> S1[Sprint 1: Location slice]
    S1 --> S2[Sprint 2: Menu slice]
    S2 --> S3[Sprint 3: Static decomposition]
    S3 --> S4[Sprint 4: Polish + QA + launch]
```

- **Sprint 0 must land first** — it unlocks single-admin auth and the `/admin` boundary everything else hangs off.
- **Sprint 1 before Sprint 2** — Location is the highest-value, most time-sensitive feature (PRD rationale) and is fully independent of Menu.
- **Sprint 3 last among feature sprints** — static content carries no backend risk and can flex if time pressure hits (PRD rationale).
- **Sprint 4** is the only sprint that cannot begin meaningfully until 1–3 exist, because it QA's live data flows.

---

## Cross-Cutting Notes (apply every sprint)

- **DDD invariants live in models / domain services, not controllers** (DDD §6). Each slice ships its invariants with its migration.
- **Admin UI language mirrors the Ubiquitous Language** (DDD §2): labels/toggles = "Location Entry/Stop", "Rest Day", "Event", "Menu Item", "Popular", "Sold Out", "Active".
- **Keep the two core domains decoupled** — `LocationEntry` and `MenuItem` never reference each other; only the public presentation layer reads both (DDD §5).
- **`Welcome.vue` is the master template for the public page** (see the ⭐ note at the top of this plan). Every public-facing slice (Sprints 1–3) must preserve its layout and copy as the reference — extract into components without redesigning, and make only minor, review-approved changes. Never delete it or treat it as disposable scaffolding.
- **PrimeVue v4 is admin-only.** Use PrimeVue only inside the admin area, and only the `Calendar` **inline month view** for Locations (Sprint 1). The public site must remain **pure Tailwind with no PrimeVue**.
- Run `composer run dev` / `npm run build` and `artisan test` at the end of every sprint to confirm the vertical slice is green.
