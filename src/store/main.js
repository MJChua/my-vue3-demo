import { defineStore } from 'pinia'
import { createAppearanceStore } from '@my-vue3/core'

const appearanceStore = createAppearanceStore(localStorage, 'current-appearance')

export const useAppStore = defineStore('app', {
  state: () => ({
    device: 'mobile',
    fontsize: 100,
    userAppearance: appearanceStore.get('dark')

  }),
  actions: {
    SetDevice (device) {
      this.device = device
    },
    SetFontsize (fontsize) {
      this.fontsize = fontsize
    },
    SetAppearance (val) {
      this.userAppearance = appearanceStore.set(val)
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
