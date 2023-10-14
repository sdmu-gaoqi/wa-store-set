import { defineComponent, ref } from 'vue'
import styles from './style.module.scss'
import { Button, DatePicker } from 'ant-design-vue'

export const CardProps = {
  title: String,
  tabs: Array,
  showDate: Boolean,
  class: String,
  contentClass: String
} as const

const dateMenus = [
  { label: '今日', value: 'date' },
  { label: '本周', value: 'week' },
  { label: '本月', value: 'month' },
  { label: '全年', value: 'year' },
  { label: '全部', value: 'all' }
]

const Card = defineComponent({
  props: CardProps,
  setup: (props, { slots }) => {
    const { showDate } = props
    const activeKey = ref('date')

    const changeTab = (key: string) => {
      activeKey.value = key
    }

    return () => (
      <div class={`${props.class} ${styles.card} mb-[10px]`}>
        <div class={styles.header}>
          {props.title}
          <div hidden={!showDate}>
            {dateMenus.map((item) => (
              <span
                class={`cursor-pointer mr-[10px] ${
                  activeKey.value === item.value
                    ? ' text-primary font-bold'
                    : ''
                }`}
                onClick={() => changeTab(item.value)}
                key={item.value}
              >
                {item.label}
              </span>
            ))}
            <DatePicker.RangePicker
              placeholder={['开始日期', '结束日期']}
              class="w-[220px]"
            ></DatePicker.RangePicker>
          </div>
        </div>
        <div class={`${props.contentClass} p-[20px]`}>{slots.default?.()}</div>
      </div>
    )
  }
})

export default Card
