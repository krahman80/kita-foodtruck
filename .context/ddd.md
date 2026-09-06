# Domain-Driven Design (DDD) Document

## Halal Chili Dog Food Truck — Web Application

**Status:** Draft v1
**Related docs:** `prd.md`, `database-structure.md`

---

## 1. Purpose

This document defines the domain model behind the application — the core concepts, their rules, and how they relate — independent of the Laravel/Inertia/Vue implementation. It complements the PRD (what to build) and the database structure doc (how data is stored) by capturing _why the rules are what they are_ and giving the team a shared vocabulary (ubiquitous language) to talk about the system without ambiguity.

Given the project's size (a two-context system maintained by a small team), this is a **lightweight, pragmatic application of DDD** — not a full hexagonal/CQRS architecture. The goal is clarity of language and invariants, not architectural ceremony.

---

## 2. Ubiquitous Language

Shared vocabulary to be used consistently in code, conversation, admin UI copy, and documentation — avoid synonyms that drift in meaning.

| Term                             | Definition                                                                                                                    |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Truck**                        | The single physical food truck this system represents. There is only ever one truck (not a multi-vendor platform).            |
| **Location Entry** (or **Stop**) | A single calendar-date record describing where the Truck will be, and during what time window. One per calendar date.         |
| **Schedule**                     | The full set of Location Entries across time — effectively the Truck's calendar.                                              |
| **Rest Day / Holiday**           | Any calendar date with **no** Location Entry. Not a distinct stored record — it's the _absence_ of an entry.                  |
| **Event**                        | A Location Entry flagged as tied to a named public event (e.g., a festival) rather than a routine spot.                       |
| **Menu**                         | The full set of Menu Items currently offered by the Truck.                                                                    |
| **Menu Item**                    | A single sellable food/drink product, with a name, price, description, and presentation metadata.                             |
| **Spice Level**                  | A qualitative attribute of a Menu Item (mild, medium, hot, tangy) — informs the customer, not a pricing or inventory concern. |
| **Badge**                        | A visual trust/urgency marker on a Menu Item (standard halal badge, or limited-batch badge).                                  |
| **Popular Item**                 | The Menu Item currently promoted in the Hero section. A presentation flag, not a computed/analytics-derived value.            |
| **Sold Out**                     | A Menu Item temporarily unavailable but still displayed (distinct from being removed/deactivated).                            |
| **Active / Inactive**            | Whether a Menu Item is displayed publicly at all. Inactive = soft-removed.                                                    |
| **Owner / Admin**                | The single person operating the Truck and managing the system. Not a multi-tenant or multi-role concept in v1.                |

---

## 3. Domain Overview & Subdomain Classification

| Subdomain                                                   | Type                     | Why                                                                                                                                                                                          |
| ----------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Location Scheduling**                                     | **Core Domain**          | The single highest-value capability — customers primarily visit to answer "where is the truck today?" This is the differentiator that makes the app worth having over a static page.         |
| **Menu Management**                                         | **Core Domain**          | Second core capability — what customers can buy and at what price. Directly drives the business's revenue-facing content.                                                                    |
| **Site Content** (About, Allergen, FAQ, Footer, Navigation) | **Supporting Subdomain** | Necessary for trust and completeness, but static and low-complexity. No business rules or state — just presentation content. Not modeled as a rich domain; treated as content, not behavior. |
| **Identity & Access** (Admin login)                         | **Generic Subdomain**    | Solved entirely by Laravel Breeze's off-the-shelf session auth. No custom domain logic — single admin account, no roles/permissions model needed.                                            |

Only **Location Scheduling** and **Menu Management** warrant real domain modeling (aggregates, invariants, events). The rest of the system is either static content or a generic, already-solved concern.

---

## 4. Bounded Contexts

### 4.1 Location Scheduling Context

**Responsibility:** Owns the Truck's daily whereabouts. Answers "where and when is the truck today?" for the public site, and lets the Owner manage that calendar.

#### Aggregate Root: `LocationEntry`

The aggregate boundary is the single calendar date — each `LocationEntry` is self-contained and independent of every other entry (no cross-entry rules like "can't be at two places the same week"), which keeps the aggregate small and simple.

**Identity:** `schedule_date` (natural key — one entry per date; no synthetic date range needed)

**Attributes (Value Objects within the aggregate):**

| Value Object   | Composed of                                 | Notes                                                                  |
| -------------- | ------------------------------------------- | ---------------------------------------------------------------------- |
| `TimeWindow`   | `start_time`, `end_time`                    | Invariant: `start_time` must be before `end_time`                      |
| `Coordinates`  | `latitude`, `longitude`                     | Used to render the map; not independently meaningful without the entry |
| `Address`      | `location_name`, `address`, `landmark_note` | Human-readable description of the stop                                 |
| `EventDetails` | `is_event` (bool), `event_name` (nullable)  | Invariant: if `is_event` is true, `event_name` must be present         |
| `TransitNote`  | free text                                   | Optional supporting info, not core to the aggregate's identity         |

**Domain Invariants (Business Rules):**

