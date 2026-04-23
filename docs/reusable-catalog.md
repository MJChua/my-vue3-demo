# Reusable Capability Catalog

This file tracks reusable features from the app that should be extracted into internal libraries.

## Current extraction status

1. Device and layout utilities
- Source: `src/utils/resizeScreen.js`
- Target package: `@my-vue3/core`
- Planned exports:
  - `attachAutoResize(setDevice, setFontSize, options?)`
  - `resolveDeviceType(width, breakpoint?)`
- Status: extracted to `packages/core` (app uses compatibility wrapper)

2. Theme and appearance
- Source: `src/store/main.js`, `src/components/Switch/index.vue`, `src/App.vue`
- Target package: `@my-vue3/core`
- Planned exports:
  - `createAppearanceStore(storage, key, defaultValue?)`
  - `applyAppearanceClass(mode, target?)`
- Status: planned

3. HTTP client baseline
- Source: `src/utils/http/request.js`, `src/utils/http/index.js`
- Target package: `@my-vue3/http`
- Planned exports:
  - `createHttpClient(options?)`
  - `createRequest(client, defaults?)`
- Status: extracted to `packages/http` (app request layer now uses this package)

4. Generic UI components
- Source: `src/components/Button`, `src/components/Switch`, `src/components/HamburgerMenu`
- Target package: `@my-vue3/ui`
- Planned exports:
  - `Button`
  - `ThemeSwitch`
  - `HamburgerMenu`
  - `install(app)` plugin helper
- Status: planned

5. Read-only pet data repository (LaceDB-style)
- Source: `src/data/laceDb/readOnlyPetRepository.js`, `src/api/petFeedApi.js`
- Target package: `@my-vue3/core` (or future `@my-vue3/data`)
- Planned exports:
  - `fetchReadOnlyPetRows(options?)`
  - `laceDbSchema`
- Status: in-app implementation completed, package extraction planned

## Notes
- Keep app-specific content (copywriting, business routes, brand styles) inside the app.
- Extract only reusable logic and presentational components with stable props/events.
- Add one README per package with API and usage examples when each extraction is implemented.
