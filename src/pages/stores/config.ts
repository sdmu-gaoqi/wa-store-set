import { TableProps } from 'store-operations-ui'

export const schema: TableProps['schema'] = {
  title: '角色列表',
  form: {
    search: true,
    export: false,
    reset: true,
    fields: [
      {
        type: 'select',
        label: '品牌',
        placeholder: '品牌',
        key: 'banner'
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
          dataIndex: 'no'
        },
        {
          title: '品牌名称',
          dataIndex: 'bannerName'
        },
        {
          title: '门店名称',
          dataIndex: 'storeName'
        },
        {
          title: '门店地址',
          dataIndex: 'address'
        },
        {
          title: '门店座机',
          dataIndex: 'phone1'
        },
        {
          title: '门店手机号',
          dataIndex: 'phone2'
        },
        {
          title: '营业时间',
          dataIndex: 'yyAt'
        },
        {
          title: '创建日期',
          dataIndex: 'createAt'
        },
        {
          title: '操作',
          dataIndex: 'options',
          fixed: 'right'
        }
      ]
    }
  ],
  options: {
    banner: [
      { label: '乐益生', value: 1 },
      { label: '盲点', value: 2 }
    ]
  }
}
