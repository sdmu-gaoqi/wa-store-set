import { defineComponent, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { Button } from 'ant-design-vue'

export default defineComponent({
  name: 'Echarts',
  setup() {
    const chartRef = ref<HTMLElement>()
    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '0%',
        left: 'center'
      },
      grid: {
        left: '0px',
        bottom: '0px',
        containLabel: true
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1000, name: '项目1' },
            { value: 2000, name: '项目2' },
            { value: 3000, name: '项目3' },
            { value: 4000, name: '项目4' },
            { value: 5000, name: '项目5' }
          ]
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
