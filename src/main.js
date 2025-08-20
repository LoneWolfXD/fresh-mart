import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './style.css'
import focus from './directives/focus'
import currency from './directives/currency'


const app = createApp(App)
app.use(createPinia())
app.use(router)


app.directive('focus', focus)
app.directive('currency', currency)


app.mount('#app')