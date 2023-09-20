import { defineComponent, reactive } from 'vue'
import { TableRender } from 'store-operations-ui'
import { loginLogSchema } from './config'
import log from '@/servers/log'

const data = reactive({})
const onSearch = (data: any) => {
  log.getLoginLog({
    pageNum: 1,
    pageSize: 10,
    ...data
  })
}

const LoginLog = defineComponent({
  render: () => {
    return (
      <TableRender
        schema={loginLogSchema}
        onSearch={onSearch}
        request={log.getLoginLog}
      ></TableRender>
    )
  }
})

export default LoginLog
