import request from './request'
import { CommonResponse } from './type'

export const getPerms = () => {
  return request.request<CommonResponse<string[]>>({
    url: '/api/perm',
    method: 'get'
  })
}
