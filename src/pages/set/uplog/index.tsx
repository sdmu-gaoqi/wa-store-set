import { defineComponent, shallowRef } from 'vue'
import Editor from '@/components/editor/index.vue'
import { Button } from 'ant-design-vue'

export default defineComponent({
  setup() {
    const ref = shallowRef()
    return () => {
      return (
        <div>
          <Editor ref={ref}></Editor>
          <div class="flex justify-center mt-[10px]">
            <Button
              class="w-[200px]"
              type="primary"
              onClick={() => {
                const htmlValue = ref.value.editorRef.getHtml()
                console.log(htmlValue, 'htmlValue')
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
