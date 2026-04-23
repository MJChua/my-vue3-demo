import defaultRequest from './request'

export const devRequest = ({ ...req }, errorType = []) => {
  const timeoutHandle = {
    timeout: 3000
  }
  const normalizedUrl = String(req.url || '')

  return defaultRequest.request({
    ...req,
    url: normalizedUrl,
    timeoutHandle,
    timeout: timeoutHandle.timeout
  })
}
