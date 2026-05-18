import { describe, expect, it } from 'vitest'
import { getPublicImages } from '@/api/dogApi'

describe('dogApi', () => {
  it('returns requested image amount from API', async () => {
    const result = await getPublicImages(3)

    expect(result).toHaveLength(3)
    expect(result[0]).toContain('https://images.dog.ceo/mock/dog-1.jpg')
  })
})
