import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAppStore } from './store/main'
import App from './App.vue'
import router from './router'
import { i18n, setupI18n } from './i18n'
import './assets/styles/index.js'
import 'vant/lib/index.css'

import { Toast } from 'vant'

const app = createApp(App)
const pinia = createPinia()

async function bootstrap () {
  app.use(pinia)
  await setupI18n()
  app.use(i18n)
  app.use(router)

  const store = useAppStore()

  // toast
  app.config.globalProperties.$toast = Toast
  // RWD
  app.config.globalProperties.$isMobile = () => store.device === 'mobile'
  // router
  app.config.globalProperties.$goHome = () => router.push('/')
  app.config.globalProperties.$goToPage = (name, params) => router.push({ name, params })

  app.mount('#app')
}

bootstrap()

export default app
