import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAppStore } from './store/main'
import App from './App.vue'
import router from './router'
import './assets/styles/index.js'

import { Toast } from 'vant'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
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
export default app
