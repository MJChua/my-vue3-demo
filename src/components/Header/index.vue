<template>
  <div :class="$isMobile() ? 'px-24' : 'px-40'" class="header fw-700 row py-16">
    <div :class="$isMobile() ? 'fz-20' : 'fz-24'" class="logo" @click="$goHome()">Demo</div>

    <div v-if="$isMobile()" class="row">
      <HamburgerMenu :opened="show" to-right="87" @click="() => show = true" />
    </div>

    <van-cell-group v-else :border="false" class="row">
      <van-cell
        v-for="(item, index) in homeTabs"
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
        v-for="(item, index) in homeTabs"
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

import { homeTabs } from '@/store/constant'

export default {
  name: 'HeaderMenu',
  components: {
    'van-cell': Cell,
    'van-cell-group': CellGroup,
    'van-popup': Popup,
    HamburgerMenu
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
      homeTabs,

      /** function */
      onTabMobile
    }
  }

}

</script>

<style lang="stylus" scoped>
  .header
    position sticky
    top 0
    z-index $z-index-header
    justify-content space-between
    box-shadow 2px 1px 6px 0 $neutral_normal_color
    border-radius 0 0 10px 10px
    background var(--white-80-percent-header)
    overflow hidden

    .logo
      margin-right calc(100% / 2 - 40px)
      font-style italic
      transform rotate(-5deg)
      background linear-gradient(to right, red, blue)
      background-clip text
      color transparent
      cursor pointer

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
