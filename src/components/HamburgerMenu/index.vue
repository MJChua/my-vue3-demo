<template>
  <div :style="menuStyle" :class="['menu', { 'active': opened, 'menu--inline': !absolute }]">
    <div class="hamburger" />
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'HamburgerMenu',
  props: {
    opened: {
      type: Boolean,
      default: false
    },
    toRight: {
      type: [Number, String],
      default: 0
    },
    absolute: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const menuStyle = computed(() => {
      return props.absolute
        ? { left: `${props.toRight}%` }
        : {}
    })

    return {
      menuStyle
    }
  }
}
</script>

<style lang="stylus" scoped>
  .menu
    position absolute
    top 50%
    transform translateY(-50%)
    width $hamb-menu-size
    height $hamb-menu-size
    cursor pointer
    background transparent
    border-radius 6%

    &.menu--inline
      position relative
      top auto
      transform none
      left auto

    .hamburger
      top 50%
      left 50%
      transform translate(-50%, -50%)

      // 線段樣式
      &, &::before, &::after
        content ''
        position absolute
        width $line-width
        height $line-height
        background $line-color
        box-shadow 0 2px 5px rgba(255, 255, 255, .2)
        transition all .5s ease

      &::before // 線段1位置
        top - $line-spacing

      &::after // 線段3位置
        top $line-spacing

    // 點擊選單樣式
    &.active

      .hamburger
        background transparent
        box-shadow none

        &::before // 線段1 旋轉定位
          top 0
          transform rotate(45deg)

        &::after // 線段3 旋轉定位
          top 0
          transform rotate(135deg)

</style>
