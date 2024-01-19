import { WAMenu } from './types'
import Workbench from '@/assets/svg/工作台.svg'
import Perm from '@/assets/svg/员工.svg'

export const apps: { name: string; key: string }[] = [
  { name: 'app1', key: 'app1' }
]

export const menu: WAMenu = [
  {
    title: '工作台',
    key: '/workbench',
    icon: Workbench,
    type: 'group'
  },
  {
    title: 'perm测试',
    key: 'perm',
    icon: Perm,
    type: 'group',
    group: 'app1',
    children: [
      {
        title: 'perm1',
        key: '/perm/1',
        permission: ['perm-1']
      },
      {
        title: 'perm2',
        key: '/perm/2',
        permission: ['perm-2']
      }
    ]
  },
  {
    title: 'perm',
    key: 'perm',
    icon: Perm,
    type: 'group',
    group: 'app2',
    children: [
      {
        title: 'perm1',
        key: '/perm/1',
        permission: ['perm-1']
      },
      {
        title: 'perm2',
        key: '/perm/2',
        permission: ['perm-2']
      }
    ]
  }
]
