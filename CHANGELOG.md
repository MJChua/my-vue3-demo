# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Workspace foundation with `pnpm-workspace.yaml`.
- Internal package skeletons in `packages/ui`, `packages/core`, and `packages/http`.
- Reusable capability inventory document in `docs/reusable-catalog.md`.
- Global i18n foundation with `vue-i18n` and locale persistence (`zh-TW` / `en`).
- Locale-pack loader structure for i18n (`src/i18n/localePackDb.js` and `src/i18n/messages/*`).

### Changed
- Standardized local workflow to `pnpm` commands in `README.md`.
- Improved lint command in root `package.json`.
- Unified header controls on the right side: compact language toggle + smaller theme switch (mobile first sizing).
- Migrated header/footer/home/mine/about/service/project views to translation keys.
- Improved language-toggle contrast tokens for dark/light theme readability.

### Removed
- Deprecated standalone appearance switch component in `src/components/Switch/index.vue`.
