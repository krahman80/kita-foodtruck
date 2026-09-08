# Hostinger Deployment — Kita Chili Dogs

**Host:** Hostinger **shared hosting** (hPanel — not cPanel)
**App:** Laravel 12 (PHP ^8.2) · Vue 3 + Inertia v2 (Vite) · MySQL
**Account file layout on Hostinger:** each domain's web files live under `~/domains/<your-domain>/public_html`.

> This is the Hostinger-specific companion to the generic [`DEPLOYMENT.md`](./DEPLOYMENT.md). Use this one when your account is on Hostinger shared hosting.

---

## 0. Deploying to a subdomain (recommended)

Deploying under a **subdomain** (e.g. `app.your-domain.example` or `kita.example.com`) keeps the app separate from your main site and is the simplest way to run a Laravel `public` root on Hostinger.

**Create the subdomain**

- hPanel → **Websites → Subdomains** (or **Domains → Subdomains**) → add, e.g. host `app` on your domain → `app.your-domain.example`.
- Hostinger gives the subdomain its **own web root**, usually a folder under the main domain, e.g. `~/domains/<your-domain>/public_html/app`. (Record this path.)

**Upload + serve Laravel's `public`**

- Upload the app's files into that subdomain folder (e.g. `.../public_html/app`), as in Step 2.
- Make the subdomain serve the Laravel **`public`** subfolder:
    - **If Hostinger lets you set the subdomain's document root:** set it to `<sub>/public` (e.g. `app/public`). Then it behaves exactly like the main-domain Option A below.
    - **If not:** place the app so `public` is the served folder. Simplest robust trick: put the Laravel **contents** such that the subdomain's web root _is_ the Laravel `public` — i.e. upload everything, then move the app's `public/*` files up to the subdomain root and add a small `../bootstrap`/`index.php` path fix. **Prefer the document-root method** if available; the rewrite `.htaccess` in Section 3 (Option B) also works for subdomains (adjust the folder to the subdomain path).

**`.env` for the subdomain**

```ini
APP_ENV=production
APP_URL=https://app.your-domain.example
```

**SSL**

- Ensure an SSL certificate covers the subdomain (Hostinger auto-SSL usually covers `*.your-domain.example` and new subdomains; otherwise install one in hPanel). Without it, Inertia/session/asset URLs will be insecure or mixed-content.

> Everything else below applies unchanged — just replace `<your-domain>` paths with the subdomain's folder, and use the subdomain in `APP_URL` and the login URL.

---

## 1. Preflight on your Hostinger account

1. **Domain / DNS:** make sure the domain resolves to Hostinger (nameservers or A record). If deploying on a subdomain, create it first (see §0) and confirm the subdomain resolves. You'll deploy to the main domain (or a subdomain like `kita.yourdomain.com`).
2. **PHP version:** in hPanel go to **Websites → your site → PHP Configuration** and select **PHP 8.2, 8.3, or 8.4** (Laravel 12 needs `^8.2`). Enable these extensions if shown/needed: `curl`, `mbstring`, `openssl`, `pdo_mysql`, `tokenizer`, `xml`, `ctype`, `fileinfo`, `zip`, `gd`, `bcmath`, `dom`.
3. **Database:** hPanel → **Databases → MySQL** → create a database **and a database user**, and grant the user access. Note the DB name, user, host (`127.0.0.1` or `localhost`), and password.
4. **SSH/Terminal (recommended):** enable **SSH access** (hPanel → Advanced → SSH Access) so you can run `composer` and `artisan`. If your plan has no SSH, use the "build locally + upload everything" path (see Step 5 note).
5. **Upload tool:** use **File Manager** (hPanel → Websites → File Manager) for small moves, or **FileZilla (SFTP)** for the bulk upload. SFTP is strongly preferred for the many project files.

---

## 2. Upload the application

Only the **contents of the `project/` folder** are deployed (the repo root's `docker-compose.yml` / `docker/` are for local dev only).

Create a folder for the app, e.g. `~/domains/<your-domain>/public_html/kita`, and upload the project files there (SFTP/FileZilla is fastest).

**Exclude** (regenerate on the host):

- `vendor/`
- `node_modules/`
- `.env` (make a fresh production one)
- `storage/framework/{cache,sessions,testing,views}/*`, `storage/logs/*`
- Optional: `public/build` (see Step 5)

**Keep:** `app/`, `bootstrap/`, `config/`, `database/`, `public/`, `resources/`, `routes/`, `artisan`, `composer.json`, `package.json`, `vite.config.js`.

---

## 3. Point the site at the Laravel `public/` folder

The web root must be the Laravel **`public`** directory (it contains `index.php` + the built assets). You have two options on Hostinger:

### Option A — Custom document root (cleanest)

In hPanel → **Websites → your site → (Manage) → Settings / Domain**, set the site's **document root / site folder** to the `public` folder, e.g.:

```
kita/public        (relative to public_html)
```

So requests are served from `.../public_html/kita/public`. If your Hostinger plan exposes this setting for the domain, use it. (On a subdomain this would be `<sub>/public`, e.g. `app/public`.)

### Option B — `.htaccess` at the public_html root (if no doc-root option)

Put a small `.htaccess` in `public_html` that serves the app:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*)$ kita/public/$1 [L]
</IfModule>
```

> ⚠️ Never point the site at the app root (the folder containing `.env`) — that exposes your secrets and breaks asset paths.

---

## 4. Create the production `.env`

In the app folder (`.../public_html/kita`), copy `.env.example` to `.env` (File Manager → rename/copy) and edit:

```ini
APP_NAME="Kita Chili Dogs"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://app.your-domain.example   # use your subdomain, e.g. https://kita.yourdomain.com

