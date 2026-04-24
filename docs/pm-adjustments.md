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

## 04 - Test Foundation (Unit + E2E + Mock + CI)
- Goal: establish automated test baseline for quality gates in `devlop` integration flow.
- Scope:
  - add unit test stack: `Vitest + Vue Test Utils`
  - add API mock stack: `MSW`
  - add browser E2E stack: `Playwright`
  - add CI workflow: run lint, unit, and e2e smoke on pull request
- Branch mapping:
  - Feature branch: `feature_04_test-foundation`

## 05 - Global i18n and Right-Side Control Optimization
- Goal: launch bilingual baseline (Traditional Chinese + English) and standardize utility controls for business-ready header UX.
- Scope:
  - add global i18n setup with locale persistence (`zh-TW` / `en`)
  - migrate header, home, footer, mine, about, service, and project pages to translation keys
  - keep global theme switch unified on header right side across pages
  - add language toggle next to theme switch with compact desktop/mobile sizes (mobile smaller)
  - remove deprecated standalone switch component to avoid duplicate behavior
- Branch mapping:
  - Feature branch: `feature_05_i18n-theme-controls`

## 06 - i18n Locale-Pack Rule and Theme Contrast Hotfix
- Goal: prevent i18n growth risk and fix language toggle readability after theme switch.
- Scope:
  - define team rule: do not place locale `messages` inline in `src/i18n/index.js`
  - store each locale in independent files under `src/i18n/messages/`
  - use locale-pack loading layer (`localePackDb`, LaceDB-style packing) for on-demand loading and smaller initial bundle size
  - improve header language toggle contrast in light/dark themes with dedicated control color tokens
- Branch mapping:
  - Feature branch: `feature_05_i18n-theme-controls`

## 07 - LaceDB Read-Only Model and Home Core Experience Upgrade
- Goal: finalize read-only data architecture for pet content and deliver home-page conversion flow.
- Scope:
  - define LaceDB schema for read-only pet browsing with future `User -> Pets (1:N)` relation fields reserved
  - implement hero section with optimized WebP pet visual
  - implement masonry pet wall with smooth scrolling behavior and image-failure placeholders
  - implement category filters (`cat`, `dog`, `exotic`) for efficient discovery
  - keep API-driven remote image loading and friendly load-failure feedback
- Branch mapping:
  - Feature branch: `feature_07_lacedb-home-pet-wall`

## 08 - Vite Migration and Immersive Home Experience
- Goal: migrate build system to Vite and redesign home as a commercial-grade pet content entry page.
- Scope:
  - replace Vue CLI runtime/build config with Vite config and scripts
  - keep existing pnpm + test workflow compatible after migration
  - upgrade hero to high-impact visual section (video/slider-ready structure + CTA)
  - add Daily Star spotlight card with route-ready interaction
  - add category explorer with interactive hover motion
  - upgrade wall into infinite-style paw-wall with segment tabs and engagement stats placeholders
  - add upcoming upload teaser section with notification CTA
  - update footer with adoption advocacy and social links
- Branch mapping:
  - Feature branch: `feature_08_vite-home-immersive`

## 09 - Deployment SOP Documentation
- Goal: standardize packaging and online release workflow for repeatable deployment.
- Scope:
  - add deployment playbook doc for Vite + pnpm project
  - include pre-release checks, build artifact rules, deploy modes, smoke-test checklist, and rollback plan
  - align release behavior with `devlop -> master` sprint flow
- Branch mapping:
  - Feature branch: `feature_08_vite-home-immersive`

## 10 - Release and Hotfix Branch Governance
- Goal: lock down production release governance with explicit SemVer branch naming and merge order.
- Scope:
  - define release branch naming from `master`: `release_0.1.0`, `release_0.2.0`, ...
  - define hotfix branch naming: `hotfix_0.1.1`, `hotfix_0.2.1`, ...
  - enforce sprint rule: consolidate all sprint `feature_*` + `bug_*` scope into release branch first
  - enforce final publishing path: `release_* -> master -> deploy`
  - keep `devlop` as daily integration branch and not direct production publish source
- Branch mapping:
  - Process governance update (no standalone code branch required)

## 11 - Global Go-To-Top Floating Button
- Goal: add a global back-to-top action that is discoverable but visually non-intrusive.
- Scope:
  - provide a reusable global floating button across all pages
  - show button only after user scrolls past threshold
  - keep industry-standard style with semi-transparent background to avoid blocking content
  - support smooth scroll behavior and accessible button label
  - adapt button size/position for mobile and desktop
- Branch mapping:
  - Feature branch: `feature_11_global-go-to-top`
