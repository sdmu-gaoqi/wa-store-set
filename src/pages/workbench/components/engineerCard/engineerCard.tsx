import { defineComponent } from 'vue'
import En from '@/assets/en.webp'
import styles from './style.module.scss'

const EngineerCard = defineComponent({
  props: {
    nickName: String,
    remark: String
  },
  setup(props) {
    return () => (
      <div
        class={`w-[105px] flex-shrink-0 relative select-none ml-[15px]  pb-[10px] ${styles.enItem} hover:shadow-lg`}
        style={{ borderWidth: '1px' }}
      >
        <img class="w-[100%]" src={En} />
        <span
          class={`absolute top-[6px] right-[6px] scale-[80%] text-[#fff] bg-lime-500 px-[14px] py-[4px] text-[12px]`}
        >
          空闲
        </span>
        <div class="px-[10px]">{props.nickName}</div>
        <div class="px-[10px] text-gray-400 text-[12px] mt-[8px] relative">
          {props.remark}
          <span class="text-primary scale-[90%] block absolute top-0 right-[2px]">
            上钟10次
          </span>
        </div>
      </div>
    )
  }
})

export default EngineerCard
