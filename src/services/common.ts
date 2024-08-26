import request from './request'

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

export const getTeaHouseUplog = () => {
  return request.request({
    url: '/static/teaHouseUplog.json',
    method: 'get'
  })
}
