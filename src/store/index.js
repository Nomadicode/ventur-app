import Vue from 'vue'
import Vuex from 'vuex'
import createPersistentState from 'vuex-persistedstate'

import AppState from './appState'
import UserModule from './userModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    AppState,
    UserModule
  },
  plugins: [createPersistentState({
    storage: {
      getItem: key => localStorage.getItem(key),
      setItem: (key, value) => localStorage.setItem(key, value),
      removeItem: key => localStorage.removeItem(key)
    }
  })]
})
