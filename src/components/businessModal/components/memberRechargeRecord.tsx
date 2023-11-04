import { TableProps, TableRender } from 'store-operations-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const schema: TableProps['schema'] = {
      title: '',
      form: {
        search: true,
        export: true,
        reset: false,
        fields: [
          {
            key: 'time',
            type: 'date',
            label: '充值日期'
          }
        ]
      },
      tabs: [
        {
          title: '会员充值记录',
          key: 'one',
          columns: [
            {
              fixed: true,
              title: '序号',
              dataIndex: 'card',
              format: 'money'
            },
            {
              title: '会员卡号',
              dataIndex: 'name',
              format: 'money'
            },
            {
              title: '姓名',
              dataIndex: 'phone',
              format: 'money'
            },
            {
              title: '手机号',
              dataIndex: 'level'
            },
            {
              title: '会员类型',
              dataIndex: 'store'
            },
            {
              title: '充值金额',
              dataIndex: 'status'
            },
            {
              title: '赠送金额',
              dataIndex: 'money'
            },
            {
              title: '充值方式',
              dataIndex: 'yue'
            },
            {
              title: '充值日期',
              dataIndex: 'jifen'
            }
          ]
        }
      ],
      options: {
        status: [
          { label: '正常', value: 1 },
          { label: '不正常', value: 2 }
        ],
        level: [
          { label: '1级会员', value: 1 },
          { label: '2级会员', value: 2 }
        ]
      }
    }
    return () => <TableRender schema={schema} />
  }
})
