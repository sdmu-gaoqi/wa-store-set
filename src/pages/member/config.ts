import { MemberType, memberTypes } from '@/types'
import { Schema, TableProps } from 'store-operations-ui'
import { isEmpty } from 'wa-utils'
import { isTelNumber } from 'wa-utils/dist/regex/regex'
import { Store } from 'store-request'

const storeRequest = new Store()

export const schema: TableProps['schema'] = {
  title: '会员列表',
  form: {
    search: true,
    export: false,
    reset: true,
    fields: [
      {
        type: 'search',
        label: '会员卡号',
        placeholder: '会员卡号',
        key: 'searchMemberNo'
      },
      {
        type: 'search',
        label: '姓名',
        placeholder: '姓名',
        key: 'searchMemberName'
      },
      {
        type: 'search',
        label: '手机号',
        placeholder: '手机号',
        key: 'searchPhone'
      },
      {
        type: 'select',
        label: '会员类型',
        key: 'memberType'
      },
      {
        type: 'range',
        label: '开卡日期',
        placeholder: ['开始时间', '结束时间'],
        key: 'time',
        format: 'timestamp',
        names: ['openStartTime', 'openEndTime']
      },
      {
        type: 'range',
        label: '消费日期',
        placeholder: ['开始时间', '结束时间'],
        key: 'latestSpendTime',
        format: 'timestamp',
        names: ['spendStartTime', 'spendEndTime']
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
          dataIndex: 'memberNo',
          ellipsis: true
        },
        {
          title: '姓名',
          dataIndex: 'memberName'
        },
        {
          title: '手机号',
          dataIndex: 'phone'
        },
        {
          title: '会员类型',
          dataIndex: 'memberType',
          options: memberTypes
        },
        {
          title: '优惠方式',
          dataIndex: 'discountRate'
        },
        {
          title: '会员状态',
          dataIndex: 'status'
        },
        {
          title: '累计消费金额',
          dataIndex: 'totalSpendBalance',
          format: 'money'
        },
        {
          title: '会员卡余额',
          dataIndex: 'availableBalance',
          format: 'money'
        },
        {
          title: '开卡日期',
          dataIndex: 'openCardTime',
          format: 'time',
          width: 200
        },
        {
          title: '最近消费日期',
          dataIndex: 'latestSpendTime',
          format: 'time',
          width: 200
        },
        {
          title: '备注',
          dataIndex: 'remark'
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
      { label: '正常', value: 'ENABLED' },
      { label: '不正常', value: 'UNENABLED' }
    ],
    memberType: [
      { label: '折扣卡', value: 1 },
      { label: '次卡', value: 2 }
    ]
  }
}

export const editSchema: Schema = {
  type: 'object',
  rules: {
    memberNo: [{ required: true, message: '请输入会员卡号' }],
    memberName: [{ required: true, message: '请输入姓名' }],
    phone: [
      { required: true, message: '请输入手机号码' },
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
    expiration: [{ required: true, message: '请选择有效期' }],
    recharge: [{ required: true, message: '请选择是否充值' }],
    rechargeBalance: [{ required: true, message: '请输入充值金额' }],
    payMethod: [{ required: true, message: '请选择支付方式' }],
    discountRate: [{ required: true, message: '请输入折扣' }],
    memberType: [{ required: true, message: '请选择会员模式' }],
    rewardTimes: [{ required: true, message: '请输入优惠次数' }]
  },
  properties: {
    'op-group-1': {
      title: '会员信息'
    },
    memberNo: {
      title: '会员卡号',
      type: 'string',
      widget: 'input'
    },
    memberName: {
      title: '姓名',
      type: 'string',
      widget: 'input'
    },
    phone: {
      title: '手机号',
      type: 'string',
      widget: 'input'
    },
    discountRate1: {
      title: '折扣',
      type: 'string',
      widget: 'input',
      defaultValue: 0.9,
      props: {
        // type: 'number'
        options: [
          {
            label: '0.7',
            value: 0.7
          },
          {
            label: '0.8',
            value: 0.8
          },
          {
            label: '0.85',
            value: 0.85
          },
          {
            label: '0.9',
            value: 0.9
          },
          {
            label: '0.95',
            value: 0.95
          }
        ]
      },
      'ui:hidden':
        "formState.value.memberType == '2' || !formState.value.memberId"
    },
    sex: {
      title: '性别',
      type: 'string',
      defaultValue: 1,
      span: 12,
      props: {
        options: [
          {
            label: '男',
            value: 1
          },
          {
            label: '女',
            value: 0
          }
        ]
      },
      widget: 'radio'
    },
    birthDate: {
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
      defaultValue: '1',
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
    youxiao: {
      title: '自定义有效期',
      type: 'string',
      widget: 'datePicker',
      'ui:hidden': 'formState.value.expiration !== "2"'
    },
    remark: {
      title: ' 备注',
      type: 'string',
      widget: 'textArea',
      span: 24
    },
    memberId: {},
    'op-group-2': {
      title: '充值信息',
      'ui:hidden': 'formState.value.memberId'
    },
    memberType: {
      title: '会员类型',
      type: 'string',
      widget: 'radio',
      span: 24,
      defaultValue: MemberType.折扣卡,
      props: {
        options: [
          {
            label: 'A: 会员折扣卡',
            value: MemberType.折扣卡
          },
          {
            label: 'B: 会员次卡',
            value: MemberType.次卡
          }
        ]
      },
      'ui:hidden': 'formState.value.memberId'
    },
    discountRate: {
      title: '折扣',
      type: 'string',
      widget: 'input',
      span: 13,
      defaultValue: 0.9,
      props: {
        // type: 'number'
        options: [
          {
            label: '0.7',
            value: 0.7
          },
          {
            label: '0.8',
            value: 0.8
          },
          {
            label: '0.85',
            value: 0.85
          },
          {
            label: '0.9',
            value: 0.9
          },
          {
            label: '0.95',
            value: 0.95
          }
        ]
      },
      'ui:hidden':
        "formState.value.memberType == '2' || !!formState.value.memberId"
    },
    rechargeBalance: {
      title: '充值金额',
      type: 'number',
      span: 13,
      widget: 'input',
      props: {
        type: 'number'
      },
      'ui:hidden': 'formState.value.memberId'
    },
    giveBalance: {
      title: '赠送金额',
      type: 'number',
      span: 13,
      widget: 'input',
      props: {
        type: 'number'
      },
      'ui:hidden':
        "formState.value.memberType == '2' || formState.value.memberId"
    },
    rewardTimes: {
      title: '优惠次数',
      type: 'number',
      span: 13,
      widget: 'input',
      props: {
        type: 'number',
        precision: 0
      },
      'ui:hidden':
        "formState.value.memberType == '1' || formState.value.memberId"
    },
    giveTimes: {
      title: '赠送次数',
      type: 'number',
      span: 13,
      widget: 'input',
      props: {
        type: 'number',
        precision: 0
      },
      'ui:hidden':
        "formState.value.memberType == '1' || formState.value.memberId"
    },
    payMethod: {
      title: '充值方式',
      type: 'string',
      defaultValue: '1',
      span: 13,
      props: {
        options: [
          {
            label: '支付宝',
            value: '1'
          },
          {
            label: '微信',
            value: '2'
          },
          {
            label: '收钱吧 ',
            value: '3'
          },
          {
            label: '现金 ',
            value: '4'
          }
        ]
      },
      widget: 'radio',
      'ui:hidden': 'formState.value.memberId'
    },
    availableBalance: {
      title: '会员卡总金额',
      type: 'string',
      widget: 'input',
      span: 13,
      props: {
        readonly: true,
        bordered: false,
        style: {
          color: 'red',
          fontWeight: 'bold'
        }
      },
      'ui:hidden': 'formState.value.memberId'
    }
  },
  displayType: 'row',
  column: 2,
  maxWidth: '340px'
}
