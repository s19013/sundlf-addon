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
window.axios.defaults.headers.common['UserLang'] = window.navigator.language;
//開発↓
// axios.defaults.baseURL = 'http://127.0.0.1:8000/api/extended/'; 
//本番↓
axios.defaults.baseURL = 'https://sundlf.com/api/extended/';


axios.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

createApp(App).use(store).use(vuetify).mount('#app')
