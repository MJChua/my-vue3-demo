# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Workspace foundation with `pnpm-workspace.yaml`.
- Internal package skeletons in `packages/ui`, `packages/core`, and `packages/http`.
- Reusable capability inventory document in `docs/ai/reusable-catalog.md`.
- Split documentation into `docs/ai/` for engineering context and `docs/human/` for Chinese user-facing docs.
- Agent working-pattern report in `docs/ai/agent-working-patterns.md` to guide future scoped edits.
- Global i18n foundation with `vue-i18n` and locale persistence (`zh-TW` / `en`).
- Locale-pack loader structure for i18n (`src/i18n/localePackDb.js` and `src/i18n/messages/*`).
- LaceDB read-only architecture document with future `User -> Pets` relation planning.
- Read-only pet repository (`src/data/laceDb`) and multi-source pet feed API integration.
- Hero section WebP main visual and category-driven pet feed wall on home page.
- Immersive home sections: Hero CTA, Daily Star, category explorer, infinite-style paw-wall, and upcoming upload teaser.
- Adoption advocacy footer with social links (IG / FB / Threads).

### Changed
- Standardized local workflow to `pnpm` commands in `README.md`.
- Improved lint command in root `package.json`.
- Unified header controls on the right side: compact language toggle + smaller theme switch (mobile first sizing).
- Migrated header/footer/home/mine/about/service/project views to translation keys.
- Improved language-toggle contrast tokens for dark/light theme readability.
- Upgraded home page to masonry layout with category filters (`cat`, `dog`, `exotic`).
- Added image-load fallback placeholders with friendly failure messaging on pet cards.
- Migrated project build/dev pipeline from Vue CLI to Vite (`vite.config.mjs`, root `index.html`, Vite scripts).

### Removed
- Deprecated standalone appearance switch component in `src/components/Switch/index.vue`.
