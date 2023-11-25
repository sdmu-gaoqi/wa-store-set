// @ts-nocheck

import common from '@/servers/common'
import employee from '@/servers/employee'
import { RoyaltyType, royaltyTypeMap } from '@/types'
import { formatMoney } from '@/utils'
import {
  Button,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Table,
  message
} from 'ant-design-vue'
import { nanoid } from 'nanoid'
import { Room } from 'store-request'
import {
  computed,
  defineComponent,
  reactive,
  ref,
  render,
  toRaw,
  toRef,
  watch
} from 'vue'
import { useRequest } from 'vue-hooks-plus'
import { cloneDeep, debounce, isEmpty, sleep } from 'wa-utils'

interface Props {
  open: boolean
  onCancel: () => void
  onOk?: () => void
  orderInfo: any
  onRefresh: () => void
}

const CreateOrderModal = defineComponent({
  props: {
    open: Boolean,
    onCancel: Function,
    onOk: Function,
    orderInfo: Object,
    onRefresh: Function
  },
  //   @ts-ignore
  setup(props: Props) {
    const room = new Room()
    const apps = reactive([])
    const { data: projectList, run } = useRequest<any>(common.projectList, {
      manual: true
    })
    const { data: roomList, run: runRoom } = useRequest<any>(room.list, {
      manual: true
    })
    const { data: emList, run: runEm } = useRequest<any>(
      employee.engineerList,
      {
        manual: true
      }
    )
    const deleteItems = ref([])
    const inputRef = ref<string>()
    const orderServiceItemList = ref<any[]>([])
    watch(
      () => props.open,
      () => {
        if (props.open) {
          run({ pageSize: 100 })
          runRoom({ pageSize: 100 })
          runEm()
        }
      }
    )
    watch(
      () => props.orderInfo,
      () => {
        if (props.orderInfo) {
          if (props.orderInfo?.orderServiceItemList?.length > 0) {
            orderServiceItemList.value = toRaw(
              props.orderInfo.orderServiceItemList
            )
          } else {
            orderServiceItemList.value = []
          }
        }
      }
    )
    const columns = [
      {
        title: '项目名称',
        dataIndex: 'serviceProjectName'
      },
      {
        title: '项目金额/元',
        dataIndex: 'price',
        type: 'money',
        slots: {
          customRender: 'm1'
        }
      },
      {
        title: '项目时长/分',
        dataIndex: 'duration',
        slots: {
          customRender: 'm2'
        }
      },
      {
        title: '客数',
        dataIndex: '',
        fixed: 'right',
        slots: {
          customRender: 'ks'
        }
      },
      {
        title: '上钟数',
        dataIndex: 'serviceNum',
        fixed: 'right',
        slots: {
          customRender: 'szs'
        }
      },
      {
        title: '上钟类型',
        dataIndex: 'royaltyType',
        fixed: 'right',
        slots: {
          customRender: 'type'
        }
      },
      {
        title: '技师',
        dataIndex: '',
        fixed: 'right',
        slots: {
          customRender: 'jishi'
        }
      },
      {
        title: '房间',
        dataIndex: '',
        fixed: 'right',
        slots: {
          customRender: 'room'
        }
      },
      {
        title: '操作',
        dataIndex: '',
        fixed: 'right',
        slots: {
          customRender: 'operation'
        }
      }
    ]
    const handleSlot = {
      m1: ({ index, record }: any) => {
        return formatMoney(record?.price || record?.originalPrice)
      },
      m2: ({ index, record }: any) => {
        return record?.duration || record?.unitDuration
      },
      //  对应 operation 的单元格 插槽内容
      ks: ({ index, record }: any) => {
        return (
          <InputNumber
            type="number"
            min={0}
            value={record?.customNum}
            precision={0}
            onChange={(v) => {
              record.customNum = v
            }}
          >
            客数
          </InputNumber>
        )
      },
      szs: ({ index, record }: any) => {
        return (
          <InputNumber
            type="number"
            precision={1}
            min={1}
            value={record?.serviceNum}
            onChange={(v) => {
              record.serviceNum = String(v)
            }}
          ></InputNumber>
        )
      },
      type: ({ index, record }: any) => {
        return (
          <Select
            placeholder="请选择"
            options={royaltyTypeMap}
            style={{ width: '100%' }}
            onChange={(v) => {
              record.royaltyType = v
            }}
            value={record?.royaltyType}
          />
        )
      },
      jishi: ({ index, record }: any) => {
        return (
          <Select
            placeholder="请选择技师"
            style={{ width: '100%' }}
            value={record?.operateUserId}
            onChange={(v) => {
              record.operateUserId = v
            }}
            fieldNames={{
              label: 'userName',
              value: 'userId'
            }}
            options={emList?.value?.rows}
          />
        )
      },
      room: ({ index, record }: any) => {
        return (
          <Select
            placeholder="请选择房间"
            options={roomList.value?.rows}
            value={record?.roomId} // roomNo
            style={{ width: '100%' }}
            onChange={(_, r) => {
              record.roomId = r.roomId
              record.roomNo = r.roomNo
            }}
            fieldNames={{
              label: 'roomNo',
              value: 'roomId'
            }}
          />
        )
      },
      operation: ({ record, index }: any) => {
        return (
          <div>
            <Button
              danger
              type="link"
              onClick={() => {
                if (record?.orderItemId) {
                  deleteItems.value = [
                    ...deleteItems.value,
                    record?.orderItemId
                  ]
                }
                orderServiceItemList.value = orderServiceItemList.value.filter(
                  (i, x) => x !== index
                )
              }}
            >
              删除
            </Button>
          </div>
        )
      }
    }
    const onFinish = debounce(async () => {
      if (isEmpty(orderServiceItemList.value)) {
        return message.error('请选择项目')
      }
      const l = orderServiceItemList.value.filter(
        (item) => !((item?.customNum || '') + '')
      )
      if (l.length === orderServiceItemList.value.length) {
        message.error('请完善客数')
        return
      }
      for (let i of orderServiceItemList.value) {
        if (!((i?.operateUserId || '') + '')) {
          message.error('请选择技师')
          return
        }
        if (!((i?.roomId || '') + '')) {
          message.error('请选择房间')
          return
        }
        if (!i?.royaltyType && i?.royaltyType !== 0) {
          message.error('请选择上钟类型')
          return
        }
        if (!((i?.serviceNum || '') + '')) {
          message.error('请完善上钟数')
          return
        }
      }
      const sendValue = {
        orderNo: nanoid(),
        orderServiceItemList: cloneDeep(orderServiceItemList.value)
      }
      const orderId = props.orderInfo?.orderId
      const orderNo = props.orderInfo?.orderNo
      try {
        if (!orderId) {
          await common.createOrder(sendValue)
          message.success('订单创建成功')
        } else {
          sendValue.orderNo = orderNo
          sendValue.orderId = orderId
          if (!isEmpty(deleteItems.value)) {
            deleteItems.value?.forEach((i) => {
              sendValue.orderServiceItemList.push({
                orderItemId: i,
                operate: 'delete'
              })
            })
            sendValue.orderServiceItemList.push()
          }
          await common.updateOrder(sendValue)
          message.success('订单修改成功')
        }
        await sleep(300)
        props.onOk()
        orderServiceItemList.value = []
      } catch (err) {
        if (err?.code == 1028) {
          const roomName = err?.msg
            ?.replace('Exception, the roomNo:', '')
            ?.replace(' has no enough amount', '')
          message.error(`${roomName}房间客数已满,暂不能创建订单`)
        }
        props.onCancel()
      }
    }, 300)

    const title = computed(() => {
      return props.orderInfo?.roomNo ? '修改订单' : '创建订单'
    })

    watch(
      () => props.orderInfo,
      () => {
        const isEdit = !!props.orderInfo?.roomNo
        if (isEdit) {
          slot.value = defalutSlot
        } else {
          slot.value = noDeleteFooter
        }
      }
    )

    watch(
      () => props.open,
      () => {
        deleteItems.value = []
      }
    )

    const noDeleteFooter = {
      footer: (
        <>
          <Button
            onClick={() => {
              orderServiceItemList.value = []
              if (props.onCancel) {
                props.onCancel(true)
              }
            }}
          >
            返回
          </Button>
          <Button type="primary" onClick={onFinish}>
            {title.value}
          </Button>
        </>
      )
    }

    const defalutSlot = {
      footer: (
        <>
          <Popconfirm
            title="是否确认删除"
            okText="删除"
            cancelText="取消"
            onConfirm={async () => {
              await common.deleteOrder({
                orderId: props.orderInfo?.orderId,
                orderNo: props.orderInfo?.orderNo
              })
              message.success('删除成功')
              if (props.onRefresh) {
                props.onRefresh()
              }
            }}
          >
            <Button danger>删除订单</Button>
          </Popconfirm>
          <Button
            onClick={() => {
              orderServiceItemList.value = []
              if (props.onCancel) {
                props.onCancel(true)
              }
            }}
          >
            返回
          </Button>
          <Button type="primary" onClick={onFinish}>
            {title.value}
          </Button>
        </>
      )
    }

    const slot = ref(noDeleteFooter)

    return () => (
      <Modal
        width={1200}
        open={props.open}
        title={title.value}
        okText={title.value}
        cancelText="取消"
        // @ts-ignore
        onCancel={() => {
          orderServiceItemList.value = []
          if (props.onCancel) {
            props.onCancel()
          }
        }}
        v-slots={slot.value}
        onOk={onFinish}
      >
        <div>
          <div class="text-[14px] py-[10px]">选择项目</div>
          <div class="flex">
            <Input
              class="w-[300px] mr-[50px]"
              value={inputRef.value || undefined}
              onChange={(v) => (inputRef.value = v.target.value)}
            />
            <Button
              type="primary"
              onClick={(e) => {
                const search = inputRef.value
                run({
                  pageSize: 100,
                  serviceName: search
                })
              }}
            >
              查询
            </Button>
          </div>
          <div class="apps flex mt-[20px]">
            {projectList.value?.rows?.map((item: any) => {
              // @ts-ignore
              const has = apps.some((appItem) => appItem?.id === item?.id)
              return (
                <div
                  class={`rounded-md bg-indigo-100 text-[#fff ] px-[20px] py-[10px] cursor-pointer select-none hover:shadow-md active:shadow-lg mr-[10px]`}
                  style={{ border: '1px solid #bbb' }}
                  onClick={() => {
                    orderServiceItemList.value = [
                      ...orderServiceItemList.value,
                      {
                        customNum: 1, // 客数
                        operateUserId: '', // 技师id
                        roomId: '', // 房间id
                        roomNo: '', // 确认房间号
                        royaltyType: RoyaltyType.排钟,
                        serviceNum: 1, // 上钟数
                        serviceProjectId: item.id, // 服务项目id
                        serviceProjectName: item.serviceName, // 服务项目
                        duration: item.duration,
                        price: item.price,
                        operate: 'add',
                        ...(props.orderInfo?.roomNo && {
                          roomNo: props.orderInfo?.roomNo,
                          roomId: props.orderInfo?.roomId
                        })
                      }
                    ]
                  }}
                >
                  {item?.serviceName}
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <div class="text-[14px] py-[10px]">订单信息</div>
          <a-table
            columns={columns}
            v-slots={handleSlot}
            scroll={{ x: 1200 }}
            dataSource={orderServiceItemList.value}
          ></a-table>
        </div>
      </Modal>
    )
  }
})

export default CreateOrderModal
