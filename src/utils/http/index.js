import defaultRequest from './request'

export const devRequest = ({ ...req }, errorType = []) => {
  const timeoutHandle = {
    timeout: 3000
  }
  const normalizedUrl = String(req.url || '').replace(/^\/+/, '')

  return defaultRequest.request({
    ...req,
    url: `/api/${normalizedUrl}`,
    timeoutHandle,
    timeout: timeoutHandle.timeout
  })
}
