import { TableProps } from 'store-operations-ui'

export const schema: TableProps['schema'] = {
  title: '角色列表',
  form: {
    search: true,
    export: false,
    reset: true,
    fields: [
      {
        type: 'select',
        label: '角色',
        placeholder: '角色',
        key: 'roleId'
      },
      {
        type: 'select',
        label: '角色状态',
        placeholder: '角色状态',
        key: 'status'
      },
      {
        type: 'date',
        label: '创建日期',
        placeholder: '创建日期',
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
          dataIndex: 'roleId',
          isIndex: true
        },
        {
          title: '角色名称',
          dataIndex: 'roleName'
        },
        {
          title: '角色状态',
          dataIndex: 'status'
        },
        {
          title: '用户数',
          dataIndex: 'dataScope'
        },
        {
          title: '创建日期',
          dataIndex: 'createTime'
        },
        {
          title: '修改日期',
          dataIndex: 'updateTime'
        },
        {
          title: '备注',
          dataIndex: 'remark'
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
    roleId: [],
    status: [
      { label: '正常', value: '0' },
      { label: '禁用', value: '1' }
    ]
  }
}

export const editSchema = {
  type: 'object',
  width: '66%',
  rules: {
    roleName: [{ required: true, message: '请输入角色名称' }]
  },
  properties: {
    roleName: {
      title: '角色名称',
      type: 'string',
      props: {
        placeholder: '请输入'
      },
      widget: 'input'
    },
    status: {
      title: '角色状态',
      type: 'boolean',
      widget: 'switch',
      defaultValue: true
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
  maxWidth: '340px'
}
