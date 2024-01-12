import { env } from '@/constant'
import { message } from 'ant-design-vue'
import axios, { AxiosRequestConfig } from 'axios'
import { cookie } from 'wa-utils'

message.config({
  maxCount: 1
})

const _request = axios.create({
  baseURL: env.VITE_BASE_REQUEST,
  timeout: 150000,
  withCredentials: true
})

class Request {
  public commonData: any = {}
  constructor() {
    _request.interceptors.request.use((request) => {
      request.headers['Authorization'] = `Bearer ${cookie.get('Admin-Token')}`
      request.headers['Content-Type'] = `application/json`
      request.params = {
        ...(request.params || {})
      }
      return request
    })

    _request.interceptors.response.use(
      // @ts-ignore
      // eslint-disable-next-line
      (res) => {
        let data: Record<string, any> = res.data
        return Promise.resolve(data)
      },
      function (error) {
        message.error('网络错误, 请稍后再试~')
        return Promise.reject(error)
      }
    )
  }

  request = async <T>(data: AxiosRequestConfig<any>) => {
    try {
      const res = (await _request.request(data)) as T
      return res
    } catch (err: any) {
      message.error(err?.msg || err.message || '网络错误, 请稍后再试~')
    }
  }

  upDateCommonData = (data: any) => {
    this.commonData = {
      ...this.commonData,
      ...data
    }
  }
}

const request = new Request()

export default request
