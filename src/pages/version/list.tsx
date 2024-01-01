import { List } from 'ant-design-vue'
import { defineComponent, ref, render } from 'vue'

const Version = defineComponent({
  setup() {
    const list = ref([
      {
        version: 'V1.0.0',
        date: '2023.11.26',
        content: `
1. 会员管理
2. 订单管理
3. 价目表设置
4. 房间管理
        `
      }
    ])
    return () => (
      <List dataSource={list.value} class="bg-[#fff] px-[50px] py-[20px]">
        {list.value.map((item) => (
          <List.Item>
            <pre>
              <div class="text-[20px] font-bold">{item.version}</div>
              <div class="text-[16px]">发布日期:{item.date}</div>
              <pre>{item.content}</pre>
            </pre>
          </List.Item>
        ))}
      </List>
    )
  }
})

export default Version
