import { local } from './storage'

export const isLogin = () => {
  return local.baseGet('token')
}

export const logout = () => {
  local.remove('token')
}

export const systemLogin = () => {
  local.baseSet('token', +new Date())
  location.reload()
}

export const systemLogout = () => {
  local.remove('token')
  location.reload()
}
