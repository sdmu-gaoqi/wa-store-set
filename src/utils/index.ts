import { cookie, isEmpty } from 'wa-utils'

export const isLogin = () => {
  return !isEmpty(cookie.get('Admin-Token'))
}

export const logout = () => {
  cookie.remove('Admin-Token')
}
