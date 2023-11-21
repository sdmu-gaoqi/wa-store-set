import store from '@/store/store'
import { TableProps } from 'store-operations-ui'
import { isEmpty } from 'wa-utils'
import { isTelNumber } from 'wa-utils/dist/regex/regex'

import { Store } from 'store-request'
import { PostMap } from '@/types'

const storeRequest = new Store()

export const schema: TableProps['schema'] = {
  title: '员工列表',
  form: {
    search: true,
    export: false,
    reset: true,
    fields: [
      {
        type: 'search',
        label: '工号',
        placeholder: '工号',
        key: 'userId'
      },
      {
        type: 'search',
        label: '姓名',
        placeholder: '姓名',
        key: 'userName'
      },
      {
        type: 'search',
        label: '手机号码',
        placeholder: '手机号码',
        key: 'phonenumber'
      },
      {
        type: 'select',
        label: '角色',
        key: 'roleId'
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
          title: '员工工号',
          dataIndex: 'userId'
        },
        {
          title: '姓名',
          dataIndex: 'userName'
        },
        {
          title: '手机号码',
          dataIndex: 'phonenumber'
        },
        {
          title: '角色',
          dataIndex: 'roleId'
        },
        {
          title: '性别',
          dataIndex: 'sex',
          options: [
            { label: '男', value: '0' },
            {
              label: '女',
              value: '1'
            }
          ]
        },
        {
          title: '帐号状态',
          dataIndex: 'status'
        },
        {
          title: '所属门店',
          dataIndex: 'storeName'
        },
        {
          title: '创建日期',
          dataIndex: 'createTime',
          format: 'date'
        },
        {
          title: '入职日期',
          dataIndex: 'ruzhiAt'
        },
        {
          title: '离职日期',
          dataIndex: 'lizhiAt'
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
    roleId: []
  }
}

export const editSchema = {
  type: 'object',
  rules: {
    userName: [{ required: true, message: '请输入员工姓名' }],
    code: [{ required: true, message: '请输入工号' }],
    phonenumber: [
      { required: true },
      {
        validator: (_: any, value: string) => {
          if (isEmpty(value)) {
            return Promise.resolve('')
          } else if (!isTelNumber(value)) {
            return Promise.reject('请输入正确的手机号')
          }
          return Promise.resolve('')
        }
      }
    ],
    password: [{ required: true, message: '请输入登陆密码' }],
    role: [{ required: true, message: '请选择角色' }],
    time: [{ required: true, message: '请选择入职日期' }],
    store: [{ required: true, message: '请选择所属门店' }]
  },
  properties: {
    isLogin: {
      title: '是否登录账号',
      defaultValue: true,
      widget: 'switch'
    },
    userName: {
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
    phonenumber: {
      title: '手机号',
      type: 'string',
      props: {
        placeholder: '请输入'
      },
      widget: 'input'
    },
    isTechnician: {
      type: 'string',
      props: {
        placeholder: '请选择',
        options: PostMap
      },
      defaultValue: true,
      title: '是否技师',
      widget: 'switch'
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
        options: [],
        placeholder: '请选择'
      }
    },
    // store: {
    //   title: '所属门店',
    //   type: 'select',
    //   search: {
    //     request: storeRequest.list,
    //     key: 'string', // 搜索的key
    //     label: 'name', // label字段,
    //     value: 'code', // value字段
    //     dataKey: 'data' // 渲染的data
    //   },
    //   props: {
    //     placeholder: '请输入'
    //   },
    //   widget: 'searchSelect'
    // },
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
      widget: 'switch',
      defaultValue: true
    },
    sex: {
      title: '性别',
      type: 'string',
      defaultValue: '0',
      props: {
        options: [
          {
            label: '男',
            value: '0'
          },
          {
            label: '女',
            value: '1'
          }
        ]
      },
      widget: 'radio'
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
