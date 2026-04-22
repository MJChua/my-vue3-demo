import { createHttpClient, createRequest } from '@my-vue3/http'

const service = createHttpClient({
  timeout: 3000,
  onError: (error) => {
    if (error.response?.status ?? false) {
      console.warn('response errorCode:', error.response.status, error.response.data)
    } else {
      console.warn('request error:', error)
    }
    return Promise.reject(error)
  }
})

export const apiRequest = createRequest(service)
