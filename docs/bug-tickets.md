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
