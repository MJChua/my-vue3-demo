# Repository Guidelines

## Project Structure

- Before making any repository adjustment, read `docs/ai/agent-working-patterns.md` and keep the change within its scope-control rules.
- `src/` contains the Vue 3 app.
- `src/views/` contains route-level pages.
- `src/components/` contains reusable Vue components.
- `src/router/` contains route registration and route modules.
- `src/store/` contains Pinia/Vuex state modules.
- `src/api/`, `src/utils/`, `src/data/`, and `src/i18n/` contain service, utility, data, and localization code.
- `packages/*` are pnpm workspace packages published internally as `@my-vue3/*`.
- `tests/unit/` contains Vitest specs. `tests/e2e/` contains Playwright specs.
- `docs/ai/` contains engineering and AI-collaboration context. `docs/human/` contains Chinese user-facing documentation.
- Build output goes to `dist/`; do not edit generated files by hand.

## Tooling

- Use `pnpm`; the repo declares `pnpm@10.33.0`.
- Development server: `pnpm dev` on port `9911`.
- Preview server: `pnpm preview` on port `4173`.
- Production build: `pnpm build`.
- Unit tests: `pnpm test:unit`.
- E2E tests: `pnpm test:e2e`; Playwright builds and previews the app automatically.
- Full CI-style check: `pnpm test:ci`.
- Pre-PR check including build: `pnpm pre:pr`.

## Coding Conventions

- Use Vue 3 single-file components for UI.
- The `@` alias resolves to `src/`.
- Use 2-space indentation for `.js` and `.vue` files.
- Keep files ASCII unless existing content or user-facing copy requires otherwise.
- Follow the existing StandardJS/Vue ESLint style: no semicolons, single quotes, and concise imports.
- Stylus globals are injected from `src/assets/styles/theme.styl` and `src/assets/styles/var/index.styl`.

## Testing Notes

- Vitest runs in a Node environment with setup from `tests/setup/vitest.setup.js`.
- Unit specs are included from `tests/unit/**/*.spec.js`.
- Playwright uses `http://127.0.0.1:4173` and starts `pnpm build && pnpm preview --host 127.0.0.1 --port 4173 --strictPort`.
- When changing UI behavior, prefer at least a focused unit test or e2e coverage for the affected user flow.

## Git Notes

- The current working branch is `devlop`.
- Check `git status --short --branch` before edits and avoid reverting unrelated user changes.
