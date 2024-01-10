import { adminPerm } from '@/constant'
import route from '@/route'
import { RouteRecordName } from 'vue-router'

export const transformMenuByPerms = (
  menus: Record<string, any>[],
  perm: string[]
) => {
  if (perm.includes(adminPerm)) {
    return menus
  } else {
    const filterMenus = menus.filter(
      (item) =>
        !item.permission ||
        item.permission.some((accessItem: any) => perm.includes(accessItem))
    )
    const returnData = filterMenus.map((item: any) => ({
      ...item,
      ...(item.children && {
        children: transformMenuByPerms(item?.children, perm)
      })
    })) as Record<string, any>[]
    return returnData
  }
}

export const transformRoute = (perm: string[]) => {
  if (perm.includes(adminPerm)) {
    return route.getRoutes()
  }
  const allRoutes = route.getRoutes()
  allRoutes.forEach((item) => {
    const permission = item?.meta?.permission as any[]
    if (permission) {
      const hasPerm = permission.some((i: any) => perm.includes(i))
      if (!hasPerm) {
        route.removeRoute(item?.name as RouteRecordName)
      }
    }
  })
  return route.getRoutes()
}
