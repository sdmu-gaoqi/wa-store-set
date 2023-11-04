import { Schema, TableProps } from 'store-operations-ui'
import { isEmpty } from 'wa-utils'
import { isTelNumber } from 'wa-utils/dist/regex/regex'

export const schema: TableProps['schema'] = {
  title: '会员列表',
  form: {
    search: true,
    export: true,
    reset: true,
    fields: [
      {
        type: 'search',
        label: '会员卡号',
        placeholder: '会员卡号',
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
        label: '手机号',
        placeholder: '手机号',
        key: 'phone'
      },
      {
        type: 'select',
        label: '会员等级',
        key: 'level'
      },
      {
        type: 'date',
        label: '开发日期',
        key: 'createTime'
      },
      {
        type: 'date',
        label: '消费日期',
        key: 'payTime'
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
          title: '会员卡号',
          dataIndex: 'card',
          format: 'money'
        },
        {
          title: '姓名',
          dataIndex: 'name',
          format: 'money'
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          format: 'money'
        },
        {
          title: '会员等级',
          dataIndex: 'level'
        },
        {
          title: '所属门店',
          dataIndex: 'store'
        },
        {
          title: '会员状态',
          dataIndex: 'status'
        },
        {
          title: '累计消费金额',
          dataIndex: 'money'
        },
        {
          title: '会员卡余额',
          dataIndex: 'yue'
        },
        {
          title: '积分',
          dataIndex: 'jifen'
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
          options: ['detail'],
          width: 300,
          resizable: true
        }
      ]
    }
  ],
  options: {
    status: [
      { label: '正常', value: 1 },
      { label: '不正常', value: 2 }
    ],
    level: [
      { label: '1级会员', value: 1 },
      { label: '2级会员', value: 2 }
    ]
  }
}

export const editSchema: Schema = {
  type: 'object',
  rules: {
    card: [{ required: true, message: '请输入会员卡号' }],
    name: [{ required: true, message: '请输入姓名' }],
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
    expiration: [{ required: true, message: '请选择有效期' }],
    recharge: [{ required: true, message: '请选择是否充值' }],
    money: [{ required: true, message: '请输入充值金额' }],
    giveMoney: [{ required: true, message: '请输入赠送金额' }],
    payType: [{ required: true, message: '请选择充值方式' }],
    memberType: [{ required: true, message: '请选择会员模式' }]
  },
  properties: {
    'op-group-0': {
      title: '会员模式'
    },
    memberType: {
      title: '会员模式',
      type: 'string',
      props: {
        style: {
          width: '100%'
        },
        options: [
          {
            label: '根据充值金额,设置会员优惠折扣',
            value: '1'
          },
          {
            label: '购买次卡,设置项目优惠次数',
            value: '2'
          }
        ]
      },
      widget: 'radio'
    },
    'op-group-1': {
      title: '会员信息'
    },
    card: {
      title: '会员卡号',
      type: 'string',
      widget: 'input'
    },
    name: {
      title: '姓名',
      type: 'string',
      widget: 'input'
    },
    phone: {
      title: '手机号',
      type: 'string',
      widget: 'input'
    },
    store: {
      title: '开卡门店',
      type: 'string',
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
      },
      widget: 'select'
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
    birthday: {
      title: '生日',
      type: 'string',
      props: {
        placeholder: '请选择日期'
      },
      widget: 'datePicker'
    },
    expiration: {
      title: '有效期',
      type: 'string',
      props: {
        options: [
          {
            label: '永久有效',
            value: '1'
          },
          {
            label: '自定义有效期',
            value: '2'
          }
        ]
      },
      widget: 'radio'
    },
    remark: {
      title: ' 备注',
      type: 'string',
      widget: 'textArea'
    },
    'op-group-2': {
      title: '充值信息'
    },
    recharge: {
      title: '是否充值',
      type: 'string',
      props: {
        options: [
          {
            label: '是',
            value: '1'
          },
          {
            label: '否',
            value: '2'
          }
        ]
      },
      widget: 'radio'
    },
    money: {
      title: '充值金额',
      type: 'number',
      widget: 'input',
      props: {
        type: 'number'
      }
    },
    payType: {
      title: '充值方式',
      type: 'string',
      props: {
        options: [
          {
            label: '收钱吧',
            value: '1'
          },
          {
            label: '支付宝',
            value: '2'
          }
        ]
      },
      widget: 'radio'
    },
    allMoney: {
      title: '卡内总金额',
      type: 'string',
      widget: 'input',
      props: {
        readonly: true,
        bordered: false
      }
    }
  },
  displayType: 'row',
  column: 2,
  maxWidth: '340px'
}
