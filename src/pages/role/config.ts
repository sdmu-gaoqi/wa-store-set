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
        label: '角色',
        placeholder: '角色',
        key: 'role'
      },
      {
        type: 'select',
        label: '角色状态',
        placeholder: '角色状态',
        key: 'status'
      },
      {
        type: 'range',
        label: '创建日期',
        placeholder: ['开始日期', '结束日期'],
        key: 'time'
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
          title: '角色名称',
          dataIndex: 'name'
        },
        {
          title: '角色状态',
          dataIndex: 'status'
        },
        {
          title: '用户数',
          dataIndex: 'number'
        },
        {
          title: '创建日期',
          dataIndex: 'createAt'
        },
        {
          title: '修改日期',
          dataIndex: 'editAt'
        },
        {
          title: '备注',
          dataIndex: 'desc'
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
    role: [
      { label: '收银', value: 1 },
      { label: '技师', value: 2 },
      { label: '店长', value: 3 },
      { label: '老板', value: 4 }
    ],
    status: [
      { label: '正常', value: 1 },
      { label: '禁用', value: 2 }
    ]
  }
}

export const editSchema = {
  type: 'object',
  width: '66%',
  rules: {
    name: [{ required: true, message: '请输入角色名称' }]
  },
  properties: {
    name: {
      title: '角色名称',
      type: 'string',
      props: {
        placeholder: '请输入'
      },
      widget: 'input'
    },
    status: {
      title: '角色状态',
      type: 'boolean',
      widget: 'switch'
    },
    'fr-hjqk': {
      title: '备注',
      type: 'string',
      props: {
        placeholder: '请输入'
      },
      widget: 'textArea'
    }
  },
  displayType: 'row',
  maxWidth: '340px'
}
