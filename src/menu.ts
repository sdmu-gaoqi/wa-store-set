import { WAMenu } from './types'
import Workbench from '@/assets/svg/工作台.svg'
import Perm from '@/assets/svg/员工.svg'

export const apps: { name: string; key: string }[] = [
  { name: 'app1', key: 'app1' },
  { name: 'app1', key: 'app2' }
]

export const menu: WAMenu = [
  {
    key: '/workbench',
    name: 'workbench',
    icon: Workbench,
    type: 'group'
  },
  {
    key: 'perm',
    name: 'perm',
    icon: Perm,
    type: 'group',
    group: 'app1',
    children: [
      {
        key: '/perm/1',
        name: 'perm1',
        permission: ['perm-1']
      },
      {
        key: '/perm/2',
        name: 'perm2',
        permission: ['perm-2']
      }
    ]
  },
  {
    key: 'perm',
    icon: Perm,
    type: 'group',
    group: 'app2',
    name: 'app2',
    children: [
      {
        key: '/perm/1',
        name: 'app2Perm1',
        permission: ['perm-1']
      },
      {
        key: '/perm/2',
        name: 'app2Perm2',
        permission: ['perm-2']
      }
    ]
  }
]
