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
        label: '工号',
        key: 'no',
        placeholder: '工号'
      },
      {
        type: 'search',
        label: '姓名',
        key: 'userName',
        placeholder: '姓名'
      },
      {
        type: 'search',
        label: '手机号码',
        key: 'phone',
        placeholder: '手机号码'
      },
      {
        type: 'date',
        label: '系统登陆时间',
        key: 'loginTime'
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
          dataIndex: 'userName'
        },
        {
          title: '手机号码',
          dataIndex: 'currency'
        },
        {
          title: '角色',
          dataIndex: 'detail'
        },
        {
          title: '系统登陆日期',
          dataIndex: 'loginTime'
        },
        {
          title: '登陆IP',
          dataIndex: 'ipaddr'
        },
        {
          title: '登陆状态',
          dataIndex: 'status',
          options: [
            { label: '成功', value: '0' },
            { label: '失败', value: '1' }
          ]
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
          dataIndex: 'operId',
          width: 100
        },
        {
          title: '系统模块',
          dataIndex: 'title',
          width: 150
        },
        {
          title: '操作类型',
          dataIndex: 'requestMethod',
          width: 100
        },
        {
          title: '操作人员',
          dataIndex: 'operName',
          width: 100
        },
        {
          title: '工号',
          dataIndex: '',
          width: 100
        },
        {
          title: '操作IP',
          dataIndex: 'operIp',
          width: 200
        },
        {
          title: '操作日期',
          dataIndex: 'operTime',
          width: 200
        },
        {
          title: '操作状态',
          dataIndex: 'jsonResult',
          width: 300,
          fixed: 'right'
        }
        // {
        //   title: '操作',
        //   dataIndex: 'level'
        // }
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
