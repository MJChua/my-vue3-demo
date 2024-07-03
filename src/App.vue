<template>
  <router-view/>
</template>

<script>
import { onMounted } from 'vue'
import { mapState, mapMutations } from '@/utils/store'

export default {
  name: 'App',
  setup (_) {
    const { userAppearance } = mapState('app')
    const { SET_USER_APPEARANCE } = mapMutations('app')
    const body = document.body
    const computeStyle = window.getComputedStyle(body)
    const defaultBgColor = computeStyle.backgroundColor

    const detectAppearance = () => {
      SET_USER_APPEARANCE(defaultBgColor === 'rgba(0, 0, 0, 0)' ? 'dark' : 'light')
      if (userAppearance.value === 'light') {
        document.body.classList.add('light-mode')
        document.body.classList.remove('dark-mode')
      } else {
        document.body.classList.add('dark-mode')
        document.body.classList.remove('light-mode')
      }
    }

    onMounted(() => {
      detectAppearance()
    })
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
