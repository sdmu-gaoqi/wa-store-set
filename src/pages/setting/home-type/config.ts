export const schema = {
  title: '房间类型',
  form: {
    search: true,
    export: false,
    reset: true,
    fields: [
      {
        type: 'select',
        label: '房间类型',
        key: 'type'
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
          title: '会员编号',
          dataIndex: 'orderId'
        },
        {
          title: '会员卡号',
          dataIndex: 'money',
          format: 'money'
        },
        {
          title: '姓名',
          dataIndex: 'currency',
          format: 'money'
        },
        {
          title: '手机号码',
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
          title: '会员等级',
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
          title: '开卡日期',
          dataIndex: 'cardTime'
        },
        {
          title: '最近消费日期',
          dataIndex: 'payTime'
        },
        {
          title: '备注',
          dataIndex: 'desc'
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
    type: [
      { label: '单人间', value: 1 },
      { label: '双人间', value: 2 },
      { label: '三人间', value: 3 }
    ]
  }
}
