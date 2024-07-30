export default {
  namespaced: true,
  state: {
    currentTab: 0
  },
  mutations: {
    SET_CURRENT_TAB (state, currentTab) {
      state.currentTab = currentTab
    }
  }
}
