// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import _ from 'lodash'

import Croppa from 'vue-croppa'

import CONSTANTS from './services/parameters'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'

import apolloProvider from './services/apollo'
import { EventBus } from './services/event-bus'

import Inputmask from 'inputmask'
import { VueMaskDirective } from 'v-mask'

// #region Style Imports
import Vuetify from 'vuetify'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'typeface-merriweather-sans'
import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons/iconfont/material-icons.css'
import 'vuetify/dist/vuetify.min.css'
import './assets/scss/element-theme/index.css'
import 'vue-croppa/dist/vue-croppa.css'

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
  tokenType: 'JWT',
  providers: {
    facebook: {
      clientId: '482160618854082',
      scope: ['public_profile', 'email'],
      display: 'popup',
      redirectUri: 'http://localhost:8000/auth/facebook/'
    }
  }
})
// #endregion

window.EventBus = EventBus

Vue.config.productionTip = false

Vue.directive('inputmask', {
  bind: function (el, binding) {
    var inputs = el.getElementsByTagName('INPUT')
    var input = inputs[0]
    if (inputs.length > 1) {
      input = inputs[inputs.length - 1]
    }
    new Inputmask(binding.value).mask(input)
  }
})

Vue.use(Croppa)

Vue.directive('mask', VueMaskDirective)

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters['UserModule/token']) {
    next({
      name: 'events'
    })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  apolloProvider,
  components: { App },
  template: '<App/>'
})
