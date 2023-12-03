import { TableProps, TableRender } from 'store-operations-ui'
import { defineComponent } from 'vue'

const TurnoverDetail = defineComponent({
  setup() {
    const schema: TableProps['schema'] = {
      title: '',
      form: {
        search: true,
        export: false,
        reset: false,
        fields: [
          {
            type: 'search',
            label: '订单编号',
            key: 'orderNo'
          }
        ]
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
              title: '非会员客数',
              dataIndex: 'a1'
            },
            {
              title: '会员客数',
              dataIndex: 'a2'
            },
            {
              title: '订单金额',
              dataIndex: 'a2'
            },
            {
              title: '实收金额',
              dataIndex: 'a2'
            },
            {
              title: '支付方式',
              dataIndex: 'a2'
            },
            {
              title: '会员卡消费',
              dataIndex: 'money'
            },
            {
              title: '补充金额',
              dataIndex: 'money'
            },
            {
              title: '补充金额支付方式',
              dataIndex: 'options'
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
