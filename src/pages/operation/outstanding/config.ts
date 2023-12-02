import { TableProps } from 'store-operations-ui'

export const schema: TableProps['schema'] = {
  title: '员工业绩统计',
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
      },
      {
        type: 'search',
        label: '工号',
        key: 'name'
      },
      {
        type: 'search',
        label: '姓名',
        key: 'status'
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
          dataIndex: 'month'
        },
        {
          title: '工号',
          dataIndex: 'no'
        },
        {
          title: '技师姓名',
          dataIndex: 'name'
        },
        {
          title: '工资/元',
          dataIndex: 'name'
        },
        {
          title: '钟数',
          dataIndex: 'detail',
          children: [
            {
              title: '总钟数/小时',
              dataIndex: 'number1'
            },
            {
              title: '排钟/小时',
              dataIndex: 'number2'
            },
            {
              title: '点钟/小时',
              dataIndex: 'number3'
            },
            {
              title: '客数',
              dataIndex: 'userNumber'
            }
          ]
        },
        {
          title: '贡献营业额',
          dataIndex: 'status',
          children: [
            {
              title: '项目原价/元',
              dataIndex: 'number4'
            },
            {
              title: '实收金额/元',
              dataIndex: 'number5'
            }
          ]
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
