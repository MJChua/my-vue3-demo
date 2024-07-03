import { createStore } from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import app from './modules/app'

// 要加入 localStorage 的 vuex
const localStorageOptions = {
  storage: window.localStorage,
  paths: [
    'app.userAppearance'
  ]
}

// 要加入 sessionStorage 的 vuex
const sessionStorageOptions = {
  storage: window.sessionStorage
}

export default createStore({
  modules: {
    app,
    plugins: [
      createPersistedState(localStorageOptions),
      createPersistedState(sessionStorageOptions)
    ]
  }
})
