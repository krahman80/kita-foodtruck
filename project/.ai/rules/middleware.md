---
paths:
  - 'app/Http/Middleware/**'
---

# Middleware

## Never set the locale cookie from JavaScript
Locale is persisted server-side by a `POST /locale` route (session + cookie) and read back by a `SetLocale` middleware. Do not set the locale cookie from JS: `EncryptCookies::decrypt()` catches `DecryptException` and replaces the value with `null` (see vendor/laravel/framework/src/Illuminate/Cookie/Middleware/EncryptCookies.php), so a plain JS-written cookie is silently ignored and the locale appears to never persist. If a JS-set cookie is ever genuinely needed, add the name to `EncryptCookies::except()`.
