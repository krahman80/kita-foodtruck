# Deployment Guide — Kita Chili Dogs (Shared Hosting)

**App:** Laravel 12 (PHP ^8.2) · Vue 3 + Inertia v2 · Tailwind v4 via Vite · MySQL
**Dev setup note:** The app was developed inside Docker. **Shared hosting has no Docker** — these steps run the app directly on the host's Apache/PHP and pre-build the front-end assets.

> The Laravel app lives in the **`project/`** subfolder of this repo. The repo root also contains `docker-compose.yml` / `docker/` — **only the contents of `project/` are deployed.**

---

## Preflight — confirm the host supports this

- **PHP 8.2–8.4** selectable (cPanel → MultiPHP Manager). `composer.json` requires `php: ^8.2`.
- **MySQL** database — create a DB + user on the host.
- **SSH/terminal** (preferred) so you can run `composer` and `artisan`. If your plan has no SSH, use the "build locally, upload everything" flow (Model B, Step 4).
- **Node.js** on the host is only needed if you build assets there; otherwise build locally and upload `public/build`.

---

## Step 1 — Upload the app

Only the **contents of `project/`** are needed. Upload them to a folder on the host, e.g. `/home/<user>/public_html/kita/`.

**Exclude** (regenerate on the host):

- `vendor/`
- `node_modules/`
- `.env` (create a fresh production one)
- `storage/framework/{cache,sessions,testing,views}/*`, `storage/logs/*`
- Optional: `public/build` (see Step 4)

**Keep:** `app/`, `bootstrap/`, `config/`, `database/`, `public/`, `resources/`, `routes/`, `artisan`, `composer.json`, `package.json`, `vite.config.js`.

---

## Step 2 — Point the document root at Laravel's `public/`

The web-accessible directory must be the Laravel **`public`** folder (contains `index.php` + built assets).

- cPanel: **Domains → Manage → Document Root** → set to `<your-app>/public`, e.g. `/home/user/public_html/kita/public`.
- If the host forces the doc root to `public_html`, set the subfolder override as above, or keep the code outside `public_html` (e.g. `/home/user/kita`) and point the domain there.

> Everything (Vite assets, `/storage`, `robots.txt`) is served from `public/`. Pointing the doc root at the app root would expose `.env` — **never** do that.

---

## Step 3 — Create the production `.env`

Copy `.env.example` → `.env` and set:

```ini
APP_NAME="Kita Chili Dogs"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.example
APP_TIMEZONE=Asia/Tokyo

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_host_db
DB_USERNAME=your_host_user
DB_PASSWORD=your_host_password

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database

MAIL_MAILER=smtp
MAIL_HOST=...
MAIL_PORT=...
MAIL_USERNAME=...
MAIL_PASSWORD=...
MAIL_FROM_ADDRESS=hello@your-domain.example
MAIL_FROM_NAME="Kita Chili Dogs"
```

- Local DB creds were `homestead` (Docker); the host creds will differ.
- `APP_KEY` is generated in Step 6.

---

## Step 4 — Install dependencies & build assets

```bash
cd /home/<user>/public_html/kita

# PHP deps
composer install --no-dev --prefer-dist --optimize-autoloader

# Front-end assets — build ON the host:
npm ci
npm run build
```

**No Node on the host (Model B)?** Build locally first (`npm run build` inside `project/`), then upload the generated **`public/build`** folder and skip the `npm` commands above. **Never** ship `npm run dev` output.

---

## Step 5 — Permissions & storage link

```bash
chmod -R 775 storage bootstrap/cache
# ensure the web user owns/can write:
#   chown -R user:group storage bootstrap/cache
php artisan storage:link     # public/storage -> storage/app/public
```

`storage/app/public/menu` must be writable — **menu images live there**. Upload any existing files in that folder, or re-upload them via the admin after deploy. The static `public/images/hero` and `public/images/about` images are committed, so they upload with the code.

---

## Step 6 — Key, migrate & seed the admin

```bash
php artisan key:generate
php artisan migrate --force
php artisan db:seed --force     # creates the bootstrap admin from config/admin.php
```

---

## Step 6.1 — First-run admin credentials

There is **no public registration** — the only way to get your first login is the **seeded admin** created by `db:seed`. Its credentials come from `config/admin.php`, which is **environment-driven**: set them in `.env` **before** seeding so you don't use the committed defaults in production.

Add to your `.env` (override the defaults):

```ini
ADMIN_NAME=Your Name
ADMIN_EMAIL=you@your-domain.example
ADMIN_PASSWORD=a-strong-unique-password
```

- **Defaults** (only if you don't override):
    - Email: `admin@kitachilidogs.jp`
    - Password: `password`
- After seeding, log in at `/login` and **change the password immediately**.
- To re-seed/rotate the password later, update `ADMIN_PASSWORD` in `.env`, clear config, and re-run `php artisan db:seed --force` (it `updateOrCreate`s by email).

---

## Step 7 — Production caching

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

> ✅ `route:cache` is supported — the `/` and `/dashboard` routes were refactored from Closures into `PublicController` methods (2026-09-08), so route caching serializes cleanly.
> Remember to run `php artisan route:clear` (and `config:clear`) after any route/config change.

---

## Step 8 — Go live & verify

1. Open `https://your-domain.example` — the public page loads with the built CSS/JS.
2. Log in at `/login` with the seeded admin (see **Step 6.1**); **change the password immediately**.
3. Confirm `/admin` menu images and the Leaflet map picker work.
4. If assets 404: check the document root and that `public/build` (from `npm run build`) is present; confirm `APP_URL` uses `https` (no mixed content).

---

## Common shared-hosting gotchas

- **PHP too low** → select 8.2+ in MultiPHP.
- **Blank screen** → `APP_DEBUG=false` hides errors; temporarily set `APP_DEBUG=true`, then revert.
- **Storage not writable / broken images** → fix `storage` perms + run `storage:link`.
- **Vite assets 404** → missing `public/build` or wrong document root.
- **Password reset email** → must configure working SMTP on the host.
- **Composer not on host** → use SSH/terminal; if truly unavailable, install locally and upload `vendor/` too (Model B).

---

## Production-readiness follow-ups (optional)

- ✅ Closure→controller refactor for `/` and `/dashboard` is **done** (`PublicController`); `route:cache` works.
- Confirm the **bootstrap admin password** is overridden via environment, not the committed default.
- Set up a regular **backup** of the database and `storage/app/public`.
