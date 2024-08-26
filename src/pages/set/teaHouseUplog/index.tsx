import { defineComponent, onMounted, shallowRef, toRaw } from 'vue'
import Editor from '@/components/editor/index.vue'
import { Button, message } from 'ant-design-vue'
import { getTeaHouseUplog, saveUplog } from '@/services/common'

export default defineComponent({
  setup() {
    const ref = shallowRef()

    onMounted(() => {
      getTeaHouseUplog().then(res => {
        const { content } = res as any || {}
        ref.value.valueHtml = content
      })
    })

    return () => {
      return (
        <div>
          <Editor ref={ref}></Editor>
          <div class="flex justify-center mt-[10px]">
            <Button
              class="w-[200px]"
              type="primary"
              onClick={async() => {
                const htmlValue = ref.value.editorRef.getHtml()
                await saveUplog({
                  content: htmlValue,
                  fileName: 'teaHouseUplog',
                  path: "resources"
                })
                message.success('保存成功')
              }}
            >
              保存
            </Button>
          </div>
        </div>
      )
    }
  }
})
