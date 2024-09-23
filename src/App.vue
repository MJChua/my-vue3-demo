<template>
  <router-view/>
</template>

<script>
import { onMounted } from 'vue'
import { useAppStore } from './store/main'
import { storeToRefs } from 'pinia'

import { attachAutoResize } from '@/utils/resizeScreen'

export default {
  name: 'App',
  setup (_) {
    const store = useAppStore()
    const { userAppearance } = storeToRefs(store)

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
      attachAutoResize(store.SetDevice, store.SetFontsize)
      detectAppearance()

      // const arr = [1, 2, 3, 'a', 1, 'b', 2, 4, 5]
      // console.log('remove repeat arr:', Array.from(new Set(arr)))

      // const arr2 = [1, 2, [3, 4, [5, 6, [7]]]]
      // function flatten (arr, output = []) {
      //   for (const val of arr) {
      //     if (Array.isArray(val)) {
      //       flatten(val, output)
      //     } else {
      //       output.push(val)
      //     }
      //   }
      //   return output
      // }
      // console.log('flattenArray:', flatten(arr2))

      // function multiply () {
      //   for (let i = 0; i < 10; i++) {
      //     for (let j = 0; j < 10; j++) {
      //       console.log(`${i} * ${j} = ${i * j}`)
      //     }
      //   }
      // }
      // multiply()npm
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
