import { devRequest as request } from '@/utils/http'

export const getPublicImages = async (count = 18) => {
  const data = await request({
    url: `/api/breeds/image/random/${count}`,
    method: 'get'
  })

  if (Array.isArray(data?.message)) {
    return data.message
  }

  return data?.message ? [data.message] : []
}
