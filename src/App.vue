<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
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

    onMounted(() => {
      console.warn('defaultBgColor:', defaultBgColor)
      document.getElementById('app').style.background = defaultBgColor
      // 比对域名
      // const fuzzyCompare = () => {
      //   const curUrl = location.host.split('.')
      //   const compUrl = process.env.REPO_INFO.testDomain[process.env.VUE_APP_ENV_CONFIG].split('.')
      //   const minLength = Math.min(compUrl.length, curUrl.length)

      //   for (let i = 0; i < minLength; i++) {
      //     return compUrl[i].includes(curUrl[i]) || curUrl[i].includes(compUrl[i])
      //   }
      //   return true
      // }
      // console.warn('innn:', fuzzyCompare())
    })
  }
}

</script>

<style lang="stylus" scoped>

</style>
