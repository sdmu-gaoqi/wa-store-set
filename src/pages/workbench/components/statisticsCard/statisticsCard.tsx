import { defineComponent, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { Button, Segmented } from 'ant-design-vue'
import styles from './style.module.scss'

export default defineComponent({
  name: 'Echarts',
  setup() {
    const type = ref('')
    const chartRef = ref<HTMLElement>()
    const option = {
      tooltip: {
        trigger: 'item'
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      legend: {
        orient: 'vertical',
        right: 'right',
        bottom: 20,
        formatter(params: any) {
          // 这里的optionData就是外面的常量的值，我是拼了一个数组传进来的
          //  然后这里根据模块名的值，也就是params的值，动态的拼成自己想要的显示样子
          return `${params}    36%    ￥8888.88`
        }
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
          left: '20%',
          center: ['24%', '50%'], // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。[ default: ['50%', '50%'] ]
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
              formatter(params: any) {
                // 这里的optionData就是外面的常量的值，我是拼了一个数组传进来的
                //  然后这里根据模块名的值，也就是params的值，动态的拼成自己想要的显示样子
                return `${params.name} \n \n ￥8888.88`
              }
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
            <div class={styles.chartTitle}>客人数量</div>
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
              <div class={`${styles.title} !text-[#AA7D3A]`}>非会员</div>
              <div class={`${styles.count} !text-[#AA7D3A]`}>1,0800</div>
              <div class={`${styles.desc} !text-[#AA7D3A]`}>
                消费金额:80,000.00
              </div>
            </div>
          </div>
          <div class="w-[100%] h-[420px] pl-[45px]">
            <div class={styles.chartTitle}>各类项目情况</div>
            <Segmented
              options={[
                { label: '全部', value: '' },
                { label: '会员', value: '1' },
                { label: '非会员', value: '2' }
              ]}
              value={type.value}
              onChange={(v) => (type.value = v as string)}
              class="mb-[20px]"
            />
            <div class="w-[100%] h-[320px]" ref={chartRef} />
          </div>
        </div>
      )
    }
  }
})
