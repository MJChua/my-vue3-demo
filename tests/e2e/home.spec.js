const { test, expect } = require('@playwright/test')

function createImages (count) {
  return Array.from({ length: count }, (_, index) => {
    return `https://images.dog.ceo/mock/e2e-dog-${index + 1}.jpg`
  })
}

async function mockHomeImageApi (page, count = 18) {
  await page.route(`**/api/breeds/image/random/${count}`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'success',
        message: createImages(count)
      })
    })
  })
}

test('home renders images from API', async ({ page }) => {
  await mockHomeImageApi(page)
  await page.goto('/')

  const imageCards = page.locator('.card-wrap .card img')
  await expect(imageCards).toHaveCount(18)
  await expect(imageCards.first()).toBeVisible()
})

test('home card size follows mobile width rule', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await mockHomeImageApi(page)
  await page.goto('/')

  const firstCard = page.locator('.card-wrap .card').first()
  await expect(firstCard).toHaveCSS('width', '150px')
  await expect(firstCard).toHaveCSS('height', '100px')
})

test('home card size follows desktop width rule', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await mockHomeImageApi(page)
  await page.goto('/')

  const firstCard = page.locator('.card-wrap .card').first()
  const firstImage = page.locator('.card-wrap .card img').first()
  await expect(firstCard).toHaveCSS('width', '300px')
  await expect(firstCard).toHaveCSS('height', '120px')
  await expect(firstImage).toHaveCSS('border-radius', '8px')
})
