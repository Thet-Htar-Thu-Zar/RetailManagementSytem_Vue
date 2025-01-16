import { createApp } from 'vue'
import './assets/index.css'
import App from './App.vue'


import router from "./router"
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router)
app.use(VueQueryPlugin);
app.mount('#app')