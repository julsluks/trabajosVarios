import './assets/main.css'

import { createApp, h } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import apolloProvider from '@/apollo/apolloClient'


const app = createApp({
    render: () => h(App)
})

app.use(createPinia())
app.use(router)
app.use(apolloProvider)

app.mount('#app')