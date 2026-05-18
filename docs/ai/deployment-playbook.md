# Deployment Playbook (Vite + pnpm)

## 1) Goal
- Make release steps repeatable.
- Keep deployment low-risk with pre-release checks and rollback steps.

## 2) Preconditions
- Branch flow follows team policy:
  1. feature/bug branch -> `devlop`
  2. release branch is cut from `master` with SemVer naming (`release_0.1.0`, `release_0.2.0`, ...)
  3. sprint-complete feature/bug scope is consolidated into release branch
  4. release branch -> `master` -> deploy
  5. urgent production fixes use `hotfix_0.1.1`, `hotfix_0.2.1`, ... (patch progression)
- Use `pnpm` only.
- Node version should match team runtime (recommend `>=18`).

## 3) Pre-release Quality Gate
Run before any production deployment:

```bash
pnpm install
pnpm pre:pr:quick
pnpm pre:pr
```

What this verifies:
- `lint`
- `unit tests`
- `e2e tests`
- `vite build`

## 4) Build Artifact
Production artifact is generated in:
- `dist/`

Build command:

```bash
pnpm build
```

Local preview command:

```bash
pnpm preview
```

## 5) Deployment Modes

### A. Static Hosting (Recommended)
Use any static host (Cloudflare Pages / Netlify / Vercel static / S3+CDN / Nginx).

1. Build:
```bash
pnpm build
```
2. Upload `dist/*` to host root.
3. Configure SPA fallback:
- route rewrite `/* -> /index.html` (except real static assets).

### B. Manual Server Deploy (Nginx example)
1. Build locally: `pnpm build`
2. Copy `dist/*` to server web root (example: `/var/www/petpals`)
3. Nginx `try_files` should fallback to `index.html` for Vue Router history mode.

## 6) Temporary Online URL (Sprint Demo)
For quick demo sharing, prefer static preview URL:

### Option A: Netlify Drop (fastest)
1. Build locally:
```bash
pnpm build
```
2. Open [Netlify Drop](https://app.netlify.com/drop).
3. Drag and drop the `dist/` folder.
4. Netlify returns a temporary public URL for sharing.

### Option B: Cloudflare Pages Direct Upload
1. Build locally:
```bash
pnpm build
```
2. In Cloudflare Pages, create a project with direct upload.
3. Upload `dist/` as static artifact.
4. Use the generated `*.pages.dev` preview URL.

## 7) Environment / API Notes
- Current pet data API endpoints are public:
  - `https://dog.ceo/api`
  - `https://api.thecatapi.com/v1`
  - `https://randomfox.ca`
- Frontend can run without custom backend.
- If future API keys are needed, move them to host environment variables and never hardcode in repo.

## 8) Release Checklist
1. From `master`, create a release branch (example: `release_0.1.0`).
2. Merge all sprint-complete feature and bug work into this release branch.
3. Run:
```bash
pnpm pre:pr
```
4. Build artifact:
```bash
pnpm build
```
5. Merge release branch into `master`.
6. Deploy `dist/` to production host.
7. Smoke test:
- homepage render
- i18n toggle
- theme switch
- pet wall loading / placeholder
- routing refresh behavior

## 9) Hotfix Checklist
1. Create `hotfix_X.Y.Z` from the active release branch.
2. Apply minimal fix and run targeted tests first, then full `pnpm pre:pr`.
3. Build and verify artifact with `pnpm build`.
4. Merge hotfix branch back into release branch.
5. Merge updated release branch into `master`.
6. Deploy patched version.

## 10) Rollback Plan
If production has regression:
1. Re-deploy previous known-good `dist` artifact.
2. Repoint host to previous release version/tag.
3. Open bug ticket in `docs/ai/bug-tickets.md` and patch from latest `devlop`.

## 11) Suggested Versioning
- Tag production merges on `master` with SemVer style:
  - `v0.1.0`, `v0.1.1`, `v0.2.0`
- Maintain `CHANGELOG.md` for each release.
