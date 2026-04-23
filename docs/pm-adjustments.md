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

