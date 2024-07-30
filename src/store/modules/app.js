export default {
  namespaced: true,
  state: {
    device: 'mobile',
    fontSize: 100,
    userAppearance: localStorage.getItem('current-appearance') || 'dark'
  },
  actions: {
    SetDevice ({ commit }, device) {
      commit('SET_DEVICE', device)
    },
    SetFontSize ({ commit }, fontSize) {
      commit('SET_FONT_SIZE', fontSize)
    }
  },
  mutations: {
    SET_DEVICE (state, device) {
      state.device = device
    },
    SET_FONT_SIZE (state, fontSize) {
      state.fontSize = fontSize
    },
    SET_USER_APPEARANCE (state, payload) {
      localStorage.setItem('current-appearance', payload)
      state.userAppearance = payload
    }
  }
}
