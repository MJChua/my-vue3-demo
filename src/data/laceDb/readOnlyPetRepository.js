import { fetchCatImages, fetchDogImages, fetchExoticImages } from '@/api/petFeedApi'
import { LACE_DB_VERSION, readOnlySeedUsers } from './schema'

const CATEGORY_META = Object.freeze({
  dog: { species: 'Canine', prefix: 'Dog', summary: 'Friendly companion' },
  cat: { species: 'Feline', prefix: 'Cat', summary: 'Curious and graceful' },
  exotic: { species: 'Exotic', prefix: 'Exotic', summary: 'Rare and unique pet' }
})

const CATEGORY_HEIGHT_SEED = Object.freeze({
  dog: [220, 260, 200, 280],
  cat: [200, 240, 280, 220],
  exotic: [240, 280, 220, 260]
})

function createPetId (category, index) {
  return `pet_${category}_${String(index + 1).padStart(3, '0')}`
}

function createPetRecord (category, imageUrl, index) {
  const now = new Date().toISOString()
  const meta = CATEGORY_META[category]
  const heights = CATEGORY_HEIGHT_SEED[category]
  const height = heights[index % heights.length]

  return {
    petId: createPetId(category, index),
    name: `${meta.prefix} ${index + 1}`,
    category,
    species: meta.species,
    imageUrl,
    summary: meta.summary,
    tags: [category, 'read-only'],
    ownerUserId: null,
    cardHeight: height,
    createdAt: now,
    updatedAt: now
  }
}

export async function fetchReadOnlyPetRows (options = {}) {
  const {
    dogCount = 8,
    catCount = 8,
    exoticCount = 8
  } = options

  const [dogResult, catResult, exoticResult] = await Promise.allSettled([
    fetchDogImages(dogCount),
    fetchCatImages(catCount),
    fetchExoticImages(exoticCount)
  ])

  const sourceMap = {
    dog: dogResult.status === 'fulfilled' ? dogResult.value : [],
    cat: catResult.status === 'fulfilled' ? catResult.value : [],
    exotic: exoticResult.status === 'fulfilled' ? exoticResult.value : []
  }

  const errors = Object.entries({
    dog: dogResult,
    cat: catResult,
    exotic: exoticResult
  })
    .filter(([, result]) => result.status === 'rejected')
    .map(([category, result]) => ({
      category,
      reason: result.reason
    }))

  const pets = Object.entries(sourceMap).flatMap(([category, imageUrls]) => {
    return imageUrls.map((imageUrl, index) => {
      return createPetRecord(category, imageUrl, index)
    })
  })

  return {
    meta: {
      source: 'laceDb-readonly',
      version: LACE_DB_VERSION
    },
    users: [...readOnlySeedUsers],
    pets,
    userPetLinks: [],
    errors
  }
}
