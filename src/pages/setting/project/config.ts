import { TableProps } from 'store-operations-ui'

export const schema: TableProps['schema'] = {
  title: '服务项目列表',
  form: {
    search: true,
    export: false,
    reset: true,
    fields: [
      {
        type: 'search',
        label: '服务项目',
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
          title: '项目编号',
          dataIndex: 'no'
        },
        {
          title: '服务项目',
          dataIndex: 'name'
        },
        {
          title: '项目价格 /元',
          dataIndex: 'currency'
        },
        {
          title: '项目时长/分钟',
          dataIndex: 'time'
        },
        {
          title: '启用状态',
          dataIndex: 'status'
        },
        {
          title: '所属门店',
          dataIndex: 'store'
        },
        {
          title: '排钟提成/元',
          dataIndex: 'number1'
        },
        {
          title: '点钟提成/元',
          dataIndex: 'number2'
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
          title: '操作',
          dataIndex: 'options',
          fixed: 'right'
        }
      ]
    }
  ],
  options: {
    status: [
      { label: '正常', value: 1 },
      { label: '禁用', value: 2 }
    ]
  }
}

export const editSchema = {
  type: 'object',
  rules: {
    project: [{ required: true, message: '请输入' }],
    pirce: [{ required: true, message: '请输入' }],
    duration: [{ required: true, message: '请输入' }],
    store: [{ required: true, message: '请选择' }]
  },
  properties: {
    project: {
      title: '服务项目',
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
    pirce: {
      title: '项目价格',
      type: 'number',
      props: {
        placeholder: '请输入',
        type: 'number'
      },
      widget: 'input'
    },
    duration: {
      title: '项目时长',
      type: 'number',
      props: {
        placeholder: '请输入',
        suffix: 'time'
      },
      widget: 'input'
    },
    store: {
      title: '所属门店',
      type: 'array',
      widget: 'multiSelect',
      props: {
        options: [
          {
            label: 'A',
            value: 'A'
          },
          {
            label: 'B',
            value: 'B'
          }
        ],
        placeholder: '请选择'
      }
    },
    commission: {
      title: '项目排钟提成',
      type: 'number',
      props: {
        placeholder: '请输入',
        suffix: 'money',
        type: 'number'
      },
      widget: 'input'
    },
    commission2: {
      title: '项目点钟提成',
      type: 'number',
      props: {
        placeholder: '请输入',
        suffix: 'money',
        type: 'number'
      },
      widget: 'input'
    },
    remark: {
      title: '备注',
      type: 'string',
      props: {
        placeholder: '请输入'
      },
      widget: 'textArea'
    }
  },
  displayType: 'row',
  column: 2,
  maxWidth: '340px'
}
