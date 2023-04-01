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

// axios
import axios from 'axios';
window.axios = axios;
axios.defaults.withCredentials = true;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['UserLang'] = window.navigator.language;
// baseurl

createApp(App).use(store).use(vuetify).mount('#app')
