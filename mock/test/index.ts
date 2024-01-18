import { MockMethod } from 'vite-plugin-mock'

// @ts-ignore
const testMock: MockMethod = [
  {
    url: '/api/login',
    method: 'post',
    timeout: 1000,
    response: ({ data }: any) => {
      console.log('登录请求数据 =>', data)
      return {
        code: 0,
        data: {
          token: 'thisIsToken'
        }
      }
    }
  },
  {
    url: '/api/perm',
    method: 'post',
    timeout: 1000,
    response: ({ data }: any) => {
      console.log('登录请求数据 =>', data)
      return {
        code: 0,
        data: ['perm-1']
      }
    }
  }
]

export default testMock
