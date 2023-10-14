import { defineComponent, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import styles from './style.module.scss'
import Card from '../card/card'

const BaseCardProps = {
  title: String,
  allMoney: String,
  id: String,
  data: Array
}

export default defineComponent({
  name: 'Echarts',
  props: BaseCardProps,
  setup(props) {
    const title = props.title
    const chartRef = ref<HTMLElement>()
    const option = {
      color: ['#80FFA5'],
      title: [
        {
          text: title,
          top: '10px',
          left: '10px',
          textStyle: {
            fontSize: '12px'
          }
        },
        {
          text: props.allMoney,
          top: '40px',
          left: '20px',
          textStyle: {
            fontSize: '14px'
          }
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: []
      },
      toolbox: {},
      grid: {
        left: '0px',
        right: '0px',
        top: '100px',
        bottom: '0px'
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: []
        }
      ],
      yAxis: {
        show: false
      },
      series: [
        {
          name: 'Line 3',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(55, 162, 255)'
              },
              {
                offset: 1,
                color: 'rgb(116, 21, 219)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: props.data
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
      const { id } = props
      return <div ref={chartRef} id={id} class={`${styles.card}`} />
    }
  }
})
