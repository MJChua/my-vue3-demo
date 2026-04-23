# PM Adjustments Log

## 01 - Workspace and Shared Library Foundation
- Goal: standardize package management to `pnpm`, add workspace package structure, and prepare reusable shared modules.
- Scope:
  - `pnpm` only setup
  - `packages/core`, `packages/http`, `packages/ui` skeleton
  - compatibility migration for resize and request modules
  - documentation baseline for roadmap and reusable catalog
- Branch mapping:
  - Recommended feature branch label: `feature_01_workspace-library`

## 02 - Bugfix: Home API Source Replacement and Image Rendering
- Goal: replace invalid API path with a stable public API and ensure fetched images render on home page.
- Scope:
  - switch API source to public free endpoint (`dog.ceo`)
  - update home page to render image list returned from API
  - harden request URL handling to avoid malformed path combinations
  - rename API module from `diablo4.js` to `dogApi.js` (camelCase naming)
- Branch mapping:
  - Bug branch: `bug_image-api-source`

## 03 - Home UI and Appearance Control Relocation
- Goal: standardize home image card sizes and move global appearance switch from mine page to home header flow.
- Scope:
  - set image card size to `150x100` on mobile and `300x120` on desktop
  - enforce image corner radius `8px`
  - move appearance switch to header and show on home page
  - mobile header: `12px` gap between appearance switch and hamburger menu
  - desktop header: place appearance switch to the right of `Mine` nav item
  - remove old appearance popup entry from mine page
- Branch mapping:
  - Working branch: `bug_image-api-source`
