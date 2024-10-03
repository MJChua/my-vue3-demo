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
    const { status, data } = error.response
    console.warn('response errorCode:', status, data)
    return Promise.reject(error)
  }
)

export default service
