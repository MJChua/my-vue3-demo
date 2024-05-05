<template>
  <router-view/>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'App',
  setup (_) {
    const body = document.body
    const computeStyle = window.getComputedStyle(body)
    const defaultBgColor = computeStyle.backgroundColor
    const defaultTextColor = computeStyle.color

    onMounted(() => {
      console.warn(`defaultBgColor-${defaultBgColor}; defaultTextColor-${defaultTextColor}`)
      document.getElementById('app').style.background = defaultBgColor === 'rgba(0, 0, 0, 0)' ? '#212121' : defaultBgColor
      document.getElementById('app').style.color = defaultBgColor === 'rgba(0, 0, 0, 0)' ? '#E8EBED' : '#000'
    })
  }
}

</script>

<style lang="stylus" scoped>

</style>
