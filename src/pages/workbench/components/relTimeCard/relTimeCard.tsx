import { defineComponent, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { Button } from 'ant-design-vue'

export default defineComponent({
  name: 'Echarts',
  setup() {
    const chartRef = ref<HTMLElement>()
    const option = {
      xAxis: {
        type: 'category',
        data: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
      },
      tooltip: {},
      yAxis: {
        type: 'value'
      },
      grid: {
        left: '0px',
        bottom: '0px',
        containLabel: true
      },
      series: [
        {
          data: [1500, 2300, 2240, 2180, 1350, 1470, 2600],
          type: 'line',
          color: 'rgb(116, 21, 219)'
        }
      ]
    }
    // 生命周期
    onMounted(() => {
      // 定义实例
      var myChart = echarts.init(chartRef.value)
      myChart.setOption(option)
    })

    return () => {
      return <div class="w-[100%] h-[200px]" ref={chartRef} />
    }
  }
})
