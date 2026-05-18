# Bug Tickets

## BUG-001 - Home page API endpoint invalid and cannot render remote images
- Status: Fixed (Pending merge to `devlop`)
- Branch: `bug_image-api-source`
- Reported symptom:
  - API URL was unavailable, resulting in failed requests.
  - Home page did not display network-fetched images.
- Root cause:
  - endpoint path was tied to unavailable source API.
  - home page expected incompatible response field shape.
- Fix:
  - replaced source with public free API: `https://dog.ceo/api/breeds/image/random/{count}`
  - updated home flow to consume array responses and render image cards
  - adjusted HTTP request wrapper to pass URL directly
  - renamed API module to `dogApi.js` to match naming convention and domain meaning
- Validation:
  - `pnpm lint` passed
  - `pnpm build` passed (warnings only)

## BUG-002 - Desktop footer throws i18n linked-format compile error
- Status: Fixed (Pending merge to `devlop`)
- Branch: `bug_i18n-linked-format`
- Reported symptom:
  - Desktop page logs `Message compilation error: Invalid linked format`.
  - Error points to `@2026 Demo` in footer locale text.
- Root cause:
  - In `vue-i18n`, `@` is reserved for linked-message syntax.
  - Raw text starting with `@` is parsed as an invalid linked format.
- Fix:
  - replaced footer copyright text from `@2026 Demo` to `© 2026 Demo`
  - updated both locale packs: `en` and `zh-TW`
- Validation:
  - `pnpm pre:pr:quick` passed
