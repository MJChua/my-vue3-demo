import { http, HttpResponse } from 'msw'

function makeImageUrls (count) {
  return Array.from({ length: count }, (_, index) => {
    return `https://images.dog.ceo/mock/dog-${index + 1}.jpg`
  })
}

export const handlers = [
  http.get('https://dog.ceo/api/breeds/image/random/:count', ({ params }) => {
    const count = Number(params.count || 1)
    return HttpResponse.json({
      status: 'success',
      message: makeImageUrls(count)
    })
  }),
  http.get('https://api.thecatapi.com/v1/images/search', ({ request }) => {
    const url = new URL(request.url)
    const count = Number(url.searchParams.get('limit') || 1)
    const payload = Array.from({ length: count }, (_, index) => ({
      id: `cat-${index + 1}`,
      url: `https://api.thecatapi.com/mock/cat-${index + 1}.jpg`
    }))
    return HttpResponse.json(payload)
  }),
  http.get('https://randomfox.ca/floof/', () => {
    return HttpResponse.json({
      image: 'https://randomfox.ca/mock/fox-1.jpg'
    })
  })
]
