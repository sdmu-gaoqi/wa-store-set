import { defineComponent, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { Button } from 'ant-design-vue'
import styles from './style.module.scss'

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
      return (
        <div class="flex">
          <div class={`w-[240px] text-[#080808] text-[16px] ${styles.body}`}>
            <div>客人数量</div>
            <div
              class={styles.card}
              style={{
                background:
                  'linear-gradient(135deg, #F0ECFF 0%, #B5A4F9 100%, #7F64F3 100%)'
              }}
            >
              <div class={styles.title}>会员</div>
              <div class={styles.count}>1,080</div>
              <div class={styles.desc}>消费金额:80,000.00</div>
            </div>
            <div
              class={styles.card}
              style={{
                background:
                  'linear-gradient(136deg, #FEF8EF 0%, #E7D6BE 100%, #E2CFB5 100%)'
              }}
            >
              <div class={styles.title}>非会员</div>
              <div class={styles.count}>1,0800</div>
              <div class={styles.desc}>消费金额:80,000.00</div>
            </div>
          </div>
          <div class="w-[100%] h-[420px]" ref={chartRef} />
        </div>
      )
    }
  }
})
