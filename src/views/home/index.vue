<template>
  <keep-alive>
    <main ref="home" class="home">
      <Header :logo-info="logo" :tab-items="tabs" @on-tab="changeTab" />

      <section class="middle-section container">
        <div class="middle-section__img" />
        <component :is='currentKey' />
      </section>

      <Footer @on-tab="changeTab" />
    </main>
  </keep-alive>
</template>

<script>
import { computed } from 'vue'
import { mapState, mapMutations } from '@/utils/store'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AboutUs from '../stationery/aboutUs'
import Service from '../stationery/service'
import Project from '../stationery/project'
import Mine from '../mine'

export default {
  name: 'HomeView',
  components: {
    Header,
    Footer,
    AboutUs,
    Service,
    Project,
    Mine
  },
  setup (_) {
    const logo = {
      title: 'Demo',
      icon: ''
    }

    const tabs = [
      { key: 'AboutUs', icon: 'friends', title: '我們', value: 0 },
      { key: 'Service', icon: 'service', title: '服務', value: 1 },
      { key: 'Project', icon: 'hot', title: '成果', value: 2 },
      { key: 'Mine', icon: 'manager', title: '個人', value: 3 }
    ]

    const { currentTab } = mapState('home')
    const { SET_CURRENT_TAB } = mapMutations('home')

    const currentKey = computed(() => {
      return tabs[currentTab.value].key
    })

    const changeTab = (index) => {
      SET_CURRENT_TAB(index)
    }

    return {
      /** data */
      logo,
      tabs,

      /** computed */
      currentKey,

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
        margin 50px auto 60px
        width 100%
        height 50vh
        background url('~@/assets/images/home/doggy.jpg') center no-repeat
        background-size cover
        border-radius 20px
        overflow hidden

</style>
