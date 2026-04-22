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

## 02 - Core Utility Direct Migration and Old File Cleanup
- Goal: migrate app usage directly to shared packages and remove replaced legacy utility files.
- Scope:
  - move resize usage to `@my-vue3/core` direct import
  - move appearance logic to shared core helper
  - move HTTP baseline to shared `@my-vue3/http` from app API layer
  - delete old utility files after migration (`src/utils/resizeScreen.js`, `src/utils/http/*`)
- Branch mapping:
  - Recommended feature branch label: `feature_02_core-cleanup`
