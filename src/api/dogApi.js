import { devRequest as request } from '@/utils/http'

const DOG_API_BASE = process.env.VITEST ? 'https://dog.ceo/api' : '/api'

export const getPublicImages = async (count = 18) => {
  const data = await request({
    url: `${DOG_API_BASE}/breeds/image/random/${count}`,
    method: 'get'
  })

  if (Array.isArray(data?.message)) {
    return data.message
  }

  return data?.message ? [data.message] : []
}
