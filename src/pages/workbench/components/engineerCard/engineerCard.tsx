import { defineComponent } from 'vue'
import En from '@/assets/en.webp'

const EngineerCard = defineComponent({
  props: {
    nickName: String,
    remark: String
  },
  setup(props) {
    return () => (
      <div
        class="w-[130px] flex-shrink-0 relative select-none ml-[10px] border-solid border-gray-400 pb-[10px]"
        style={{ borderWidth: '1px' }}
      >
        <img class="w-[100%]" src={En} />
        <span class="absolute top-0 left-0 text-[#fff] bg-lime-500 px-[14px] py-[4px] text-[12px]">
          空闲
        </span>
        <div class="px-[10px]">{props.nickName}</div>
        <div class="px-[10px] text-gray-400 text-[12px]">{props.remark}</div>
      </div>
    )
  }
})

export default EngineerCard
