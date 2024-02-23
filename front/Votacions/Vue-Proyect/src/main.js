import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import '/node_modules/primeflex/primeflex.css'
import 'primevue/resources/themes/lara-light-green/theme.css'
import 'primeicons/primeicons.css'
// import { registerPlugins } from '@/plugins'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import CheckBox from 'primevue/checkbox'
app.component('Button', Button)
app.component('InputText', InputText)
app.component('CheckBox', CheckBox)

// registerPlugins(app)

app.mount('#app')