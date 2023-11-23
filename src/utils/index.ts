import { cookie, isEmpty } from 'wa-utils'

export const isLogin = () => {
  return !isEmpty(cookie.get('Admin-Token'))
}

export const logout = () => {
  cookie.remove('Admin-Token')
}

export function getParameterByName(name = '', byHash = false) {
  // @ts-nocheck
  // eslint-disable-next-line no-param-reassign
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`)
  let results = regex.exec(location[byHash ? 'hash' : 'search'])
  // eslint-disable-next-line eqeqeq
  return results == null ? '' : decodeURIComponent(results[1])
}

export const numberRule = {
  validator: (rule: any, value: any, callback: any) => {
    if (isEmpty(value)) {
      return Promise.resolve()
    } else {
      const n = String(value)?.split('.')[1]
      if (n.length > 2) {
        return Promise.reject('小数位不能超过两位')
      }
      return Promise.resolve()
    }
  }
}
export function formatMoney(value: any) {
  if (!value) {
    return '0'
  }
  // 将参数转换为浮点数
  let floatValue = parseFloat(value || 0)

  // 检查是否是有效的数值
  if (isNaN(floatValue)) {
    return 'Invalid value'
  }

  // 使用toFixed()方法将浮点数转换为字符串，并指定小数位数为2
  let formattedValue = floatValue.toFixed(2)

  // 返回格式化后的字符串
  return formattedValue
}
