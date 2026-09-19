---
paths:
    - "package.json"
    - "vite.config.js"
---

# Frontend tooling

## `npm run build` runs on the host, artisan runs in Docker

The `app` container has no `npm` on its PATH, so `docker compose exec app npm run build` fails with `exec: "npm": executable file not found in $PATH`. Dependencies are installed on the host (`node_modules/` sits alongside `package.json`), so build from the host:

```bash
cd project && npm run build
```

Only PHP and artisan go through `docker compose exec app php artisan ...`.

## Reload after every build

Inertia keeps serving the previous bundle until the browser page is fully reloaded, so verifying a change without reloading shows stale output and looks like the edit failed.
