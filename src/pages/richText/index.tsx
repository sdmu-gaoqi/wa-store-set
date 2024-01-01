import { Button, List } from 'ant-design-vue'
import { defineComponent, ref, render } from 'vue'
import Quill from 'quill'
import { useRequest } from 'vue-hooks-plus'
import axios from 'axios'

const Version = defineComponent({
  setup() {
    const quill = new Quill('#editorjs')
    const { data } = useRequest(() =>
      axios.request({
        url: 'http://111.229.138.125/resources/version.json'
        // headers: {
        //   Accept: `
        //   text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7`
        // }
      })
    )
    return () => (
      <div class="bg-[#fff] p-[20px]">
        <div id="editorjs"></div>
        <Button class="m-[auto] block" type="primary" onClick={() => {}}>
          复制数据
        </Button>
      </div>
    )
  }
})

export default Version
