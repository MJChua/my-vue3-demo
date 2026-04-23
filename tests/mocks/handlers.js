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
  })
]
