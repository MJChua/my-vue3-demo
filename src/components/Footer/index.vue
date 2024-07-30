<template>
  <div class="footer-nav container">
    <van-cell-group :border="false" :style="{ padding: $isMobile() ? '22px 0' : '44px 0' }" class="footer-nav__upper row">
      <van-cell
        v-for="(item, index) in NavItem"
        :key="index"
        :title="item.title"
        @click.stop="$emit('onTab', index)"
      ></van-cell>
    </van-cell-group>

    <div :style="{ padding: $isMobile() ? '22px 0' : '44px 0' }" class="footer-nav__lower row">
      <div class="lower-wrap row">
        <div v-for="(item, index) in LowerItems.leftItems" :key="index" class="pt-6 pr-8">{{ item.title }}</div>
      </div>
      <div class="lower-wrap row">
        <div v-for="(item, index) in LowerItems.rightItems" :key="index" class="pt-6 pr-8">{{ item.title }}</div>
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
  props: {},
  setup (props) {
    const NavItem = [
      { pathName: '/', icon: '', title: 'Demo', value: 0 },
      { pathName: 'aboutUs', icon: 'friends', title: '我們＋', value: 1 },
      { pathName: 'support', icon: 'manager', title: '支援＋', value: 2 }
    ]

    const LowerItems = {
      leftItems: [
        { pathName: '', icon: '', title: '@2024 Demo' },
        { pathName: '', icon: '', title: 'Privacy' },
        { pathName: '', icon: '', title: 'Cookies' }
      ],
      rightItems: [
        { pathName: '', icon: '', title: 'Tags' },
        { pathName: '', icon: '', title: 'Places' },
        { pathName: '', icon: '', title: 'Resource' }
      ]
    }

    const toPage = (page) => {
      console.warn('footer to page:', page)
    }

    return {
      /** data */
      NavItem,
      LowerItems,

      /** Function */
      toPage
    }
  }

}

</script>

<style lang="stylus" scoped>
  .footer-nav
    max-width $container-max-width-xl

    &__upper, &__lower
      justify-content space-between

      .lower-wrap
        width 40%
        justify-content space-around
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
            font-size 24px

        &__title
          text-shadow 0 2px 6px var(--black-30-percent)

</style>
