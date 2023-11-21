// @ts-nocheck

import { defineComponent, onMounted, ref, watch } from 'vue'

function convertTimestampToTime(timestamp: any) {
  var date = new Date(timestamp)
  var hours = date.getUTCHours() * 60
  var minutes = hours + date.getUTCMinutes()
  var seconds = date.getUTCSeconds()

  // 在分钟或秒小于10的情况下，前面添加0
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds

  return {
    minutes: minutes,
    seconds: seconds
  }
}

const Countdown = defineComponent({
  props: {
    num: Number,
    num2: Number
  },
  setup(props) {
    const value = ref<any>({
      minutes: '00',
      seconds: '00'
    })
    const timeRef = ref()

    onMounted(() => {
      if (props && (props?.num || 0) > 0) {
        let initNum = props?.num as number
        value.value = convertTimestampToTime(initNum)
        timeRef.value = setInterval(() => {
          const initValue = initNum - (props.num2 || 1000)
          initNum -= props.num2 || 1000
          if (initValue <= 0) {
            value.value = {
              minutes: '00',
              seconds: '00'
            }
            clearInterval(timeRef.value)
            timeRef.value = null
          }
          value.value = convertTimestampToTime(initValue)
        }, props.num2 || 1000)
      }
    })
    return () => {
      return <>{`${value.value.minutes}:${value.value.seconds}`}</>
    }
  }
})

export default Countdown
