import { defineComponent } from 'vue'
import { TableRender } from 'store-operations-ui'
import { operateLogSchema } from './config'

const OperateLog = defineComponent({
  render: () => {
    return <TableRender schema={operateLogSchema}></TableRender>
  }
})

export default OperateLog
