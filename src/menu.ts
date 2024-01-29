// @ts-nocheck

import { WAMenu } from './types'
import Workbench from '@/assets/svg/工作台.svg'
import Perm from '@/assets/svg/员工.svg'

export const apps: { name: string; key: string }[] = [
  { name: 'app1', key: 'app1' },
]

export const menu: WAMenu = [
  {
    key: '/workbench',
    name: 'workbench',
    icon: Workbench,
    type: 'group'
  },
  {
    key: 'set',
    title: '配置中心',
    icon: Perm,
    type: 'group',
    group: 'app1',
    children: [
      {
        key: '/set/uplog',
        title: '更新说明',
      },
    ]
  },
]
