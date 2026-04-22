import { createHttpClient } from '@my-vue3/http'

const service = createHttpClient({
  onError: (error) => {
    if (error.response?.status ?? false) {
      console.warn('response errorCode:', error.response.status, error.response.data)
    } else {
      console.warn('request error:', error)
    }
    return Promise.reject(error)
  }
})

export default service
