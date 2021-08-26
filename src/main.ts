import '@babel/polyfill'
import 'mutationobserver-shim'
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap'
import 'fast-xml-parser'
import './styles/app.css'

createApp(App).use(router).use(store).mount('#app')
