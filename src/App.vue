<template>
  <router-view/>
</template>

<script>
import { onMounted, computed, getCurrentInstance } from 'vue'
import { useAppStore } from './store/main'
import { storeToRefs } from 'pinia'

import { attachAutoResize } from '@/utils/resizeScreen'

export default {
  name: 'App',
  setup (_) {
    const { proxy } = getCurrentInstance()
    const store = useAppStore()
    const { userAppearance } = storeToRefs(store)

    const showNavBar = computed(() => {
      return proxy?.$route?.meta?.showNavBar ?? false
    })

    const detectAppearance = () => {
      if (userAppearance.value === 'light') {
        document.body.classList.add('light-mode')
        document.body.classList.remove('dark-mode')
      } else {
        document.body.classList.add('dark-mode')
        document.body.classList.remove('light-mode')
      }
    }

    onMounted(async () => {
      attachAutoResize(store.SetDevice, store.SetFontsize)
      detectAppearance()
    })

    return {
      showNavBar
    }
  }
}

</script>

<style lang="stylus">

// 處理暗色系圖片切換機制
.light-mode
  #app
    background var(--normal-background) url('~@/assets/images/bg.webp') repeat-y center top
    background-size 100% auto

.dark-mode
  #app
    background var(--normal-background) url('~@/assets/images/bg-dark.webp') repeat-y center top
    background-size 100% auto

@media (prefers-color-scheme: dark)
  #app
    background var(--normal-background) url('~@/assets/images/bg-dark.webp') repeat-y center top
    background-size 100% auto

</style>
