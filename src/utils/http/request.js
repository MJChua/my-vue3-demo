import axios from 'axios'

const service = axios.create({
  baseURL: ''
})

service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    console.warn('request error:', error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response?.status ?? false) {
      console.warn('response errorCode:', error.response.status, error.response.data)
    }
    return Promise.reject(error)
  }
)

export default service
