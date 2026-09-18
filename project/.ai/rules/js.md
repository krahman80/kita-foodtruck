---
paths:
    - "resources/js/**"
---

# Js

## Japanese is the primary language; English is supplementary

Japanese is the main site language; English is additional and covers ONLY the public landing page (public registration is disabled, so every form in this app is staff-facing). Consequences:

- `resources/js/i18n.js` default locale is `ja`, not `en`. JA strings are the primary brand voice, so a missing JA key is a defect, not graceful EN fallback.
- Staff screens (admin, auth, profile) are JA-only and must not follow the public toggle. `AdminLayout.vue` has no language toggle.
- Database content (menu_items, locations) is authored in Japanese only. Never add locale columns or a translatable-content layer.
- The brand is always written `キタハラルチリドッグス`, in both languages, including the header wordmark in `PublicLayout.vue` (which is not locale-dependent).
  Full plan: .context/localization-plan.md
