# Kita Chili Dogs

A halal chili dog food truck site for Sapporo, Japan — a single public page plus a protected admin panel.

**Stack:** Laravel 12 · Vue 3 + Inertia v2 · Tailwind CSS v4 (Vite) · MySQL

## Public site

Welcome/hero, live location schedule (including rest-day and next-service states), menu, about story, allergen info, and FAQ. The page chrome text supports **EN ↔ 日本語** via a shared locale.

## Admin (`/admin`)

Owner-only management area:

- **Dashboard** — overview cards linking to each section.
- **Location calendar** — PrimeVue inline month view with markers, plus a Leaflet map picker for coordinates.
- **Menu manager** — two-column add/edit + card list, local image upload (client-side resize/compress), featured/hide/sold-out/active controls.
- **Accounts** — create/remove admin accounts (single role, no public registration).

## Auth

Login by email/password. A seeded admin account is created on first run (values from `config/admin.php` / environment). No public registration.

## Deployment

- **[`DEPLOYMENT.md`](./DEPLOYMENT.md)** — general shared-hosting (cPanel-style) guide.
- **[`HOSTINGER-DEPLOYMENT.md`](./HOSTINGER-DEPLOYMENT.md)** — Hostinger-specific (hPanel) guide.

Both cover: PHP 8.2+, pointing the document root at `public/`, production `.env`, Composer + Vite build, storage link, migrate/seed, and production caching (including `route:cache`, which is supported).

## Local development

The app runs in Docker (`docker-compose.yml` at the repo root; container named `app`, exposed on port `8020`). Front-end assets are built with Vite:

- `docker exec app php artisan migrate --seed`
- `npm install` then `npm run dev` (or `npm run build`)
- Tests: `docker exec app php artisan test`

## Key conventions

- `Welcome.vue` is the master template for the public page.
- PrimeVue is admin-only; the public site is pure Tailwind.
- Colors are tokenized in `resources/css/app.css` (`@theme`).
- Chrome text is translated via `resources/js/i18n.js` (shared locale, EN/日本語).

## License

Open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT).
