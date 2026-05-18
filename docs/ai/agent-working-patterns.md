# Agent Working Patterns

This document defines how AI/code agents should read, plan, and write changes in this repository. Use it before making any project adjustment.

## Purpose

- Keep every change grounded in the current project structure.
- Make edits predictable, reviewable, and easy to revert.
- Avoid overreach: do only the work requested, plus the minimum supporting updates required to keep the project consistent.

## Required Pre-Change Routine

Before editing files:

1. Check workspace state with `git status --short --branch`.
2. Read this document.
3. Read the specific files directly affected by the request.
4. Check related docs when the task touches process, deployment, architecture, or reusable packages.
5. State the intended edit scope before applying changes.

Do not start with broad refactors. Let the request and nearby code decide the scope.

## Documentation Map

- `docs/ai/` is for agent and engineering context.
- `docs/human/` is for Chinese user-facing documentation.
- `docs/README.md` is the public index for both documentation sets.
- `AGENTS.md` is the short operational summary for future coding agents.

When adding or changing documentation:

- Put internal implementation context in `docs/ai/`.
- Put readable user-facing Chinese explanations in `docs/human/`.
- Update `docs/README.md` when adding a new document.
- Update `CHANGELOG.md` only when the change is notable to project history.

## Source Code Map

- Route-level pages live in `src/views/`.
- Reusable Vue components live in `src/components/`.
- Route declarations live in `src/router/` and `src/router/modules/`.
- App state lives in `src/store/`.
- API modules live in `src/api/`.
- HTTP plumbing lives in `src/utils/http/` and reusable package code in `packages/http/`.
- Data modeling and read repositories live in `src/data/`.
- i18n setup lives in `src/i18n/`; translation copy belongs in `src/i18n/messages/`.
- Shared package candidates live in `packages/core`, `packages/http`, and `packages/ui`.

Prefer existing locations over introducing new folders.

## Existing Patterns To Preserve

### Package Manager

- Use `pnpm`.
- Do not add npm or yarn lockfiles.
- Root scripts in `package.json` are the source of truth for build, test, lint, and preview commands.

### Vue And JavaScript Style

- Vue 3 single-file components are the default UI unit.
- Use the `@` alias for imports from `src/`.
- Follow the existing StandardJS style: single quotes, no semicolons, concise imports.
- Use 2-space indentation.
- Keep edits ASCII unless existing content or user-facing Chinese copy requires non-ASCII.

### Styling

- Global Stylus variables are injected through `vite.config.mjs`.
- Reuse existing theme tokens and Stylus variables before adding new colors.
- Validate UI changes in both light and dark modes.
- For mobile UI, check header, footer, drawer, and primary actions.

### i18n

- Do not place large inline message objects in `src/i18n/index.js`.
- Put language copy in `src/i18n/messages/en.js` and `src/i18n/messages/zhTw.js`.
- Keep route/page copy behind translation keys when a page is already localized.

### Reusable Packages

- Extract only stable, reusable behavior into `packages/*`.
- Keep app-specific copy, routes, and business page composition in `src/`.
- If a reusable package changes, update the package README when the public API changes.

## Scope Control Rules

Allowed without extra confirmation:

- Directly requested edits.
- Small adjacent fixes required for the requested edit to work.
- Documentation index updates caused by added or moved docs.
- Focused tests for changed behavior.

Ask before doing:

- Renaming public routes, package names, or user-facing navigation.
- Large visual redesigns beyond the requested screen or component.
- Changing branch strategy, deployment strategy, or release flow.
- Migrating dependencies or changing package manager behavior.
- Deleting files unless they are clearly obsolete because of the requested change.

Do not do:

- Rewrite unrelated modules while fixing a narrow issue.
- Normalize formatting across untouched files.
- Move app-specific behavior into `packages/*` just because it could be reusable.
- Edit generated output in `dist/`.
- Revert user changes unless explicitly requested.

## Change Type Checklist

### UI Changes

- Identify affected view/component files.
- Check related theme variables and i18n messages.
- Preserve desktop behavior when the request is mobile-specific, and preserve mobile behavior when the request is desktop-specific.
- Add or update tests when behavior changes.

### API Or Data Changes

- Check `src/api/`, `src/utils/http/`, and `src/data/`.
- Keep response normalization close to the data/API boundary.
- Avoid leaking raw remote API shapes deep into UI components.
- Use mocks or focused unit tests when changing data shape.

### Routing Changes

- Check `src/router/index.js` and the relevant `src/router/modules/*` file.
- Confirm navigation components that link to the route.
- Confirm mobile footer/drawer behavior when route visibility changes.

### i18n Changes

- Update both `en.js` and `zhTw.js` unless the change is intentionally one-language-only.
- Prefer meaningful keys over page-specific one-off strings when text is reused.
- Check for reserved `vue-i18n` syntax such as raw `@` in message values.

### Documentation Changes

- Decide whether the document is AI/internal, human-facing, or both.
- Keep human docs in Traditional Chinese.
- Keep AI docs explicit about branches, commands, file paths, and validation.
- Keep links relative inside `docs/`.

## Verification Guide

Pick the smallest useful command set:

- Documentation-only change: no test required; run link/path checks if files moved.
- JS/Vue logic change: `pnpm test:unit`.
- UI route or workflow change: `pnpm test:e2e` when practical.
- Shared package or broad app change: `pnpm test:ci`.
- Release-sensitive change: `pnpm pre:pr`.
- Build/config change: `pnpm build`.

Always report what was run and what was not run.

## Working Assumptions

- Default integration branch is `devlop`.
- Release and hotfix rules are documented in `docs/ai/dev-branching-process.md`.
- Deployment rules are documented in `docs/ai/deployment-playbook.md`.
- Reusable extraction planning is documented in `docs/ai/reusable-catalog.md` and `docs/ai/library-roadmap.md`.

If these assumptions conflict with a newer user instruction, follow the user instruction and update the relevant document only when asked or when the mismatch would confuse future work.
