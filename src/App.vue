<template>
  <router-view/>
</template>

<script>
import { onMounted } from 'vue'
import { mapState, mapActions } from '@/utils/store'

import { attachAutoResize } from '@/utils/resizeScreen'

export default {
  name: 'App',
  setup (_) {
    const { userAppearance } = mapState('app')
    const { SetDevice, SetFontSize } = mapActions('app')

    const detectAppearance = () => {
      if (userAppearance.value === 'light') {
        document.body.classList.add('light-mode')
        document.body.classList.remove('dark-mode')
      } else {
        document.body.classList.add('dark-mode')
        document.body.classList.remove('light-mode')
      }
    }

    onMounted(() => {
      attachAutoResize(SetDevice, SetFontSize)
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
