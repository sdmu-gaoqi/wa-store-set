import { defineComponent } from 'vue'
import Card from '../card/card'
import DigitalFlop from '@/components/digitalFlop/digitalFlop.vue'
import { ref, onMounted } from 'vue'

const Cumulative = defineComponent({
  setup() {
    // 一千六百万零一千六百六十六
    const value = ref(16006.888)

    onMounted(() => {
      setInterval(() => {
        value.value =
          value.value + Number(String(Math.random()).slice(5, 6)) / 10
      }, 3000)
    })

    return () => (
      <Card title="累计营业额">
        <DigitalFlop value={value.value} />
      </Card>
    )
  }
})

export default Cumulative
