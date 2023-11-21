import { TableProps } from 'store-operations-ui'

export const schema: TableProps['schema'] = {
  title: '角色列表',
  form: {
    search: true,
    export: false,
    reset: true,
    fields: [
      {
        type: 'search',
        label: '品牌',
        placeholder: '品牌',
        key: 'headquartersCode'
      },
      {
        type: 'search',
        label: '门店编号',
        placeholder: '门店编号',
        key: 'code'
      },
      {
        type: 'search',
        label: '门店名称',
        key: 'name'
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
          title: '门店编号',
          dataIndex: 'code',
          width: 100
        },
        {
          title: '品牌名称',
          dataIndex: 'headquartersCode'
        },
        {
          title: '门店名称',
          dataIndex: 'name'
        },
        {
          title: '门店地址',
          dataIndex: 'address'
        },
        {
          title: '门店座机',
          dataIndex: 'tel'
        },
        {
          title: '门店手机号',
          dataIndex: 'phone'
        },
        {
          title: '营业时间',
          dataIndex: 'businessHours'
        },
        {
          title: '创建日期',
          dataIndex: 'createTime'
        }
        // {
        //   title: '操作',
        //   dataIndex: 'options',
        //   fixed: 'right'
        // }
      ]
    }
  ],
  options: {}
}
