import { createApp } from 'vue'
import App from './App.vue'
import { pinia } from '../stores'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

const app = createApp(App)

app.use(pinia)

app.use(Quasar, quasarUserOptions)

app.mount('#app')
