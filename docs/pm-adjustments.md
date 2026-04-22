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

## 02 - Bugfix: Replace Invalid Demo API With Public Image API
- Goal: ensure home page demonstrates real API fetch and image rendering with a stable public endpoint.
- Scope:
  - replace unavailable API path with free public API (`dog.ceo`)
  - fix URL assembly in HTTP wrapper to avoid duplicate prefix errors
  - update home page data flow to render image array from API response
- Branch mapping:
  - Bug branch: `bug_image-api-source`

## 02 - Bugfix: API URL Double Prefix and Home Request Stability
- Goal: fix duplicated API prefix causing request failure and remove unstable throw behavior in home API flow.
- Scope:
  - normalize API path joining to avoid `/api//api/...`
  - update home API path source and naming typo cleanup
  - avoid rethrow in mounted async flow to prevent `Uncaught (in promise)`
- Branch mapping:
  - Bug branch: `bug_api-double-prefix`

