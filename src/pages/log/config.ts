import { TableProps } from 'store-operations-ui'

export const loginLogSchema: TableProps['schema'] = {
  title: '系统登录日志',
  form: {
    search: true,
    export: false,
    reset: true,
    fields: [
      {
        type: 'search',
        label: '关键字',
        key: 'name',
        placeholder: '工号/姓名/手机号码'
      },
      {
        type: 'date',
        label: '系统登陆时间',
        key: 'time'
      }
    ]
  },
  tabs: [
    {
      title: '系统登录日志',
      key: 'one',
      columns: [
        {
          fixed: true,
          title: '员工工号',
          dataIndex: 'orderId'
        },
        {
          title: '姓名',
          dataIndex: 'money',
          format: 'money'
        },
        {
          title: '手机号码',
          dataIndex: 'currency',
          format: 'money'
        },
        {
          title: '角色',
          dataIndex: 'detail',
          format: 'money'
        },
        {
          title: '系统登陆日期',
          dataIndex: 'status'
        },
        {
          title: '登陆IP',
          dataIndex: 'name'
        },
        {
          title: '登陆状态',
          dataIndex: 'level',
          fixed: 'right'
        }
      ]
    }
  ]
}

export const operateLogSchema = {
  title: '系统操作日志',
  form: {
    search: true,
    export: false,
    reset: true,
    fields: [
      {
        type: 'search',
        label: '关键字',
        placeholder: '操作人员/工号',
        key: 'name'
      }
    ]
  },
  tabs: [
    {
      title: '系统操作日志',
      key: 'one',
      columns: [
        {
          fixed: true,
          title: '日志编号',
          dataIndex: 'orderId'
        },
        {
          title: '系统模块',
          dataIndex: 'money',
          format: 'money'
        },
        {
          title: '操作类型',
          dataIndex: 'currency',
          format: 'money'
        },
        {
          title: '操作人员',
          dataIndex: 'detail',
          format: 'money'
        },
        {
          title: '工号',
          dataIndex: 'status'
        },
        {
          title: '操作IP',
          dataIndex: 'name'
        },
        {
          title: '操作日期',
          dataIndex: 'level'
        },
        {
          title: '操作状态',
          dataIndex: 'level'
        },
        {
          title: '操作',
          dataIndex: 'level'
        }
      ]
    }
  ]
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
