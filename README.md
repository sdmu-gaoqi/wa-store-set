# 关于路由

src/route.ts

```typescript
export type WARoute = RouteRecordRaw & {
  name: string
  meta: {
    permission?: string[] // 权限标识
    key: string // 唯一标识
  }

// 这里初始化系统获取用户权限
const initPerms = async () => {
  const store = useStore()
  const { dispatch, state } = store
  const perms = await getPerms()
  const menus = transformMenuByPerms(menu, perms)
  dispatch('permission/setPerms', { data: perms }) // 存在全局状态
  dispatch('common/changeMenus', { data: menus }) // 修改全局菜单
  transformRoute(perms) // vue-route 根据权限操作route
  return {
    perms
  }
}

```

路由的定义遵从的规则

1. 需要关联权限的需要吧权限点写在permission中
2. 如果菜单与路由需要根据接口过滤权限 逻辑写在 initPerms
   (其中 authRouter表示需要有权限点的菜单)
3. 路由与菜单的配置是两份 没有做一份呼转的逻辑

---

# 关于菜单

src/menu.ts

```typescript
export const apps: { name: string; key: string }[] = [
  { name: 'app1', key: 'app1' },
  { name: 'app2', key: 'app2' }
]

export type WAMenu = (ItemType & {
  title: string
  key: string
  group?: string // 所属app标识
  permission?: string[] // 权限标识
  icon?: string // icon地址
  children?: WAMenu
})[]
```

如果需要多应用 可以在apps中写多个

菜单遵从的规则

1. 需要关联的权限点写在permission中
2. 需要选中的应用才展示的菜单使用 group 与apps里的key匹配

---
