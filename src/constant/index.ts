import { Env } from '@/types'

export const adminPerm = '*:*:*'

export const mode = import.meta.env.MODE as unknown as Env
export const env = import.meta.env
