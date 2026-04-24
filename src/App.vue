<template>
  <router-view />
  <GoToTop />
  <MobileBottomNav />
</template>

<script>
import { onMounted, computed, getCurrentInstance } from 'vue'
import { useAppStore } from './store/main'
import { storeToRefs } from 'pinia'
import { attachAutoResize, applyAppearanceClass } from '@my-vue3/core'
import GoToTop from '@/components/GoToTop/index.vue'
import MobileBottomNav from '@/components/MobileBottomNav/index.vue'

export default {
  name: 'App',
  components: {
    GoToTop,
    MobileBottomNav
  },
  setup (_) {
    const { proxy } = getCurrentInstance()
    const store = useAppStore()
    const { userAppearance } = storeToRefs(store)

    const showNavBar = computed(() => {
      return proxy?.$route?.meta?.showNavBar ?? false
    })

    const detectAppearance = () => {
      applyAppearanceClass(userAppearance.value)
    }

    onMounted(() => {
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

@media (max-width: 767px)
  main
    padding-bottom 88px
</style>

