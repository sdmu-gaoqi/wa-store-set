import { Lang } from '@/types'
import { local } from './storage'

export const changeLang = (lang: Lang) => {
  local.baseSet('lang', lang)
  location.reload()
}
