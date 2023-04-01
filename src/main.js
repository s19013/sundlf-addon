import { createApp } from 'vue'
import App from './App.vue'
import store from './store.js'
import '@mdi/font/css/materialdesignicons.css'

import './assets/main.css'

// vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: 'mdi',
  }
})

createApp(App).use(store).use(vuetify).mount('#app')
