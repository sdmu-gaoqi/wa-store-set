import { TableProps } from 'store-operations-ui'

export const schema: TableProps['schema'] = {
  title: '营业额统计',
  form: {
    search: true,
    export: false,
    reset: false,
    fields: [
      {
        type: 'date',
        label: '月份',
        key: 'createTime',
        format: 'month'
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
          title: '日期',
          dataIndex: 'time'
        },
        {
          title: '非会员',
          dataIndex: 'a1',
          children: [
            {
              title: '客数',
              dataIndex: 'a1Number'
            },
            {
              title: '支付宝/元',
              dataIndex: 'a1Zfb'
            },
            {
              title: '微信/元',
              dataIndex: 'a1Wx'
            },
            {
              title: '收钱吧',
              dataIndex: 'a1Wx'
            },
            {
              title: '现金/元',
              dataIndex: 'a1Rmb'
            }
          ]
        },
        {
          title: '会员',
          dataIndex: 'a2',
          children: [
            {
              title: '客数',
              dataIndex: 'a2Number'
            },
            {
              title: '会员充值/元',
              dataIndex: 'a2Zfb'
            },
            {
              title: '会员卡消费/元',
              dataIndex: 'a2Wx'
            },
            {
              title: '新会员增长',
              dataIndex: 'a2Rmb'
            },
            {
              title: '不足扣款补充金额',
              dataIndex: 'a2Rmb'
            }
          ]
        },
        {
          title: '日总客数',
          dataIndex: 'money'
        },
        {
          title: '日营业额/元',
          dataIndex: 'money'
        },
        {
          fixed: 'right',
          title: '操作',
          dataIndex: 'options'
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
