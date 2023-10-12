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
          title: '序号',
          dataIndex: 'no'
        },
        {
          title: '房间名称',
          dataIndex: 'name'
        },
        {
          title: '房间类型',
          dataIndex: 'type'
        },
        {
          title: '容纳客数',
          dataIndex: 'number'
        },
        {
          title: '房间设备描述',
          dataIndex: 'desc'
        },
        {
          title: '创建日期',
          dataIndex: 'createAt'
        },
        {
          title: '修改日期',
          dataIndex: 'editAt'
        },
        {
          title: '操作',
          dataIndex: 'options',
          fixed: 'right'
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
