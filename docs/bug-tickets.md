# Bug Tickets

## BUG-001 - Demo API endpoint unavailable for home image rendering
- Status: Fixed (Pending merge to `devlop`)
- Branch: `bug_image-api-source`
- Reported symptom:
  - Request path was invalid and returned error.
  - Home page failed to display fetched network images as expected.
- Root cause:
  - API path used in home flow did not exist on target backend.
  - HTTP wrapper path join made path handling brittle.
- Fix:
  - switched demo source to free public API: `https://dog.ceo/api/breeds/image/random/{count}`
  - normalized request URL handling in HTTP wrapper
  - updated home page to render returned image list
- Validation:
  - `pnpm lint` passed
  - `pnpm build` passed (warnings only)
