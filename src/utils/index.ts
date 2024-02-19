import { logoutService } from '@/services/user'
import { local } from './storage'

export const isLogin = () => {
  // return local.baseGet('token')
  return true
}

export const logout = () => {
  local.remove('token')
}

export const systemLogin = (token: string) => {
  local.baseSet('token', token)
  location.reload()
}

export const systemLogout = async () => {
  await logoutService()
  local.remove('token')
  location.reload()
}

export const nodeConsole = (data: string) => {
  process.stdout.write(data)
}
