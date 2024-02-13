import request from './request'
import { CommonResponse } from './type'

export const saveUplog = (data) => {
  return request.request({
    url: '/api/common/upload/json',
    data: data,
    method: 'post'
  })
}

export const getUplog = () => {
  return request.request({
    url: '/static/storeUplog.json',
    method: 'get'
  })
}
