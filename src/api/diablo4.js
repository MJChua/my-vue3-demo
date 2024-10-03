import { devRequest as request } from '@/utils/http'

export const getDiabloItems = (params) => {
  return request({
    url: `/api/${params}`,
    method: 'get'
  })
}