APP_TIMEZONE=Asia/Tokyo

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=uXXXXXX_yourdb
DB_USERNAME=uXXXXXX_dbuser
DB_PASSWORD=your_password

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database

MAIL_MAILER=smtp
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=465
MAIL_USERNAME=your_email@your-domain.example
MAIL_PASSWORD=your_email_password
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS=your_email@your-domain.example
MAIL_FROM_NAME="Kita Chili Dogs"
```

- Hostinger MySQL hosts are usually `127.0.0.1`. Hostinger **SMTP** host is `smtp.hostinger.com` (SSL on 465) if you use a Hostinger mailbox.
- `APP_KEY` is generated in Step 6.

---

## 5. Install dependencies & build assets

Via **SSH/Terminal**, from the app folder:

```bash
cd ~/domains/<your-domain>/public_html/kita

composer install --no-dev --prefer-dist --optimize-autoloader

# If you want to build on the host and Node is available:
npm ci
npm run build
```

**No SSH / no Node (File Manager only)?**

- Install dependencies on your local machine (`composer install --no-dev` and `npm run build` inside `project/`).
- Upload the generated **`vendor/`** and **`public/build`** folders too.
- Never upload `npm run dev` output.

---

## 6. Permissions (Hostinger defaults: files 644, folders 755)

Laravel needs to **write** to `storage` and `bootstrap/cache`:

- In **File Manager**, right-click the app folder → **Permissions** (recursive):
    - `storage` → **775** (and make recursive)
    - `bootstrap/cache` → **775**
    - Everything else can stay at Hostinger defaults (files 644 / folders 755).
- If you have SSH:
    ```bash
    chmod -R 775 storage bootstrap/cache
    ```
- If things get mis-set, use hPanel's **Fix Files Ownership** tool, then re-apply the `775` above.

**Storage link** (so uploaded menu images are public):

```bash
php artisan storage:link
```

> The symlink must survive. If SFTP uploads later overwrite the `public/storage` link, re-run this. Upload your existing menu images to `storage/app/public/menu`, or re-upload them via the admin after deploy.

---

## 7. Key, migrate & seed

Via SSH/Terminal from the app folder:

```bash
php artisan key:generate
php artisan migrate --force
php artisan db:seed --force     # creates the bootstrap admin from config/admin.php
```

---

## 7.1 — First-run admin credentials

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
- To re-seed/rotate the password later: update `ADMIN_PASSWORD` in `.env`, run `php artisan config:clear`, then re-run `php artisan db:seed --force` (it `updateOrCreate`s by email).

---

## 8. Production caching

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

- ✅ `route:cache` is supported (the `/` and `/dashboard` routes use `PublicController`, not Closures).
- After any `.env`/route change: `php artisan config:clear` and `php artisan route:clear`.

---

## 9. Go live & verify

1. Open `https://your-domain.example` — the public page should load with built CSS/JS.
2. Log in at `/login` with the seeded admin (see **§7.1**); **change the password immediately**.
3. Confirm `/admin` menu images and the Leaflet map picker work.
4. Asset 404? → confirm the document root is the Laravel `public`, and `public/build` (from `npm run build`) exists. Confirm `APP_URL` is `https` (no mixed content).

---

## Hostinger gotchas

- **Panel is hPanel**, not cPanel — options are under **Websites** (site settings, File Manager, PHP Configuration, Databases → MySQL).
- **PHP too old** → set 8.2+ in **PHP Configuration** and pick it for the domain.
- **Blank screen** → temporarily set `APP_DEBUG=true`, reload, note the error, then set it back to `false`.
- **Login redirects / assets 404** → wrong document root or `APP_URL` mismatch (must match the exact domain, with `https`).
- **MySQL "access denied"** → confirm the DB user is attached to the DB and `DB_HOST` is `127.0.0.1`.
- **Broken menu images** → `storage` perms (775) + `storage:link`.
- **No SSH** → you can't run `composer`/`artisan` remotely. Install dependencies locally and upload `vendor/`; for migrations/seed, either ask Hostinger support to enable SSH, or temporarily set `APP_DEBUG`/run via a short-lived protected helper script and delete it immediately after.
- **Email** → use Hostinger SMTP (`smtp.hostinger.com`) or a third-party SMTP for password resets.

---

## Production-readiness follow-ups

- ✅ Closure→controller refactor for `/` and `/dashboard` is done (`PublicController`); `route:cache` works.
- Confirm the **bootstrap admin password** is overridden via environment, not the committed default.
- Set up a regular **backup** of the database and `storage/app/public` (hPanel has a backup tool / you can schedule via cron if available).
