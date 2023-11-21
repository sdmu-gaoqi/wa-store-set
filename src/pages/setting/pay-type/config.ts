import { TableProps } from 'store-operations-ui'

export const schema: TableProps['schema'] = {
  title: '订单支付方式设置',
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
          title: '序号',
          dataIndex: 'no'
        },
        {
          title: '支付方式',
          dataIndex: 'name'
        },
        {
          title: '启用状态',
          dataIndex: 'status'
        },
        {
          title: '创建日期',
          dataIndex: 'number'
        },
        {
          title: '操作',
          dataIndex: 'options',
          fixed: 'right'
        }
      ]
    }
  ],
  options: {}
}

export const editSchema = {
  type: 'object',
  rules: {
    name: {
      required: true,
      message: '请输入房间名称'
    },
    type: {
      required: true,
      message: '请选择房间类型'
    }
  },
  properties: {
    name: {
      title: '支付方式',
      type: 'string',
      props: {
        placeholder: '请输入'
      },
      required: true,
      message: {
        required: '请输入房间名称'
      },
      widget: 'input'
    },
    number: {
      title: '启用状态',
      type: 'string',
      widget: 'switch'
    },
    remark: {
      title: '备注',
      type: 'string',
      widget: 'textArea',
      span: 24
    }
  },
  displayType: 'row',
  column: 1,
  maxWidth: '200px'
}
