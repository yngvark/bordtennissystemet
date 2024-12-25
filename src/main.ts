import './assets/main.css'
import './assets/common.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { persistedState } from '@/plugins/persistedState'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
pinia.use(persistedState)

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
