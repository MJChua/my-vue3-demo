import axios from 'axios'

export function createHttpClient (options = {}) {
  const client = axios.create({
    baseURL: options.baseURL || '',
    timeout: options.timeout || 3000
  })

  client.interceptors.request.use(
    (config) => {
      config.headers['Content-Type'] = 'application/json'
      if (typeof options.onRequest === 'function') {
        return options.onRequest(config)
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  client.interceptors.response.use(
    (response) => {
      if (typeof options.onResponse === 'function') {
        return options.onResponse(response)
      }
      return response.data
    },
    (error) => {
      if (typeof options.onError === 'function') {
        return options.onError(error)
      }
      return Promise.reject(error)
    }
  )

  return client
}

export function createRequest (client, defaults = {}) {
  return function request (config = {}) {
    return client.request({
      ...defaults,
      ...config
    })
  }
}
