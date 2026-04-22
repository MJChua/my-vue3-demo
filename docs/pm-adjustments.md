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

## 02 - Bugfix: API URL Double Prefix and Home Request Stability
- Goal: fix duplicated API prefix causing request failure and remove unstable throw behavior in home API flow.
- Scope:
  - normalize API path joining to avoid `/api//api/...`
  - update home API path source and naming typo cleanup
  - avoid rethrow in mounted async flow to prevent `Uncaught (in promise)`
- Branch mapping:
  - Bug branch: `bug_api-double-prefix`

