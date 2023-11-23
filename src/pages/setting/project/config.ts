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
        key: 'serviceName'
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
          dataIndex: 'id'
        },
        {
          title: '服务项目',
          dataIndex: 'serviceName'
        },
        {
          title: '项目价格 /元',
          dataIndex: 'price'
        },
        {
          title: '项目时长/分钟',
          dataIndex: 'duration'
        },
        {
          title: '启用状态',
          dataIndex: 'enabled'
        },
        {
          title: '所属门店',
          dataIndex: 'storeName'
        },
        {
          title: '排钟提成/元',
          dataIndex: 'pzRoyalty'
        },
        {
          title: '点钟提成/元',
          dataIndex: 'dzRoyalty'
        },
        {
          title: '是否参与折扣优惠',
          dataIndex: 'canDiscount',
          options: [
            { label: '是', value: 1 },
            { label: '否', value: 0 }
          ]
        },
        {
          title: '创建日期',
          dataIndex: 'createTime',
          format: 'time'
        },
        {
          title: '修改日期',
          dataIndex: 'updateTime',
          format: 'time'
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
    serviceName: [{ required: true, message: '请输入' }],
    price: [{ required: true, message: '请输入' }],
    duration: [{ required: true, message: '请输入' }],
    dzRoyalty: [{ required: true, message: '请输入' }],
    pzRoyalty: [{ required: true, message: '请输入' }]
  },
  properties: {
    serviceName: {
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
    price: {
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
        suffix: 'time',
        precision: 0
      },
      widget: 'input'
    },
    store: {
      title: '所属门店',
      type: 'string',
      widget: 'input',
      props: {
        readonly: true,
        bordered: false
      }
    },
    pzRoyalty: {
      title: '项目排钟提成',
      type: 'number',
      props: {
        placeholder: '请输入',
        suffix: 'money',
        type: 'number'
      },
      widget: 'input'
    },
    dzRoyalty: {
      title: '项目点钟提成',
      type: 'number',
      props: {
        placeholder: '请输入',
        suffix: 'money',
        type: 'number'
      },
      widget: 'input'
    },
    canDiscount: {
      title: '是否参与折扣优惠',
      widget: 'radio',
      type: 'string',
      defaultValue: '0',
      props: {
        options: [
          { label: '是', value: 1 },
          { label: '否', value: 0 }
        ]
      }
    },
    remark: {
      title: '备注',
      type: 'string',
      props: {
        placeholder: '请输入'
      },
      widget: 'textArea',
      span: 24
    }
  },
  displayType: 'row',
  column: 2,
  maxWidth: '340px'
}
