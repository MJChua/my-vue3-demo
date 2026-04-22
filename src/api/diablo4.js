import { apiRequest } from './client'

export const getDiabloItems = (params) => {
  return apiRequest({
    url: `/api/${params}`,
    method: 'get'
  })
}
