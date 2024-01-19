import { ItemType } from 'ant-design-vue'
import { RouteRecordRaw } from 'vue-router'

export type WARoute = RouteRecordRaw & {
  name: string
  meta: {
    permission?: string[] // 权限标识
    key: string // 唯一标识
    notNeedLogin?: boolean // 是否需要登录
  }
}

export type WAMenu = (ItemType & {
  title: string
  key: string
  group?: string
  permission?: string[] // 权限标识
  icon?: string // icon地址
  children?: WAMenu
})[]

export type Env = 'development' | 'test' | 'staging' | 'production'

export type Lang = 'zh-CN' | 'en'
