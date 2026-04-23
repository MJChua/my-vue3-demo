export const LACE_DB_VERSION = '0.1.0-readonly'

export const laceDbSchema = Object.freeze({
  users: {
    userId: 'string',
    displayName: 'string',
    avatarUrl: 'string|null',
    petIds: 'string[]',
    createdAt: 'ISO-8601',
    updatedAt: 'ISO-8601'
  },
  pets: {
    petId: 'string',
    name: 'string',
    category: 'dog|cat|exotic',
    species: 'string',
    imageUrl: 'string',
    summary: 'string',
    tags: 'string[]',
    ownerUserId: 'string|null',
    createdAt: 'ISO-8601',
    updatedAt: 'ISO-8601'
  },
  userPetLinks: {
    relationId: 'string',
    userId: 'string',
    petId: 'string',
    role: 'owner|co-owner',
    createdAt: 'ISO-8601'
  }
})

export const readOnlySeedUsers = Object.freeze([
  {
    userId: 'user_guest',
    displayName: 'Guest',
    avatarUrl: null,
    petIds: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  }
])
