import { defineComponent } from 'vue'
import { TableRender } from 'store-operations-ui'
import { loginLogSchema } from './config'
import log from '@/servers/log'

const LoginLog = defineComponent({
  render: () => {
    return (
      <TableRender
        schema={loginLogSchema}
        request={(params: Record<string, any>) => {
          const cloneParams = {
            ...params
          }
          if (cloneParams.loginTime) {
            cloneParams.params = {
              beginTime: cloneParams.loginTime,
              endTime: cloneParams.endTime
            }
          }
          delete cloneParams.loginTime
          return log.getLoginLog(cloneParams)
        }}
        tableProps={{
          scroll: { x: 900 }
        }}
      ></TableRender>
    )
  }
})

export default LoginLog
