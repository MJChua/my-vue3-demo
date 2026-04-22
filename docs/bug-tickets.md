# Bug Tickets

## BUG-001 - API request path duplicated `/api` prefix
- Status: Fixed (Pending merge to `devlop`)
- Branch: `bug_api-double-prefix`
- Reported symptom:
  - Browser error: `Uncaught (in promise) AxiosError: Request failed with status code 500`
  - Request URL looked like: `http://localhost:9911/api//api/class/rogue/skills/puncture`
- Root cause:
  - `src/api/diablo4.js` already prefixed URL with `/api/`
  - `src/utils/http/index.js` also prepended `/api/`
- Fix plan:
  - Keep prefix only in request wrapper
  - Normalize leading slash in request URL before join
  - Avoid rethrow in mounted async flow
  - Cleanup naming typo in home fetch function
- Validation:
  - `pnpm lint` passed
  - `pnpm build` passed (warnings only, no build error)
