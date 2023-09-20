import { TableProps } from 'store-operations-ui'

export const schema: TableProps['schema'] = {
  title: '房间列表',
  form: {
    search: true,
    export: false,
    reset: true,
    fields: [
      {
        type: 'search',
        label: '房间名称',
        key: 'name'
      },
      {
        type: 'date',
        label: '创建日期',
        key: 'createTime'
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
  options: {}
}

export const editSchema = {
  type: 'object',
  rules: {
    name: {
      required: true,
      message: '请输入房间名称'
    },
    type: {
      required: true,
      message: '请选择房间类型'
    }
  },
  properties: {
    name: {
      title: '房间名称',
      type: 'string',
      props: {
        placeholder: '强输入'
      },
      required: true,
      message: {
        required: '请输入房间名称'
      },
      widget: 'input'
    },
    type: {
      title: '房间类型',
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
      required: true,
      message: {
        required: '请选择房间类型'
      },
      widget: 'select'
    },
    description: {
      title: '房间设备描述',
      type: 'string',
      widget: 'textArea'
    },
    remark: {
      title: '备注',
      type: 'string',
      widget: 'textArea'
    }
  },
  displayType: 'row',
  column: 2,
  maxWidth: '340px'
}
