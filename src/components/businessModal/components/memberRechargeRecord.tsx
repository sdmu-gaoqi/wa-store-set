import { memberTypes, payTypes } from '@/types'
import { TableProps, TableRender } from 'store-operations-ui'
import { Member } from 'store-request'
import { defineComponent, toRaw, watch } from 'vue'

export default defineComponent({
  props: {
    formState: Object
  },
  // @ts-ignore
  setup(props: { formState: Record<string, any> }) {
    const member = new Member()
    const schema: TableProps['schema'] = {
      title: '',
      form: {
        search: true,
        export: false,
        reset: false,
        fields: [
          {
            key: 'createTime',
            type: 'date',
            label: '充值日期'
          }
        ]
      },
      tabs: [
        {
          title: '会员充值记录',
          key: 'one',
          columns: [
            {
              fixed: true,
              title: '序号',
              dataIndex: 'card',
              isIndex: true,
              width: 90
            },
            {
              title: '会员卡号',
              dataIndex: 'memberNo',
              width: 100
            },
            {
              title: '姓名',
              dataIndex: 'memberName',
              width: 100
            },
            {
              title: '手机号',
              dataIndex: 'phone',
              width: 200
            },
            {
              title: '会员类型',
              dataIndex: 'memberType',
              options: memberTypes,
              width: 100
            },
            {
              title: '充值金额',
              dataIndex: 'rechargeBalance',
              width: 100
            },
            {
              title: '赠送金额',
              dataIndex: 'giveBalance',
              width: 100,
              format: 'money'
            },
            {
              title: '充值方式',
              dataIndex: 'payMethod',
              options: payTypes,
              width: 100
            },
            {
              title: '充值日期',
              dataIndex: 'createTime',
              format: 'time',
              width: 200
            }
          ]
        }
      ],
      options: {}
    }
    return () => (
      <TableRender
        schema={schema}
        tableProps={{
          scroll: { x: 900 }
        }}
        request={(data: any) =>
          member.payLogs({
            ...data,
            memberId: props.formState.memberId
          })
        }
      />
    )
  }
})
