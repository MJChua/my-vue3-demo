<template>
  <router-view/>
  <GoToTop />
</template>

<script>
import { onMounted, computed, getCurrentInstance } from 'vue'
import { useAppStore } from './store/main'
import { storeToRefs } from 'pinia'

import { attachAutoResize } from '@/utils/resizeScreen'
import GoToTop from '@/components/GoToTop/index.vue'

export default {
  name: 'App',
  components: {
    GoToTop
  },
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

// Global background appearance classes
.light-mode
  #app
    background var(--normal-background) url('@/assets/images/bg.webp') repeat-y center top
    background-size 100% auto

.dark-mode
  #app
    background var(--normal-background) url('@/assets/images/bg-dark.webp') repeat-y center top
    background-size 100% auto

@media (prefers-color-scheme: dark)
  #app
    background var(--normal-background) url('@/assets/images/bg-dark.webp') repeat-y center top
    background-size 100% auto

</style>
