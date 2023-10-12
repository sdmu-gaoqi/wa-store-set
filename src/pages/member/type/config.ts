import { TableProps } from 'store-operations-ui'
import { isEmpty } from 'wa-utils'
import { isTelNumber } from 'wa-utils/dist/regex/regex'

export const schema: TableProps['schema'] = {
  title: '会员列表',
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
          title: '编号',
          dataIndex: 'no'
        },
        {
          title: '会员模式',
          dataIndex: 'name'
        },
        {
          title: '所属门店',
          dataIndex: 'store'
        },
        {
          title: '状态',
          dataIndex: 'status'
        },
        {
          title: '创建日期',
          dataIndex: 'createAt'
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

export const editSchema = {
  type: 'object',
  rules: {
    card: [{ required: true, message: '请输入充值金额' }],
    name: [{ required: true, message: '请输入折扣' }]
  },
  properties: {
    'op-group-0': {
      title: '会员模式'
    },
    store: {
      title: '选择会员模式',
      type: 'string',
      props: {
        options: [
          {
            label: 'A.根据充值金额，设置会员优惠折扣',
            value: 'A'
          },
          {
            label: 'B.购买次卡，设置项目优惠次数',
            value: 'B'
          },
          {
            label: 'C.根据累计消费金额，设置会员等级',
            value: 'C'
          },
          {
            label: 'D.购买会员卡，设置会员优惠折扣',
            value: 'D'
          }
        ],
        placeholder: '请选择'
      },
      widget: 'radio'
    },
    'op-group-1': {
      title: '基础信息'
    },
    card: {
      title: '充值金额',
      type: 'string',
      widget: 'input'
    },
    name: {
      title: '折扣',
      type: 'string',
      widget: 'input'
    },
    phone: {
      title: '备注',
      type: 'string',
      widget: 'textArea'
    }
  },
  displayType: 'row',
  column: 2,
  maxWidth: '340px'
}
