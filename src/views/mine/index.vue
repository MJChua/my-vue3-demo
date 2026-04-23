<template>
  <main class="mine">
    <Header />
    <div class="container text-left">
      <strong class="title p-10 fz-24">Mine</strong>

      <div class="row">
        <div
          v-for="(item, index) in contentItems"
          :key="index"
          :style="{ 'min-height': $isMobile() ? '200px' : '170px' }"
          class="container-xs content mt-28 mx-auto"
        >
          <div class="desc-wrap row py-16 px-24">
            <strong :class="{ 'mx-auto': $isMobile() }">{{ item.title }}</strong>
            <div class="desc mt-10">
              <p>slrfgjsl;oi132pj4;oi34wt</p>
              <p>selrkgfnselukgn2804yut8hsoelu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'MinePage',
  components: {
    Header
  },
  setup () {
    const contentItems = [
      { index: 0, title: 'Appearance' },
      { index: 1, title: 'Appearance' },
      { index: 2, title: 'Appearance' },
      { index: 3, title: 'Appearance' }
    ]

    return {
      contentItems
    }
  }
}
</script>

<style lang="stylus" scoped>
  .mine
    height 100vh

    .container
      margin-top 20px

      .title, .content
        cursor default

      .content
        background var(--black-30-percent)
        border-radius 30px
        width calc(100% / 2 - 15px)

        .desc-wrap
          justify-content space-between

          .desc > p
            word-break break-all

</style>
