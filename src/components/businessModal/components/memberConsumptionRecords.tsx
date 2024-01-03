import { memberTypes, payTypes } from '@/types'
import { TableProps, TableRender } from 'store-operations-ui'
import { Member } from 'store-request'
import { defineComponent } from 'vue'

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
            key: 'time',
            type: 'date',
            label: '消费日期'
          }
        ]
      },
      tabs: [
        {
          title: '会员消费记录',
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
              title: '消费日期',
              dataIndex: 'createTime',
              format: 'time'
            },
            {
              title: '消费金额',
              dataIndex: 'giveBalance',
              format: 'money'
            },
            {
              title: '会员卡号',
              dataIndex: 'memberNo'
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
              title: '剩余金额',
              dataIndex: 'depositBalance',
              format: 'money'
            },
            {
              title: '扣款方式',
              dataIndex: 'payMethod',
              options: payTypes
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
    return () => (
      <TableRender
        schema={schema}
        request={(data: any) =>
          member.payLogs({
            ...data,
            memberId: props.formState.memberId,
            directionType: 1
          })
        }
      />
    )
  }
})
