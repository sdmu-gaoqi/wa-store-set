import { TableProps } from 'store-operations-ui'

export const schema: TableProps['schema'] = {
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
          title: '序号',
          dataIndex: 'no'
        },
        {
          title: '房间类型',
          dataIndex: 'type'
        },
        {
          title: '容纳客数',
          dataIndex: 'number'
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
    type: [
      { label: '单人间', value: 1 },
      { label: '双人间', value: 2 },
      { label: '三人间', value: 3 }
    ]
  }
}

export const editSchema = {
  rules: {
    type: [{ required: true, message: '请输入房间类型' }],
    num: [{ required: true, message: '请输入容纳客数' }]
  },
  type: 'object',
  properties: {
    type: {
      title: '房间类型',
      type: 'string',
      props: {
        placeholder: '请输入'
      },
      required: false,
      message: {
        required: ''
      },
      widget: 'input'
    },
    num: {
      title: '容纳客数',
      type: 'number',
      props: {
        placeholder: '请输入',
        type: 'number'
      },
      widget: 'input'
    },
    description: {
      title: '备注',
      type: 'string',
      widget: 'textArea'
    }
  },
  displayType: 'row',
  column: 2,
  maxWidth: '340px'
}
