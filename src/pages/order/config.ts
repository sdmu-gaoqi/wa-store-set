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
        key: 'orderNo'
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
          dataIndex: 'orderNo',
          width: 300
        },
        {
          title: '订单金额/元',
          dataIndex: 'money',
          format: 'money'
        },
        {
          title: '优惠金额/元',
          dataIndex: 'discountPrice',
          format: 'money'
        },
        {
          title: '付款明细/元',
          dataIndex: 'receivePrice',
          format: 'money'
        },
        {
          title: '订单状态',
          dataIndex: 'status',
          options: [
            { value: 'SUBMIT', label: '已结算' },
            { value: 'CREATED', label: '未结算' }
          ]
        },
        {
          title: '会员姓名',
          dataIndex: 'memberName'
        },
        {
          title: '手机号',
          dataIndex: 'phone'
        },
        {
          title: '创建日期',
          dataIndex: 'createTime',
          format: 'date'
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
          dataIndex: 'orderNo',
          width: 300
        },
        {
          title: '订单金额/元',
          dataIndex: 'originalPrice',
          format: 'money'
        },
        {
          title: '优惠金额/元',
          dataIndex: 'discountPrice',
          format: 'money'
        },
        {
          title: '付款明细/元',
          dataIndex: 'receivePrice',
          format: 'money'
        },
        {
          title: '订单状态',
          dataIndex: 'status',
          options: [
            { value: 'SUBMIT', label: '已结算' },
            { value: 'CREATED', label: '未结算' }
          ]
        },
        {
          title: '创建日期',
          dataIndex: 'createTime',
          format: 'date'
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
