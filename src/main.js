import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/index.js'

import { Toast } from 'vant'

const app = createApp(App)
app.use(store)
app.use(router)

// toast
app.config.globalProperties.$toast = Toast

app.mount('#app')
export default app
