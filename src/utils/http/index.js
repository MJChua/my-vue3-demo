import defaultRequest from './request'

export const devRequest = ({ ...req }, errorType = []) => {
  const timeoutHandle = {
    timeout: 3000
  }

  return defaultRequest.request({
    ...req,
    url: `/api/${req.url}`,
    timeoutHandle,
    timeout: timeoutHandle.timeout
  })
}
