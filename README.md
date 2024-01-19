# 目录结构

```
├── src
│   ├── assets
│   │    └── react.svg
│   ├── store
│   │     └── modules // 模块数据
│   ├── services
│   ├── pages
│   ├── components
│   ├── env
│   ├── constant // 常量
│   ├── hooks
│   ├── types // 类型
│   ├── App.vue
│   ├── style.css
│   ├── main.js
│   ├── menu.ts // 菜单配置
│   ├── route.ts // route配置
│   ├── utils // 工具函数集合
│   ├── mock // mock接口
│   └── logo.svg
├── index.html
├── package.json
└── vite.config.js
```

# 约定行为

## 关于路由

src/route.ts
路由全部写在这个文件里
路由 layout下路由(权限路由 + 无权限路由) + 基础路由(Login/Register 等无layout路由)组成

```typescript
export type WARoute = RouteRecordRaw & {
  name: string
  meta: {
    permission?: string[] // 权限标识
    key: string // 唯一标识
    notNeedLogin?: boolean // 是否需要登录(route跳转不需要判断是否登录参数)
  }

/**
 * @description 这里初始化系统获取用户权限 可替换成实际的权限接口 注意权限返回的是约定好的 字符集合 比如['cs:xxxxxx'] 超管可约定一个超管字符集['*\/*']表示拥有所有权限
 * @description 这里也可以加入获取用户信息的步骤
*/
const initPerms = async () => {
  const store = useStore()
  const { dispatch, state } = store
  const perms = await getPerms()
  const menus = transformMenuByPerms(menu, perms)
  dispatch('userInfo/setPerms', { data: perms }) // 存在全局状态
  dispatch('common/changeMenus', { data: menus }) // 修改全局菜单
  transformRoute(perms) // vue-route 根据权限操作route
  return {
    perms
  }
}

```

路由的定义遵从的规则

1. 需要关联权限的需要把权限点写在permission中
2. 如果菜单与路由需要根据接口过滤权限 逻辑写在 initPerms
   (其中 authRouter表示需要有权限点的菜单)
3. 路由与菜单的配置是两份 没有做一份呼转的逻辑

---

## 关于菜单

src/menu.ts

```typescript
/**
 * @description app为空或只有一个时不会头部展示app列表
 * */
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

## 关于环境

不同环境配置在 env目录下
注意 暴露给页面使用的需要加VITE前缀
package里有不同环境的打包方式

## 关于mock

mock预设为 test 与 prod(根据import.meta.env.MODE 决定 prod模式时 使用的是prod文件下的mock 其他的都是用的test下的mock)
需要增加更多环境支持可以在 mock/index.ts修改

## 关于插件

内设了几款插件
wa-menu 右键 src/locales/lang.xlsx可以 执行xlsx自动转ts的脚本
wa-language-tip 丰富i18n 在编写时的提示能力
