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
        !item.access ||
        item.access.some((accessItem: any) => perm.includes(accessItem))
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
    return
  }
  const allRoutes = route.getRoutes()
  allRoutes.forEach((item) => {
    const access = item?.meta?.access as any[]
    if (access) {
      const hasPerm = access.some((i: any) => perm.includes(i))
      if (!hasPerm) {
        route.removeRoute(item?.name as RouteRecordName)
      }
    }
  })
}
