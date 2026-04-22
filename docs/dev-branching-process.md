# Development Branching Process

## Branch model
1. `master`
- Only receives completed sprint scope.
- Merge target for release-ready work only.

2. `devlop`
- Main integration branch for day-to-day development.
- All feature and bug branches must merge back here first.

3. Working branches
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

## PM update title rule
- Use incremental numeric title: `01`, `02`, `03`, ...
- Keep one short summary line and affected scope.
- Feature branch number should map to PM title number when applicable.

