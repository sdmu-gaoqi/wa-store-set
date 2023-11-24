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
        label: '房间号',
        key: 'roomNo'
      },
      {
        type: 'range',
        label: '创建日期',
        placeholder: ['开始日期', '结束日期'],
        key: 'createTime',
        format: 'timestamp',
        names: ['startCreateTime', 'endCreateTime']
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
          dataIndex: 'card',
          width: 100,
          isIndex: true
        },
        {
          title: '房间号',
          dataIndex: 'roomNo'
        },
        {
          title: '容纳客数',
          dataIndex: 'roomCap'
        },
        {
          title: '房间设备描述',
          dataIndex: 'description'
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
  options: {}
}

export const editSchema = {
  type: 'object',
  rules: {
    roomNo: {
      required: true,
      message: '请输入房间号'
    },
    roomCap: {
      required: true,
      message: '请输入容纳客数'
    }
  },
  properties: {
    roomNo: {
      title: '房间号',
      type: 'string',
      props: {
        placeholder: '请输入'
      },
      required: true,
      message: {
        required: '请输入房间名称'
      },
      widget: 'input'
    },
    占位: {},
    roomCap: {
      title: '容纳客数',
      type: 'string',
      props: {
        placeholder: '请输入'
      },
      required: true,
      message: {
        required: '请输入容纳客数'
      },
      widget: 'input'
    },
    description: {
      title: '房间设备描述',
      type: 'string',
      widget: 'textArea',
      span: 24
    },
    remark: {
      title: '备注',
      type: 'string',
      widget: 'textArea',
      span: 24
    }
  },
  displayType: 'row',
  column: 2,
  maxWidth: '340px'
}
