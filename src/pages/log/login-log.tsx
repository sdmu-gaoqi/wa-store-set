import { defineComponent } from 'vue'
import { TableRender } from 'store-operations-ui'
import { loginLogSchema } from './config'
import log from '@/servers/log'

const LoginLog = defineComponent({
  render: () => {
    return (
      <TableRender
        schema={loginLogSchema}
        request={log.getLoginLog}
      ></TableRender>
    )
  }
})

export default LoginLog
