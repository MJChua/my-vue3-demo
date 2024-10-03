import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    device: 'mobile',
    fontsize: 100,
    userAppearance: localStorage.getItem('current-appearance') || 'dark'

  }),
  actions: {
    SetDevice (device) {
      this.device = device
    },
    SetFontsize (fontsize) {
      this.fontsize = fontsize
    },
    SetAppearance (val) {
      localStorage.setItem('current-appearance', val)
      this.userAppearance = val
    }
  }
  // 配置持久化
  // persisted: {
  //   enable: true,
  //   strategies: [
  //     {
  //       key: 'app-store', // which of export
  //       storage: localStorage, // where to store
  //       paths: 'user-appearance' // which to store
  //     }
  //   ]
  // }
})
