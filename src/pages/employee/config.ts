import { TableProps } from 'store-operations-ui'
import { isEmpty } from 'wa-utils'
import { isTelNumber } from 'wa-utils/dist/regex/regex'

export const schema: TableProps['schema'] = {
  title: '员工列表',
  form: {
    search: true,
    export: true,
    reset: true,
    fields: [
      {
        type: 'search',
        label: '工号',
        placeholder: '工号',
        key: 'card'
      },
      {
        type: 'search',
        label: '姓名',
        placeholder: '姓名',
        key: 'name'
      },
      {
        type: 'search',
        label: '手机号码',
        placeholder: '手机号码',
        key: 'phone'
      },
      {
        type: 'select',
        label: '角色',
        key: 'role'
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
    role: [
      { label: '收银', value: 1 },
      { label: '技师', value: 2 },
      { label: '店长', value: 3 },
      { label: '老板', value: 4 }
    ]
  }
}

export const editSchema = {
  type: 'object',
  rules: {
    name: [{ required: true, message: '请输入员工姓名' }],
    code: [{ required: true, message: '请输入工号' }],
    phone: [
      {
        validator: (_: any, value: string) => {
          if (isEmpty(value)) {
            return Promise.reject('请输入手机号码')
          } else if (!isTelNumber(value)) {
            return Promise.reject('请输入正确的手机号')
          }
          return Promise.resolve('')
        }
      }
    ],
    password: [{ required: true, message: '请输入登陆密码' }],
    role: [{ required: true, message: '请选择角色' }],
    time: [{ required: true, message: '请选择入职日期' }]
  },
  properties: {
    name: {
      title: '姓名',
      type: 'string',
      props: {
        placeholder: '请输入'
      },
      widget: 'input'
    },
    code: {
      title: '工号',
      type: 'string',
      props: {
        placeholder: '请输入'
      },
      widget: 'input'
    },
    phone: {
      title: '手机号',
      type: 'string',
      props: {
        placeholder: '请输入'
      },
      widget: 'input'
    },
    password: {
      title: '登陆密码',
      type: 'string',
      props: {
        placeholder: '请输入'
      },
      widget: 'input'
    },
    role: {
      title: '角色',
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
    store: {
      title: '所属门店',
      type: 'string',
      props: {
        placeholder: '请输入',
        readonly: true,
        bordered: false
      },
      widget: 'input'
    },
    time: {
      title: '入职日期',
      type: 'string',
      props: {
        placeholder: '请选择日期'
      },
      widget: 'datePicker'
    },
    status: {
      title: '账号状态',
      type: 'boolean',
      widget: 'switch'
    },
    gender: {
      title: '性别',
      type: 'string',
      props: {
        options: [
          {
            label: '男',
            value: '1'
          },
          {
            label: '女',
            value: '2'
          }
        ]
      },
      widget: 'radio'
    },
    'fr-8046': {
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
