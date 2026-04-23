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
2. Merge all sprint-complete `feature_*` and `bug_*` scope (already integrated in `devlop`) into release branch.
3. Run full quality gate and regression checks on release branch.
4. Merge release branch back to `master`.
5. Deploy from `master`.
6. If urgent fix is needed after release cut, create `hotfix_X.Y.Z` from release branch, fix, verify, then merge back through release -> `master`.

## PM update title rule
- Use incremental numeric title: `01`, `02`, `03`, ...
- Keep one short summary line and affected scope.
- Feature branch number should map to PM title number when applicable.
