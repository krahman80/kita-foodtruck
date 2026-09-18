---
paths:
  - 'bootstrap/**'
---

# Bootstrap

## Config is cached and PHP only exists in Docker
This project has a committed/cached config at `bootstrap/cache/config.php`, so any `.env` change (e.g. `APP_LOCALE`) will NOT take effect until `php artisan config:clear` is run. The `composer test` script already does this first for the same reason.
The app runs in Docker: there is no local PHP. Use `docker compose exec app php artisan ...` from the repository root (the app container maps to `project/`). `docker compose app bash` is not valid syntax.
