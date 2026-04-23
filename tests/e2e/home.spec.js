const { test, expect } = require('@playwright/test')

function createImageDataUri (label) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="#d7e4ff"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#2d3b55" font-size="32">${label}</text></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

function createDogImages (count, withBrokenImage = false) {
  return Array.from({ length: count }, (_, index) => {
    if (withBrokenImage && index === 0) return '/broken-image.jpg'
    return createImageDataUri(`Dog-${index + 1}`)
  })
}

function createCatImages (count) {
  return Array.from({ length: count }, (_, index) => {
    return { id: `cat-${index + 1}`, url: createImageDataUri(`Cat-${index + 1}`) }
  })
}

function createFoxImage (index) {
  return createImageDataUri(`Fox-${index + 1}`)
}

async function mockPetApis (page, options = {}) {
  const {
    dogCount = 8,
    catCount = 8,
    foxCount = 8,
    withBrokenImage = false
  } = options

  const dogImages = createDogImages(dogCount, withBrokenImage)
  const catImages = createCatImages(catCount)
  let foxIndex = 0

  await page.route(`**/api/breeds/image/random/${dogCount}`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'success',
        message: dogImages
      })
    })
  })

  await page.route(`**/v1/images/search?limit=${catCount}`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(catImages)
    })
  })

  await page.route('**/floof/', async (route) => {
    const image = foxIndex < foxCount
      ? createFoxImage(foxIndex)
      : createFoxImage(foxCount - 1)
    foxIndex += 1

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ image })
    })
  })
}

test('home renders hero section and masonry cards from pet APIs', async ({ page }) => {
  await mockPetApis(page)
  await page.goto('/')

  await expect(page.locator('.hero__img')).toBeVisible()
  await expect(page.locator('.pet-wall .pet-card')).toHaveCount(24)
})

test('home category filter narrows visible cards', async ({ page }) => {
  await mockPetApis(page)
  await page.goto('/')

  await page.locator('.filter-chip').nth(1).click()
  await expect(page.locator('.pet-wall .pet-card')).toHaveCount(8)
})

test('home shows placeholder when image loading fails', async ({ page }) => {
  await mockPetApis(page, { withBrokenImage: true })
  await page.goto('/')

  await expect(page.locator('.pet-card__placeholder').first()).toBeVisible()
})
