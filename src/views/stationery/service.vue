<template>
  <Header />
  <main class="service container">
    <div class="mx-auto text-center">
      <strong class="title p-10 fz-24">Service</strong>

      <div class="content mt-28 p-20">
        <p :class="$isMobile() ? 'fz-30' : 'fz-40'">You can contact us!</p>
        <p :class="$isMobile() ? 'fz-30' : 'fz-40'">Tel:</p>
        <p :class="$isMobile() ? '' : 'fz-20'">589234123 03-103</p>
      </div>
    </div>
  </main>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'ServicePage',
  components: { Header }
}
</script>

<style lang="stylus" scoped>
  .service
    margin-top 50px
    height 100vh

    .title
      text-decoration underline

    .content
      background var(--white-50-percent)
      border-radius 15px

</style>
