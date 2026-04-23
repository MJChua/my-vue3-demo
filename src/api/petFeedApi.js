import { devRequest as request } from '@/utils/http'

const DOG_API_BASE = 'https://dog.ceo/api'
const CAT_API_BASE = 'https://api.thecatapi.com/v1'
const EXOTIC_API_BASE = 'https://randomfox.ca'

function normalizeImageList (items = []) {
  return items.filter((item) => typeof item === 'string' && item.length > 0)
}

export async function fetchDogImages (count = 6) {
  const data = await request({
    url: `${DOG_API_BASE}/breeds/image/random/${count}`,
    method: 'get'
  })

  if (Array.isArray(data?.message)) {
    return normalizeImageList(data.message)
  }

  return normalizeImageList([data?.message])
}

export async function fetchCatImages (count = 6) {
  const data = await request({
    url: `${CAT_API_BASE}/images/search?limit=${count}`,
    method: 'get'
  })

  if (!Array.isArray(data)) return []

  return normalizeImageList(data.map((item) => item?.url)).slice(0, count)
}

export async function fetchExoticImages (count = 6) {
  const tasks = Array.from({ length: count }, () => {
    return request({
      url: `${EXOTIC_API_BASE}/floof/`,
      method: 'get'
    })
  })

  const settledList = await Promise.allSettled(tasks)
  return normalizeImageList(
    settledList
      .filter((item) => item.status === 'fulfilled')
      .map((item) => item.value?.image)
  )
}
