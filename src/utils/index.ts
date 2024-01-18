import { local } from './storage'

export const isLogin = () => {
  return local.baseGet('token')
}

export const logout = () => {
  local.remove('token')
}

export const systemLogin = (token: string) => {
  local.baseSet('token', token)
  location.reload()
}

export const systemLogout = () => {
  local.remove('token')
  location.reload()
}

export const nodeConsole = (data: string) => {
  process.stdout.write(data)
}
