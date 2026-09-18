---
paths:
  - 'lang/**'
---

# Lang

## Japanese messages: no space after placeholders
Japanese message files must not put a space after a placeholder. Japanese does not use a space before a particle, and all entries in `lang/ja/validation.php` `attributes` are Japanese, so `:attributeは必須です。` is correct and `:attribute は必須です。` renders as `場所名 は必須です。` — a visible typography defect in the primary language.
Also: `lang/ja.json` localises the framework's notification mails (ResetPassword, VerifyEmail) because they call `Lang::get()` with the English sentence as the key. No class override is needed. Default mail greeting/salutation keys are `Hello!` and `Regards,`.
