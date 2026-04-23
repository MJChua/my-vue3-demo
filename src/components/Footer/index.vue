<template>
  <div class="footer-nav">
    <van-cell-group :border="false" :style="{ padding: $isMobile() ? '8px 0' : '22px 0' }" class="footer-nav__upper row">
      <van-cell
        v-for="(item, index) in topItems"
        :key="index"
        :title="$t(item.titleKey)"
        @click.prevent="$goToPage(item.pathName)"
      />
    </van-cell-group>

    <div
      v-if="!$isMobile()"
      :style="{ padding: $isMobile() ? '8px 0' : '24px 0' }"
      class="footer-nav__lower justify-around row"
    >
      <div
        v-for="(footerItem, index) in bottomItems"
        :key="index"
        :class="`g-${$isMobile() ? '10' : '60'}`"
        class="lower-wrap justify-center row"
      >
        <div
          v-for="(item, itemIndex) in footerItem"
          :key="itemIndex"
          class="lower-wrap__item"
          @click="$goToPage(item.pathName)"
        >
          {{ $t(item.titleKey) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CellGroup, Cell } from 'vant'

export default {
  name: 'FooterNav',
  components: {
    'van-cell': Cell,
    'van-cell-group': CellGroup
  },
  setup () {
    const topItems = [
      { pathName: 'Home', icon: '', titleKey: 'footer.demo', value: 0 },
      { pathName: 'AboutUs', icon: 'friends', titleKey: 'footer.aboutUs', value: 1 },
      { pathName: 'Mine', icon: 'manager', titleKey: 'footer.mine', value: 2 }
    ]

    const bottomItems = [
      [
        { pathName: '', icon: '', titleKey: 'footer.copyright' },
        { pathName: '', icon: '', titleKey: 'footer.privacy' },
        { pathName: '', icon: '', titleKey: 'footer.cookies' }
      ],
      [
        { pathName: '', icon: '', titleKey: 'footer.tags' },
        { pathName: '', icon: '', titleKey: 'footer.places' },
        { pathName: '', icon: '', titleKey: 'footer.resources' }
      ]
    ]

    return {
      topItems,
      bottomItems
    }
  }
}
</script>

<style lang="stylus" scoped>
  .justify-center
    justify-content center

  .justify-around
    justify-content space-around

  .justify-between
    justify-content space-between

  for space in 0 10 60
    .g-{space}
      gap (space) * 1px

  .footer-nav
    position sticky
    bottom 0
    padding 10px
    background var(--white-footer)
    border-radius 5px 5px 0 0

    &__upper, &__lower
      display flex
      align-items center

    .lower-wrap
      display flex
      width 40%
      cursor pointer

  /deep/
    .van-cell-group
      background transparent
      justify-content space-around

      .van-cell
        width auto
        cursor pointer

        &:nth-child(1)
          padding 0
          margin-right calc(100% / 2)

          .van-cell__title
            font-size 18px
            background linear-gradient(to right, red, blue)
            background-clip text
            color transparent

        &:nth-child(3) > .van-cell__title
          padding 0

        &__title
          text-shadow 0 2px 6px var(--black-30-percent)

</style>
