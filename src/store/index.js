import { createStore } from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import app from './modules/app'
import home from './modules/home'

// 要加入 localStorage 的 vuex
const persistedOptions = {
  storage: window.localStorage,
  paths: [
    'app.userAppearance'
  ]
}

// 要加入 sessionStorage 的 vuex
// const sessionStorageOptions = {
//   storage: window.sessionStorage
// }

export default createStore({
  modules: {
    app,
    home,
    plugins: [
      createPersistedState(persistedOptions)
      // createPersistedState(sessionStorageOptions)
    ]
  }
})
