import { defineComponent } from 'vue'
import { TableRender } from 'store-operations-ui'
import { operateLogSchema } from './config'
import log from '@/servers/log'

const OperateLog = defineComponent({
  render: () => {
    return (
      <TableRender
        schema={operateLogSchema}
        request={log.getOperateLog}
        tableProps={{
          scroll: { x: 1200 }
        }}
      ></TableRender>
    )
  }
})

export default OperateLog
