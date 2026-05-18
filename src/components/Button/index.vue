<template>
  <!-- 有設固定寬度： whiteSpace 自動換行 -->
  <div
    class="button"
    :class="[shape, size, type]"
    :style="{
      width: `${width}`,
      minWidth: `${minWidth}`,
      minHeight: `${minHeight}`,
      whiteSpace: `${width ? 'wrap' : 'noWrap'}`,
      background,
      boxShadow
    }"
    @click.stop="click"
  >
    <slot name="icon_front" />
    <slot>
      <span>{{ text }}</span>
    </slot>
    <slot name="icon_back" />
  </div>
</template>

<script>
export default {
  name: 'ButtonComp',
  props: {
    /**
     * 按鈕文字
     */
    text: {
      type: String,
      default: () => ''
    },

    /**
     * 按鈕外型
     * circle：圓的
     * square：方的
     * */
    shape: {
      type: String,
      default: () => 'circle'
    },

    /**
     * extraLarge：351 * 40
     * large：327 * 40
     * middle：140 * 30
     * small：95 * 34
     * extraSmall：70 * 25
     */
    size: {
      type: String,
      default: () => 'middle'
    },

    /**
     * 自訂 寬度|最小寬高
     */
    width: {
      type: String,
      default: () => ''
    },
    minWidth: {
      type: String,
      default: () => ''
    },
    minHeight: {
      type: String,
      default: () => ''
    },

    /**
     * 按鈕類型
     * primary
     * secondary
     * multilingual-secondary
     * light
     * disabled
     */
    type: {
      type: String,
      default: () => 'primary'
    },

    /**
     * 按鈕顏色自定義
     */
    background: {
      type: String,
      default: () => ''
    },

    /**
     * 按鈕陰影自定義
     */
    boxShadow: {
      type: String,
      default: () => ''
    }
  },
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .button
    padding-left 8px
    padding-right 8px
    width fit-content
    font-weight 600
    display inline-flex
    align-items center
    justify-content center
    text-align center
    cursor pointer
    box-shadow 2px 1px 6px 0 $neutral_normal_color
    > * + *
      margin-left 4px

    // shape
    &.circle
      border-radius 22px
    &.square
      border-radius 0

    // size
    &.extraLarge
      min-width 351px
      min-height 40px
      font-size 14px
      margin-left auto
      margin-right auto
    &.large
      min-width 327px
      min-height 40px
      font-size 14px
      margin-left auto
      margin-right auto
    &.middle
      min-width 140px
      min-height 30px
      font-size 12px
    &.small
      min-width 95px
      min-height 34px
      font-size 16px
    &.extraSmall
      min-width 70px
      min-height 25px
      font-size 12px

    // type
    &.primary
      color #ffffff
      box-shadow 0 4px 6px 0 rgba(0, 0, 0, 0.15), inset 0 1px 1px 0 var(--white-50-percent)
      background var(--main-color)
    &.multilingual-secondary
      background var(--secondary-gradient)
      box-shadow inset 0 1px 2px 0 #ffffff
      color #ffffff
    &.secondary
      background var(--primary-light-button)
      box-shadow inset 0 4px 4px 0 rgba(255, 255, 255, 0.8)
      color var(--primary-dark)
      border 1px solid #dfe9f3
    &.light
      background-color var(--normal-background)
    &.disabled
      background var(--neutral-disabled)
      color rgba(#000000, .2)
      cursor not-allowed
</style>
