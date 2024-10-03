<template>
  <keep-alive>
    <main class="home">
      <Header @on-tab="changeTab" />
      <section class="middle-section container">
        <div class="middle-section__img" />

        <img v-if="diabloData.image_url" :src="diabloData.image_url" alt="just-a-pic" loading="lazy">
        {{ diabloData.name }}

        <AboutUs />
      </section>

      <Footer @on-tab="changeTab" />
    </main>
  </keep-alive>
</template>

<script>
import { onMounted, ref, getCurrentInstance } from 'vue'
import { useHomeStore } from '@/store/home'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AboutUs from '../stationery/aboutUs'

import { getDiabloItems } from '@/api/diablo4'

export default {
  name: 'HomeView',
  components: {
    Header,
    Footer,
    AboutUs
  },
  setup (_) {
    const { proxy } = getCurrentInstance()
    const store = useHomeStore()
    const diabloData = ref({})

    const changeTab = (index) => {
      store.onTab(index)
      proxy.$goToPage(store.computePage)
    }

    const getDibloInfos = async () => {
      try {
        const data = await getDiabloItems('class/rogue/skills/puncture')
        if (Object.keys(data).length) {
          diabloData.value = data
        }
      } catch (err) {
        console.warn('error:', err)
        throw err
      }
    }

    onMounted(() => {
      getDibloInfos()
    })

    return {
      /** data */
      diabloData,

      /** function */
      changeTab
    }
  }
}
</script>

<style lang="stylus" scoped>
  .home

    .middle-section

      &__img
        margin 15px auto
        width 100%
        height 50vh
        background url('~@/assets/images/home/doggy.jpg') center no-repeat
        background-size cover
        border-radius 20px
        overflow hidden

</style>
