# Reusable Capability Catalog

This file tracks reusable features from the app that should be extracted into internal libraries.

## Current extraction status

1. Device and layout utilities
- Source: `packages/core/src/index.js` (migrated from `src/utils/resizeScreen.js`)
- Target package: `@my-vue3/core`
- Planned exports:
  - `attachAutoResize(setDevice, setFontSize, options?)`
  - `resolveDeviceType(width, breakpoint?)`
- Status: extracted and app now imports shared package directly

2. Theme and appearance
- Source: `src/store/main.js`, `src/components/Switch/index.vue`, `src/App.vue`
- Target package: `@my-vue3/core`
- Planned exports:
  - `createAppearanceStore(storage, key, defaultValue?)`
  - `applyAppearanceClass(mode, target?)`
- Status: extracted and integrated in app store/app shell/theme switch

3. HTTP client baseline
- Source: `packages/http/src/index.js` (migrated from `src/utils/http/*`)
- Target package: `@my-vue3/http`
- Planned exports:
  - `createHttpClient(options?)`
  - `createRequest(client, defaults?)`
- Status: extracted and app API layer now imports shared package directly

4. Generic UI components
- Source: `src/components/Button`, `src/components/Switch`, `src/components/HamburgerMenu`
- Target package: `@my-vue3/ui`
- Planned exports:
  - `Button`
  - `ThemeSwitch`
  - `HamburgerMenu`
  - `install(app)` plugin helper
- Status: planned

## Notes
- Keep app-specific content (copywriting, business routes, brand styles) inside the app.
- Extract only reusable logic and presentational components with stable props/events.
- Add one README per package with API and usage examples when each extraction is implemented.
