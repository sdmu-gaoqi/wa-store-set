import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

const Workbench = defineComponent({
  name: 'Workbench',
  setup() {
    const { t, locale } = useI18n()
    return () => {
      return <div>{t('message')}</div>
    }
  }
})

export default Workbench
