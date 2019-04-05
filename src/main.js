// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import _ from 'lodash'

import CONSTANTS from './services/parameters'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import apolloProvider from './services/apollo'

import VueQriously from 'vue-qriously'

// #region Style Imports
import Vuetify from 'vuetify'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons/iconfont/material-icons.css'
import 'vuetify/dist/vuetify.min.css'
import './assets/scss/element-theme/index.css'
import './assets/scss/app.scss'

Vue.use(Vuetify, {
  iconfont: 'mdi' || 'fa',
  icons: {
    'facebook': 'fab fa-facebook'
  },
  theme: {
    'primary': '#41C8B8',
    'secondary': '#80DAD0',
    'accent': '#009888',
    'error': '#b71c1c',
    'info': '#2196F3',
    'success': '#4CAF50',
    'warning': '#FFC107',
    'muted': '#B6B6B6'
  }
})
Vue.use(ElementUI, { locale })
// #endregion

Object.defineProperty(Vue.prototype, '$_', { value: _ })

// #region API endpoints
const apiAxios = axios.create({
  baseURL: CONSTANTS.baseUrl
})

Vue.use(VueAxios, apiAxios)
Vue.use(VueAuthenticate, {
  baseUrl: CONSTANTS.baseUrl,
  loginUrl: 'auth/login/',
  registerUrl: 'auth/register/',
  providers: {
    facebook: {
      scope: ['public_profile', 'email'],
      display: 'popup'
    }
  }
})
// #endregion

Vue.config.productionTip = false

Vue.use(VueQriously)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  apolloProvider,
  components: { App },
  template: '<App/>'
})
