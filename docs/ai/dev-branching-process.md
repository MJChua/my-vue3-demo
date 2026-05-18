# Development Branching Process

## Branch model
1. `master`
- Only receives completed sprint scope.
- Merge target for release-ready work only.

2. `devlop`
- Main integration branch for day-to-day development.
- All feature and bug branches must merge back here first.

3. `release_*`
- Created from `master` when preparing online deployment.
- Naming rule:
  - first release: `release_0.1.0`
  - second release: `release_0.2.0`
  - continue with SemVer minor progression by release cycle.

4. `hotfix_*`
- Created from the active release branch when urgent production fix is required.
- Naming rule:
  - first hotfix after `release_0.1.0`: `hotfix_0.1.1`
  - first hotfix after `release_0.2.0`: `hotfix_0.2.1`
  - continue with SemVer patch progression.

5. Working branches
- Feature: `feature_XX_short-name` (example: `feature_01_workspace-library`)
- Bugfix: `bugfix_short-name` (example: `bugfix_api-timeout`)

## Daily workflow
1. Sync `devlop`.
2. Create a working branch from `devlop`.
3. Before code changes, publish PM update note with next serial title (`01`, `02`, ...).
4. Implement, test, commit, push.
5. Open PR to `devlop`.
6. After acceptance, merge to `devlop`.
7. Only sprint-complete scope is promoted from `devlop` to `master`.

## Release workflow
1. From `master`, create release branch with SemVer name: `release_X.Y.Z`.
2. Use `master` as the exact baseline and collect sprint scope branch-by-branch:
   - verify each sprint `feature_*` and `bug_*` branch to be included
   - merge each selected branch into `release_X.Y.Z` individually (or cherry-pick equivalent commits)
   - do not merge `devlop` directly into `master`
3. Run full quality gate and regression checks on release branch.
4. Merge release branch back to `master`.
5. Deploy from `master`.
6. If urgent fix is needed after release cut, create `hotfix_X.Y.Z` from release branch, fix, verify, then merge back through release -> `master`.

## Master Promotion Checklist
1. Confirm `release_X.Y.Z` is branched from current `master`.
2. Build sprint candidate list from merged PR records:
   - `feature_*` branches in sprint scope
   - `bug_*` branches in sprint scope
3. Merge candidates into release branch one by one and resolve conflicts in release context.
4. Run quality gate (`pre:pr` equivalent) on release branch.
5. Merge `release_X.Y.Z` back to `master` only after checklist completion.

## PM update title rule
- Use incremental numeric title: `01`, `02`, `03`, ...
- Keep one short summary line and affected scope.
- Feature branch number should map to PM title number when applicable.

## Cleanup Rule
- When replacing images/files during feature or bug changes, remove old files that are no longer used.
- Before PR, verify no stale assets or dead files remain in the branch.

## Theme Contrast Rule
- Any feature touching UI must validate light/dark readability before PR:
  - text cannot blend into card/background after theme switch
  - control labels/icons must keep sufficient contrast in both modes
  - mobile drawer, footer actions, and primary forms are mandatory checkpoints

## CSS Standardization Rule
- Recommended direction: adopt a shared utility standard (for example Tailwind CSS v4) in phased rollout.
- Migration approach:
  - phase 1: install and use for new modules only
  - phase 2: migrate frequently changed legacy pages
  - phase 3: retire duplicated ad-hoc utility classes once coverage is stable
- During migration, keep one source of design tokens for light/dark colors and spacing.
