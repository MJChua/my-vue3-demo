# LaceDB Read-Only Architecture (Phase 1)

## Objective
- Current phase is `read-only` pet discovery.
- Future phase will add community upload with `User -> Pets` one-to-many ownership.

## Entity Model
1. `users`
- `userId`: string (PK)
- `displayName`: string
- `avatarUrl`: string | null
- `petIds`: string[] (reserved for 1:N relation index)
- `createdAt`: ISO string
- `updatedAt`: ISO string

2. `pets`
- `petId`: string (PK)
- `name`: string
- `category`: enum (`dog` | `cat` | `exotic`)
- `species`: string
- `imageUrl`: string
- `summary`: string
- `tags`: string[]
- `ownerUserId`: string | null (reserved for upload ownership)
- `createdAt`: ISO string
- `updatedAt`: ISO string

3. `userPetLinks` (reserved relation table)
- `relationId`: string (PK)
- `userId`: string (FK -> users.userId)
- `petId`: string (FK -> pets.petId)
- `role`: enum (`owner` | `co-owner`)
- `createdAt`: ISO string

## Read Pattern (Current)
1. Query pet feeds by `category`.
2. Normalize remote payload into `pets`.
3. Expose filtered read models to UI (`all`, `dog`, `cat`, `exotic`).

## Write Pattern (Future)
- Community upload creates:
  - new `pets` row with `ownerUserId`
  - new `userPetLinks` row
  - append `petId` into `users.petIds`

## Implementation Notes
- Current repository is read-only and API-driven.
- Schema keeps relation fields now to avoid migration churn later.
