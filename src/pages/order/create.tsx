import { defineComponent, reactive, ref, toRaw, watch } from 'vue'
import { FormCard } from 'store-operations-ui'
import styles from './create.module.scss'
import { Button, Checkbox, message } from 'ant-design-vue'
import CreateOrderModal from './component/createOrder'
import BusinessModal from '@/components/businessModal/businessModal'
import { BusinessModalType } from '@/components/businessModal/businessModal.type'
import common from '@/servers/common'
import { useRequest } from 'vue-hooks-plus'
import Countdown from '@/components/countdown/countdown'
import { isEmpty } from 'wa-utils'
import { useAccess } from '@/hooks'

export type OrderStatus = 'FREE' | 'BUSY'
const { orderSettlement, orderOption } = useAccess()

const CreateOrder = defineComponent({
  setup: () => {
    const modalOpen = ref(false)
    const payOpen = ref(false)
    const data = ref<any>([])
    const total = ref(0)
    const checked = ref<any[]>([])
    const orderInfo = ref({
      orderNo: '',
      roomId: '',
      roomNo: '',
      orderId: '',
      orderServiceItemList: []
    })

    const statusMap: Record<OrderStatus, string> = {
      FREE: '空闲',
      BUSY: '忙碌'
    }

    const formState = ref<any>({
      orderId: '',
      orderNo: ''
    })

    const { run } = useRequest(common.orderHome, {
      onSuccess: (res: any) => {
        data.value = res?.rows
        total.value = res?.total
        checked.value = []
      }
    })

    watch(modalOpen, () => {
      if (!modalOpen.value) {
        orderInfo.value = {
          orderNo: '',
          orderId: '',
          roomId: '',
          roomNo: '',
          orderServiceItemList: []
        }
      }
    })
    return () => (
      <>
        <div class="bg-[#fff] shadow-md">
          <div class="flex p-[20px]">
            {orderOption && (
              <Button
                type="primary"
                class="ml-auto"
                onClick={() => {
                  modalOpen.value = true
                }}
              >
                创建订单
                {modalOpen.value}
              </Button>
            )}
          </div>
          <div class="flex flex-wrap justify-start p-[20px] pt-0">
            {data.value?.map((item: any) => (
              <div
                key={item.name}
                class={`${styles.item} shadow-md hover:shadow-lg cursor-pointer relative mr-[20px]`}
              >
                <span
                  class={`${styles.tag} bg-primary ${
                    item.status === 'BUSY' && '!bg-red-500'
                  }`}
                >
                  {statusMap?.[item?.status as OrderStatus]}
                  {item?.totalAmount - item?.availableAmount}/
                  {item?.totalAmount}
                </span>
                {item?.orderItemInfo?.map((appItem: any) => {
                  const time = appItem?.endTime - appItem?.currentTime
                  const realChecked = checked.value.map((item) =>
                    JSON.parse(item)
                  )
                  return (
                    <div class="flex text-[12px] items-center px-[10px]">
                      {orderSettlement && (
                        <Checkbox
                          class="mr-[6px]"
                          checked={realChecked.some(
                            (i) => i.orderId === appItem?.orderId
                          )}
                          onChange={(v) => {
                            const value = v.target.checked
                            const orderItemId = appItem?.orderItemId
                            const orderNo = appItem?.orderNo
                            const orderId = appItem?.orderId
                            const roomId = item?.roomId
                            const targetValue = realChecked?.find(
                              (i) => i.roomId === roomId
                            )
                            if (
                              realChecked?.[0] &&
                              realChecked?.[0]?.roomId !== roomId
                            ) {
                              return message.error('不同订单请分开结算')
                            }
                            if (targetValue && targetValue.orderId != orderId) {
                              return message.error('不同订单请分开结算')
                            }
                            if (value) {
                              checked.value = Array.from(
                                new Set([
                                  ...checked.value,
                                  JSON.stringify({ orderId, orderNo, roomId })
                                ])
                              )
                            } else {
                              const filterValue = realChecked?.filter(
                                (i: any) => i.orderId != orderId
                              )
                              checked.value = filterValue.map((i) =>
                                JSON.stringify(i)
                              )
                            }
                          }}
                        ></Checkbox>
                      )}
                      <div
                        class="text-ellipsis overflow-hidden"
                        style={{ 'white-space': 'nowrap' }}
                      >
                        {appItem?.serviceProjectName || '-'}{' '}
                      </div>
                      <div class="shrink-0 pl-[10px]">
                        {appItem?.operateUserName || '-'}
                      </div>
                      <div class="shrink-0 px-[10px] text-primary">
                        {time > 0 ? (
                          <>
                            倒计时：
                            <Countdown num={time} num2={1000} />
                          </>
                        ) : (
                          <span class="text-red-500">00:00:00</span>
                        )}
                      </div>
                      {orderOption && (
                        <a
                          class="text-[12px] select-none ml-auto block shrink-0"
                          style={{ padding: 0 }}
                          onClick={() => {
                            const orderId = appItem?.orderId
                            const orderNo = appItem?.orderNo
                            const orderServiceItemList = item?.orderItemInfo
                              ?.filter((i: any) => i?.orderId == orderId)
                              ?.map((i: any) => {
                                return {
                                  ...i,
                                  roomId: item.roomId,
                                  roomNo: item.roomNo,
                                  customNum: i?.customNum || '',
                                  operateUserId: i?.operateUserId || '',
                                  royaltyType: i?.royaltyType ?? '',
                                  serviceNum: i?.serviceNum || '',
                                  operate: 'update'
                                }
                              })
                            modalOpen.value = true
                            orderInfo.value = {
                              orderNo: orderNo,
                              orderId: orderId,
                              roomNo: item.roomNo,
                              roomId: item.roomId,
                              orderServiceItemList: orderServiceItemList
                            }
                          }}
                        >
                          修改订单
                        </a>
                      )}
                    </div>
                  )
                })}
                <div
                  class="
                  flex flex-wrap justify-center items-center min-h-[36px]
                  absolute 
                  bottom-0 
                  left-0 
                  w-[100%] 
                  text-[12px] 
                  select-none 
                  bg-violet-500 
                  hover:bg-violet-600 
                  active:bg-violet-700 
                  text-[#fff]"
                  onClick={() => {
                    if (!orderSettlement) {
                      return
                    }
                    if (isEmpty(item.orderItemInfo)) {
                      return
                    }
                    const realChecked = checked.value.map((item) =>
                      JSON.parse(item)
                    )
                    const has = realChecked.filter(
                      (i) =>
                        i?.roomId === item.roomId ||
                        item.orderItemInfo.some(
                          (i1: any) => i1.orderId == i.orderId
                        )
                    )
                    if (isEmpty(has)) {
                      return message.error(`请选择${item.roomNo}的订单进行结算`)
                    }
                    payOpen.value = true
                    formState.value = {
                      orderId: has?.[0]?.orderId,
                      orderNo: has?.[0]?.orderNo
                    }
                  }}
                >
                  <div class="w-[100%] font-bold text-[14px]">
                    {item.roomNo}
                  </div>
                  {!isEmpty(item.orderItemInfo) && orderSettlement && (
                    <div class="cursor-pointer w-[100%] font-bold">
                      结算订单
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <CreateOrderModal
          open={modalOpen.value}
          onCancel={() => (modalOpen.value = false)}
          onOk={() => {
            modalOpen.value = false
            run({})
          }}
          onRefresh={() => {
            modalOpen.value = false
            run({})
          }}
          orderInfo={orderInfo.value}
        />
        <BusinessModal
          type={BusinessModalType.会员结算}
          open={payOpen.value}
          onCancel={() => {
            payOpen.value = false
          }}
          formState={formState.value}
          onFinish={async (value: any) => {
            await common.submitOrder(value)
            message.success('订单结算成功')
            checked.value = []
            payOpen.value = false
            run({})
          }}
        />
      </>
    )
  }
})

export default CreateOrder
