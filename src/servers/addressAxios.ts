import { Request } from 'wa-utils'

const appKey = 'cd0a8016f70d36c1a686d9af7042db97'

const axios = new Request({
  baseUrl: 'https://restapi.amap.com/'
}).instence

export const getAddressRequest = () => {
  return axios.get('/v3/config/district', {
    params: {
      key: appKey,
      subdistrict: 3
    }
  })
}
