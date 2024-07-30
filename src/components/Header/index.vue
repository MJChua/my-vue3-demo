<template>
  <div :class="$isMobile() ? 'px-24' : 'px-40'" class="header row py-16">
    <slot v-if="logoInfo !== undefined">
      <div :class="$isMobile() ? 'fz-20' : 'fz-24'" class="logo" @click="$goHome()">{{ logoInfo.title }}</div>
    </slot>

    <div v-if="$isMobile()" class="row">
      <HamburgerMenu :opened="show" to-right="87" @click="() => show = true" />
    </div>

    <van-cell-group v-else :border="false" class="row">
      <van-cell
        v-for="(item, index) in tabItems"
        :key="index"
        :title="item.title"
        :icon="item.icon"
        clickable
        @click.stop="$emit('onTab', index)"
      />
    </van-cell-group>

    <!-- 移動端 popup -->
    <van-popup v-model:show="show" position="right" round>
      <van-cell
        v-for="(item, index) in tabItems"
        :key="index"
        :title="item.title"
        :icon="item.icon"
        clickable
        @click.stop="onTabMobile(index)"
      />
    </van-popup>
  </div>
</template>

<script>
import { ref } from 'vue'

import { CellGroup, Cell, Popup } from 'vant'
import HamburgerMenu from '@/components/HamburgerMenu'

export default {
  name: 'HeaderMenu',
  components: {
    'van-cell': Cell,
    'van-cell-group': CellGroup,
    'van-popup': Popup,
    HamburgerMenu
  },
  props: {
    logoInfo: {
      type: Object,
      default: () => {}
    },
    tabItems: {
      type: [Array, Object],
      default: () => []
    }
  },

  setup (_, { emit }) {
    const show = ref(false)

    const onTabMobile = (index) => {
      emit('onTab', index)
      show.value = false
    }

    return {
      /** data */
      show,

      /** function */
      onTabMobile
    }
  }

}

</script>

<style lang="stylus" scoped>
  .header
    background var(--white-60-percent-header)
    box-shadow 2px 1px 6px 0 $neutral_normal_color
    border-radius 0 0 10px 10px
    justify-content space-between
    overflow hidden
    position sticky
    top 0
    z-index $z-index-header

    .logo
      margin-right calc(100% / 2 - 40px)
      color var(--black)
      font-style italic
      cursor pointer
      transform rotate(-5deg)

  /deep/
    .van-cell-group
      width calc(100% / 2 - 40px)
      background transparent
      justify-content space-between

      .van-cell
        width auto
        cursor pointer
        color var(--black-70-percent)

        &__title
          text-shadow 0 2px 6px var(--black-30-percent)

        &:active

          .van-icon
            transition all .1s ease
            transform rotate(45deg)

    .van-popup
      background var(--main-color)
      top 24%

      .van-cell
        padding-left 10px

        .van-icon
          color var(--black-70-percent)

</style>
