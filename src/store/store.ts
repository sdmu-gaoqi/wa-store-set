import { Store, createStore, useStore as baseUseStore } from 'vuex'
import userInfo, { UserState } from './modules/userInfo'
import common, { CommonState } from './modules/common'
import { InjectionKey } from 'vue'

export const key: InjectionKey<
  Store<{
    userInfo: UserState
    common: CommonState
  }>
> = Symbol()

// 创建一个新的 store 实例
export const store = createStore({
  modules: {
    userInfo,
    common
  }
})

/**
 * 这里本应该返回State的所有类型,暂用unknown代替
 * @returns Store<State>
 */
export function useStore(): Store<{
  userInfo: UserState
  common: CommonState
}> {
  return baseUseStore(key)
}