1. Exactly **one** `LocationEntry` may exist per `schedule_date` (enforced at the aggregate/persistence boundary — this _is_ the calendar).
2. A `LocationEntry`'s `TimeWindow` must have `start_time < end_time`.
3. If `EventDetails.is_event = true`, `event_name` is required (an event without a name is not meaningful to a customer).
4. A date with **no** `LocationEntry`, or whose entry has `status = cancelled`, is a **Rest Day** on the public site. The public query is therefore "does today have a `LocationEntry` with `status = scheduled`?" — not merely "does an entry exist?" This distinction matters: a cancelled stop must never appear as if it were live.
5. The public page's _primary_ status is always scoped to **today's date** — it answers only "does today have a scheduled entry?" (binary scheduled vs. Rest Day). However, on a **Rest Day** the public Location section may additionally show a single **Next Service** lookahead: the nearest future entry with `status = scheduled` (`schedule_date > today`). No other future/past dates are surfaced. (Added by product decision after the v1 draft — see PRD §7.3 / §11.)

#### Location Entry Status Lifecycle

| Status      | Meaning                                                                                                                                                                                                                  | Public Visibility                                        |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| `scheduled` | Default state — an active, planned stop                                                                                                                                                                                  | Shown as today's location if `schedule_date = today`     |
| `cancelled` | The stop was planned but later called off (e.g., weather, mechanical issue). Kept as a record rather than deleted, preserving history and letting the Owner spot patterns (e.g., a venue that repeatedly falls through). | Never shown publicly — treated identically to a Rest Day |

**Allowed transitions:** `scheduled → cancelled` (Owner cancels a planned stop) and `cancelled → scheduled` (Owner reactivates, e.g., re-booking the same date/spot). No other statuses are modeled — there is no separate "completed" state, since a past `scheduled` entry simply becomes historical once its date has passed; no transition or flag is needed to mark that.

**Admin UI implication:** Cancelled entries remain visible to the Owner in `/admin/locations`, filterable by status, for reference and history. They are never surfaced anywhere on the public site.

