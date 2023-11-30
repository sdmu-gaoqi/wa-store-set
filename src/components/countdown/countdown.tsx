// @ts-nocheck

import { defineComponent, onMounted, ref, watch } from 'vue'

function convertTimestampToTime(timestamp: any) {
  var date = new Date(timestamp)
  var hours = date.getUTCHours()
  var minutes = date.getUTCMinutes()
  var seconds = date.getUTCSeconds()

  // 在小时、分钟或秒小于10的情况下，前面添加0
  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds
  return {
    hours: hours,
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
      return (
        <>{`${value.value.hours}:${value.value.minutes}:${value.value.seconds}`}</>
      )
    }
  }
})

export default Countdown
