<template>
  <keep-alive>
    <main class="home">
      <TopHeader :title="TopHeaderTitle" />

      <div class="middle-section">
        <div class="middle-section__img" />
        <HelloWorld msg="Welcome to Your Vue.js App"/>
      </div>
    </main>
  </keep-alive>
</template>

<script>
import TopHeader from '@/components/TopHeader'
import HelloWorld from '@/components/HelloWorld'

export default {
  name: 'HomeView',
  components: {
    TopHeader,
    HelloWorld
  },
  setup (_) {
    const TopHeaderTitle = {
      text: 'Home',
      routGo: '/'
    }

    return {
      TopHeaderTitle
    }
  }
}
</script>

<style lang="stylus" scoped>
  .home

    .middle-section
      margin 30px 0
      padding 0 20px

      &__img
        width 100%
        height 50vh
        background url('~@/assets/image/home/doggy.jpg') center no-repeat
        background-size cover
        border-radius 20px
        overflow hidden

</style>
