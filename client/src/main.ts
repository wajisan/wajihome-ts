import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.config.globalProperties.$server_url = "https://fullboard.wajitech.fr" as string //:PORT
//app.config.globalProperties.$server_url = "https://wajihome.wajitech.fr:9856" as string
app.mount('#app');