**Domain Events (conceptual — useful for reasoning about behavior, not necessarily implemented as a literal event bus given the project's size):**

- `LocationScheduled` — a new entry is added for a future or current date
- `LocationRescheduled` — an existing entry's details are edited
- `LocationCancelled` — an entry's `status` is set to `cancelled` rather than deleted, preserving history

**Repository responsibility:** Given "today," return the single matching `LocationEntry` or nothing (Rest Day). Given a Rest Day, return the nearest future scheduled entry (`status = scheduled`, `schedule_date > today`) to power the "Next Service" note. Given an event lookup, return the nearest upcoming entry where `is_event = true` (used only by the Hero's event pill, not the Location section itself).

---

### 4.2 Menu Management Context

**Responsibility:** Owns what the Truck sells. Answers "what can I order, and how much does it cost?" for the public site, and lets the Owner manage the catalog.

#### Aggregate Root: `MenuItem`

Each `MenuItem` is independently manageable — there's no parent "Menu" aggregate enforcing cross-item rules (e.g., no "only 6 items allowed"), so the aggregate boundary is the individual item itself.

**Identity:** `id` (surrogate key), with `slug` as a stable human-readable reference

**Attributes (Value Objects within the aggregate):**

| Value Object    | Composed of                                 | Notes                                                                       |
| --------------- | ------------------------------------------- | --------------------------------------------------------------------------- |
| `Price`         | `price_yen` (integer)                       | Whole yen only — no decimal/fractional currency in JPY                      |
| `SpiceLevel`    | enum: mild / medium / hot / tangy           | Presentation-only; no business logic depends on it                          |
| `Category`      | enum, two values for v1                     | Scoped per confirmed decision; used for potential future grouping/filtering |
| `Badge`         | enum: halal_standard / limited_batch / none | Drives visual urgency/trust signaling                                       |
| `HighlightTags` | up to two short strings                     | Presentation callouts (e.g., ingredient highlights)                         |
| `Media`         | `image_url`, `image_alt_text`               | Required together — no image without accessible alt text                    |

**Status Flags (mutable state on the aggregate):**

- `is_popular` — manually toggled by the Owner; drives Hero section selection
- `is_sold_out` — manually toggled; item remains visible but marked unavailable
- `is_active` — manually toggled; controls public visibility entirely (soft-delete semantic)
- `display_order` — manually set; controls grid ordering

**Domain Invariants (Business Rules):**

1. `Price.price_yen` must be a positive whole number.
2. `Category` must be one of the two v1-approved values. A `Category` may contain any number of `MenuItem`s (one-to-many); each `MenuItem` belongs to exactly one `Category`.
3. `Media` requires both an image and non-empty alt text — a `MenuItem` cannot be considered complete/publishable without both.
4. An `is_active = false` item is entirely excluded from all public queries (Menu grid _and_ Hero's popular-item lookup), even if `is_popular = true` — active status always takes precedence.
5. `is_sold_out` and `is_active` are independent — a sold-out item can still be `is_active = true` (visible but unavailable), whereas `is_active = false` always means fully hidden regardless of any other flag.
6. **`is_popular` is constrained to exactly one `MenuItem` at a time.** Featuring a new item automatically un-features whichever item currently holds the flag. Because this rule spans multiple `MenuItem` aggregates rather than living inside a single one, it cannot be enforced purely by a single aggregate's own invariants — it requires a **domain service** (see below).

#### Featuring Service (Domain Service)

Since "exactly one popular item" is a constraint _across_ aggregates, not within one, it's modeled as a small domain service rather than aggregate logic:

> **`MenuFeaturingService.feature(menuItem)`** — within a single transaction: clears `is_popular` on whichever `MenuItem` currently has it set, then sets `is_popular = true` on the target item.

This keeps each `MenuItem` aggregate simple (it doesn't need to know about its siblings) while still guaranteeing the business rule holds. The admin "Feature this item" action in `/admin/menu` should always go through this service rather than toggling the flag directly on the model.

**Domain Events (conceptual):**

- `MenuItemPublished` — item created/activated
- `MenuItemMarkedSoldOut` / `MenuItemRestocked`
- `MenuItemDeactivated`
- `MenuItemFeatured` — `is_popular` toggled on

**Repository responsibility:** Return all `is_active = true` items ordered by `display_order` for the Menu grid; return the single `is_popular = true`, `is_active = true` item for the Hero (uniqueness guaranteed by the Featuring Service, so no tie-breaking logic is needed at query time).

---

### 4.3 Site Content ("Context" in name only)

Not a real bounded context in the DDD sense — no aggregates, no invariants, no state transitions. Covers Navigation, Hero's static copy, About/Story, Allergen & Dietary Info, FAQ, and Footer. Modeled as plain content (Vue components with hardcoded copy), not domain objects. Included here only to make the boundary explicit: **nothing here should ever grow a database table without first asking whether it now has behavior/rules that justify promoting it into a real subdomain.**

### 4.4 Identity & Access (Generic Subdomain)

Fully delegated to Laravel Breeze's built-in session authentication. Single admin account, no roles, no permissions matrix, no custom domain logic. Deliberately **not** modeled further — building custom identity logic here would be solving an already-solved problem for no business benefit.

---

## 5. Context Map

```
┌───────────────────────────┐        ┌───────────────────────────┐
│  Location Scheduling       │        │  Menu Management           │
│  (Core Domain)              │        │  (Core Domain)              │
│                             │        │                             │
│  Aggregate: LocationEntry  │        │  Aggregate: MenuItem        │
└──────────────┬──────────────┘        └──────────────┬──────────────┘
               │                                        │
               │   Both read independently by:          │
               ▼                                        ▼
        ┌─────────────────────────────────────────────────────┐
        │            Public Site (Presentation Layer)          │
        │   Hero.vue reads: latest Event (Location) +          │
        │                   Popular Item (Menu)                │
        │   LocationSchedule.vue reads: today's LocationEntry  │
        │   MenuGallery.vue reads: all active MenuItems        │
        └─────────────────────────────────────────────────────┘
               ▲                                        ▲
               │                                        │
┌──────────────┴──────────────┐        ┌───────────────┴──────────────┐
│  Site Content                │        │  Identity & Access            │
│  (Supporting — no state)     │        │  (Generic — Breeze, off-shelf)│
└───────────────────────────────┘        └───────────────────────────────┘
```

**Relationship type between the two Core Domains:** No direct coupling — `LocationEntry` and `MenuItem` never reference each other. Their only relationship is that the **Hero** (a presentation concern, not a domain one) reads from both independently to compose a single view. This is intentional: keeping the two core domains fully decoupled means either can change its rules without rippling into the other.

---

## 6. Why This Matters for Implementation

Even though this maps closely onto two Eloquent models (`Location`, `MenuItem`), the value of stating it this way is:

- **Invariants belong in the domain, not scattered across controllers.** E.g., "one entry per date," "event requires event_name," "inactive always wins over popular" should be enforced in the model layer (or a small domain service), not re-implemented ad hoc in every admin form or query.
- **The Owner-facing admin UI should speak this language.** Field labels, validation messages, and toggle names in `/admin/locations` and `/admin/menu` should mirror the Ubiquitous Language table (Section 2) so there's no translation gap between "what the business calls it" and "what the UI says."
- **Future features slot in cleanly.** If a "Catering Request" or "Seasonal Menu" concept is ever added, this document makes it obvious which existing bounded context (if any) it belongs to, or whether it's a new one.

---

## 7. Decisions (Previously Open, Now Resolved)

- **`is_popular` uniqueness:** Constrained to exactly one `MenuItem` at a time, enforced via the `MenuFeaturingService` domain service (Section 4.2). Resolves the earlier ambiguity in the schema/PRD, which allowed multiple flagged items.
- **`LocationEntry` cancelled status:** Elaborated in Section 4.1's Status Lifecycle table. Cancelled entries remain visible to the Owner in `/admin/locations` (filterable), are never shown publicly, and are treated identically to a Rest Day by the public query.
- **Category cardinality:** Confirmed as one-to-many — a single `Category` can contain any number of `MenuItem`s; each `MenuItem` still belongs to exactly one `Category`. No change to the existing model was needed; this simply confirms the intended relationship direction.
