import { describe, expect, it } from 'vitest'
import { fetchReadOnlyPetRows } from '@/data/laceDb/readOnlyPetRepository'

describe('readOnlyPetRepository', () => {
  it('returns normalized pets with future relation fields reserved', async () => {
    const result = await fetchReadOnlyPetRows({
      dogCount: 3,
      catCount: 3,
      exoticCount: 3
    })

    expect(result.meta.source).toBe('laceDb-readonly')
    expect(result.users[0].petIds).toEqual([])
    expect(result.userPetLinks).toEqual([])
    expect(result.pets).toHaveLength(9)

    result.pets.forEach((pet) => {
      expect(['dog', 'cat', 'exotic']).toContain(pet.category)
      expect(pet.ownerUserId).toBeNull()
      expect(typeof pet.imageUrl).toBe('string')
      expect(pet.imageUrl.length).toBeGreaterThan(0)
    })
  })
})
