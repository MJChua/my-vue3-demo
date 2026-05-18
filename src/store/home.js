import { defineStore } from 'pinia'
import { homeTabs } from './constant'

export const useHomeStore = defineStore('home', {
  state: () => ({
    currentTab: 0
  }),
  actions: {
    onTab (crrIndex) {
      this.currentTab = crrIndex
    }
  },
  getters: {
    computePage: (state) => homeTabs[state.currentTab].page
  }
})
