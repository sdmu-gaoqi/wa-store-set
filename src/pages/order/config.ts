import { TableProps } from 'store-operations-ui'

export const schema: TableProps['schema'] = {
  title: '订单列表',
  form: {
    search: true,
    export: false,
    reset: true,
    fields: [
      {
        type: 'search',
        label: '订单编号',
        key: 'orderId'
      },
      {
        type: 'date',
        label: '创建日期',
        key: 'createTime'
      }
    ]
  },
  tabKey: 'settleType',
  tabs: [
    {
      title: '会员订单',
      key: '1',
      columns: [
        {
          fixed: true,
          title: '订单编号',
          dataIndex: 'orderId'
        },
        {
          title: '订单金额/元',
          dataIndex: 'money',
          format: 'money'
        },
        {
          title: '优惠金额/元',
          dataIndex: 'currency',
          format: 'money'
        },
        {
          title: '付款明细/元',
          dataIndex: 'detail',
          format: 'money'
        },
        {
          title: '订单状态',
          dataIndex: 'status'
        },
        {
          title: '会员姓名',
          dataIndex: 'name'
        },
        {
          title: '会员等级',
          dataIndex: 'level'
        },
        {
          title: '手机号',
          dataIndex: 'phone'
        },
        {
          title: '房间号',
          dataIndex: 'homeCode'
        },
        {
          title: '会员卡余额',
          dataIndex: 'cardMoney'
        },
        {
          title: '创建日期',
          dataIndex: 'createTime'
        },
        {
          fixed: 'right',
          title: '操作',
          dataIndex: 'options',
          options: ['detail']
        }
      ]
    },
    {
      title: '非会员订单',
      key: '0',
      columns: [
        {
          fixed: true,
          title: '订单编号',
          dataIndex: 'orderId'
        },
        {
          title: '订单金额/元',
          dataIndex: 'money',
          format: 'money'
        },
        {
          title: '优惠金额/元',
          dataIndex: 'currency',
          format: 'money'
        },
        {
          title: '付款明细/元',
          dataIndex: 'detail',
          format: 'money'
        },
        {
          title: '订单状态',
          dataIndex: 'status'
        },
        {
          title: '房间号',
          dataIndex: 'homeCode'
        },
        {
          title: '创建日期',
          dataIndex: 'createTime'
        },
        {
          fixed: 'right',
          title: '操作',
          dataIndex: 'options',
          options: ['detail']
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
