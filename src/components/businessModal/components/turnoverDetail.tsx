import { TableProps, TableRender } from 'store-operations-ui'
import { defineComponent } from 'vue'

const TurnoverDetail = defineComponent({
  setup() {
    const schema: TableProps['schema'] = {
      title: '',
      form: {
        search: false,
        export: false,
        reset: false,
        fields: []
      },
      tabs: [
        {
          title: '会员订单',
          key: 'one',
          columns: [
            {
              fixed: true,
              title: '订单编号',
              dataIndex: 'time'
            },
            {
              title: '工号',
              dataIndex: 'time'
            },
            {
              title: '技师姓名',
              dataIndex: 'a1'
            },
            {
              title: '项目',
              dataIndex: 'a2'
            },
            {
              title: '排钟',
              dataIndex: 'a2'
            },
            {
              title: '点钟',
              dataIndex: 'a2'
            },
            {
              title: '客数',
              dataIndex: 'a2'
            },
            {
              title: '订单金额',
              dataIndex: 'money'
            },
            {
              title: '实收金额',
              dataIndex: 'money'
            }
          ]
        }
      ]
    }
    return () => {
      return <TableRender schema={schema} />
    }
  }
})

export default TurnoverDetail
