<template>
  <main class="mine">
    <Header />

    <div class="container text-left">
      <strong class="title p-10 fz-24">{{ $t('mine.title') }}</strong>

      <div class="row">
        <div
          v-for="item in contentItems"
          :key="item.index"
          :style="{ 'min-height': $isMobile() ? '200px' : '170px' }"
          class="container-xs content mt-28 mx-auto"
        >
          <div class="desc-wrap row py-16 px-24">
            <strong :class="{ 'mx-auto': $isMobile() }">{{ $t(item.titleKey) }}</strong>

            <div class="desc mt-10">
              <p>{{ $t('mine.descLine1') }}</p>
              <p>{{ $t('mine.descLine2') }}</p>
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
      { index: 0, titleKey: 'mine.appearance' },
      { index: 1, titleKey: 'mine.appearance' },
      { index: 2, titleKey: 'mine.appearance' },
      { index: 3, titleKey: 'mine.appearance' }
    ]

    return {
      contentItems
    }
  }
}
</script>

<style lang="stylus" scoped>
.mine
  min-height 100vh

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
          word-break break-word
</style>
