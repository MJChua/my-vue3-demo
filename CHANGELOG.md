# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Workspace foundation with `pnpm-workspace.yaml`.
- Internal package skeletons in `packages/ui`, `packages/core`, and `packages/http`.
- Reusable capability inventory document in `docs/reusable-catalog.md`.
- App API client entrypoint `src/api/client.js` based on `@my-vue3/http`.

### Changed
- Standardized local workflow to `pnpm` commands in `README.md`.
- Improved lint command in root `package.json`.
- Migrated app appearance and resize behavior to direct `@my-vue3/core` imports.
- Migrated app request flow to direct `@my-vue3/http` imports.

### Removed
- Legacy duplicated utility files in `src/utils/resizeScreen.js` and `src/utils/http/*`.
