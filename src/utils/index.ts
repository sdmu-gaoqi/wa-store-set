import { isEmpty } from 'wa-utils'

export const isLogin = () => {
  return !isEmpty(localStorage.getItem('token'))
}

export const logout = () => {
  localStorage.removeItem('token')
}
