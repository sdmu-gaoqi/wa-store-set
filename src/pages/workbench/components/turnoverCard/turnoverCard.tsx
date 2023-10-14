import { defineComponent, onMounted, ref } from 'vue'
import * as echarts from 'echarts'

export default defineComponent({
  name: 'Echarts',
  setup() {
    const chartRef = ref<HTMLElement>()
    const option = {
      xAxis: {
        type: 'category',
        data: ['4月', '5月', '6月', '7月', '8月', '9月', '10月']
      },
      yAxis: {
        type: 'value'
      },
      grid: {
        left: '0px',
        bottom: '0px',
        containLabel: true
      },
      tooltip: {},
      series: [
        {
          data: [
            9000000, 8000000, 6500000, 8000000, 7000000, 11000000, 13000000
          ],
          color: 'rgb(116, 21, 219)',
          type: 'bar'
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
