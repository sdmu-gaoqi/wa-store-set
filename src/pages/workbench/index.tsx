import { App, defineComponent } from 'vue'
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

Workbench.install = function (app: App) {
  app.component(Workbench.name, Workbench)
  return app
}

export default Workbench
