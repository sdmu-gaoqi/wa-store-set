import { defineComponent } from 'vue'
import { FormCard } from 'store-operations-ui'
import styles from './create.module.scss'
import { Button } from 'ant-design-vue'

const mockData = Array.from({ length: 6 }).map((_, index) => ({
  name: `2${index + 1 > 10 ? index + 1 : `0${index + 1}`}-${
    index % 2 === 0 ? '单' : '双'
  }人间`
}))

const CreateOrder = defineComponent({
  render: () => {
    return (
      <FormCard title="创建订单">
        {{
          content: (
            <>
              <div class="flex p-[20px]">
                <Button type="primary" class="ml-auto">
                  创建订单
                </Button>
              </div>
              <div class="flex flex-wrap justify-between p-[20px] pt-0">
                {mockData.map((item) => (
                  <div
                    key={item.name}
                    class={`${styles.item} shadow-md hover:shadow-lg cursor-pointer`}
                  >
                    {item.name}
                    <span class={styles.tag}>空闲</span>
                  </div>
                ))}
              </div>
            </>
          )
        }}
      </FormCard>
    )
  }
})

export default CreateOrder
