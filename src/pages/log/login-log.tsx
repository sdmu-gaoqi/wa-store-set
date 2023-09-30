import { defineComponent } from 'vue'
import { TableRender } from 'store-operations-ui'
import { loginLogSchema } from './config'
import log from '@/servers/log'

const LoginLog = defineComponent({
  render: () => {
    return (
      <TableRender schema={loginLogSchema} request={log.getLoginLog as any}>
        <div>aaaaaa</div>
      </TableRender>
    )
  }
})

export default LoginLog
