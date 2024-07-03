export default {
  namespaced: true,
  state: {
    userAppearance: localStorage.getItem('current-appearance') || 'dark'
  },
  mutations: {
    SET_USER_APPEARANCE (state, payload) {
      localStorage.setItem('current-appearance', payload)
      state.userAppearance = payload
    }
  }
}
