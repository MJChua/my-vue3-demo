<template>
  <div :class="$isMobile() ? 'px-24' : 'px-40'" class="header fw-700 py-16">
    <div :class="$isMobile() ? 'fz-20' : 'fz-24'" class="logo" @click="$goHome()">Demo</div>

    <van-cell-group v-if="!$isMobile()" :border="false" class="desktop-nav">
      <van-cell
        v-for="(item, index) in homeTabs"
        :key="index"
        :title="$t(item.titleKey)"
        :icon="item.icon"
        clickable
        @click.stop="onTab(index)"
      />
    </van-cell-group>

    <div class="actions-right">
      <button
        :aria-label="localeToggleLabel"
        :disabled="isLocaleSwitching"
        class="locale-toggle"
        type="button"
        @click="onLocaleToggle"
      >
        {{ localeToggleLabel }}
      </button>

      <van-switch
        v-model="checkedSwitch"
        :size="$isMobile() ? '14px' : '18px'"
        class="appearance-switch"
        @change="onAppearanceChange"
      />

      <HamburgerMenu
        v-if="$isMobile()"
        :opened="show"
        :absolute="false"
        class="menu-trigger"
        @click="show = true"
      />
    </div>

    <van-popup v-model:show="show" position="right" round>
      <van-cell
        v-for="(item, index) in homeTabs"
        :key="index"
        :title="$t(item.titleKey)"
        :icon="item.icon"
        clickable
        @click.stop="onTab(index)"
      />
    </van-popup>
  </div>
</template>

<script>
import { computed, getCurrentInstance, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { CellGroup, Cell, Popup, Switch } from 'vant'

import { applyAppearanceClass } from '@my-vue3/core'
import { useHomeStore } from '@/store/home'
import { useAppStore } from '@/store/main'
import { getLocale, toggleLocale } from '@/i18n'
import { homeTabs } from '@/store/constant'

import HamburgerMenu from '@/components/HamburgerMenu'

export default {
  name: 'HeaderMenu',
  components: {
    'van-cell': Cell,
    'van-cell-group': CellGroup,
    'van-popup': Popup,
    'van-switch': Switch,
    HamburgerMenu
  },

  setup () {
    const { proxy } = getCurrentInstance()
    const homeStore = useHomeStore()
    const appStore = useAppStore()
    const { userAppearance } = storeToRefs(appStore)

    const show = ref(false)
    const checkedSwitch = ref(userAppearance.value === 'dark')
    const currentLocale = ref(getLocale())
    const isLocaleSwitching = ref(false)

    const localeToggleLabel = computed(() => {
      return currentLocale.value === 'zh-TW'
        ? proxy.$t('header.switchToEnglish')
        : proxy.$t('header.switchToChinese')
    })

    const onTab = (index) => {
      homeStore.onTab(index)
      proxy.$goToPage(homeStore.computePage)
      show.value = false
    }

    const onAppearanceChange = (checked) => {
      const nextMode = checked ? 'dark' : 'light'
      applyAppearanceClass(nextMode)
      appStore.SetAppearance(nextMode)
    }

    const onLocaleToggle = async () => {
      if (isLocaleSwitching.value) return

      isLocaleSwitching.value = true

      try {
        currentLocale.value = await toggleLocale()
      } finally {
        isLocaleSwitching.value = false
      }
    }

    watch(() => userAppearance.value, (value) => {
      checkedSwitch.value = value === 'dark'
    })

    return {
      show,
      homeTabs,
      checkedSwitch,
      isLocaleSwitching,
      localeToggleLabel,
      onTab,
      onAppearanceChange,
      onLocaleToggle
    }
  }
}
</script>

<style lang="stylus" scoped>
.header
  display flex
  align-items center
  flex-wrap nowrap
  position sticky
  top 0
  z-index $z-index-header
  box-shadow 2px 1px 6px 0 $neutral_normal_color
  border-radius 0 0 10px 10px
  background var(--white-80-percent-header)
  overflow hidden

  .logo
    margin-right 16px
    font-style italic
    transform rotate(-5deg)
    background linear-gradient(to right, red, blue)
    background-clip text
    color transparent
    cursor pointer
    white-space nowrap

  .desktop-nav
    display flex
    align-items center
    flex-wrap nowrap
    gap 4px
    margin-right auto
    min-width 0
    background transparent

    &::after
      display none

  .actions-right
    display flex
    align-items center
    margin-left auto
    gap 6px

  .locale-toggle
    border 1px solid var(--header-control-border)
    border-radius 999px
    background var(--header-control-bg)
    color var(--header-control-text)
    font-size 11px
    font-weight 700
    line-height 1
    padding 4px 7px
    cursor pointer
    transition opacity .15s ease

    &:disabled
      opacity .6
      cursor not-allowed

  .menu-trigger
    margin-left 12px

/deep/
  .desktop-nav
    .van-cell
      flex none
      width auto
      cursor pointer
      color var(--black-70-percent)
      background transparent
      padding 6px 8px

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

@media (max-width: 767px)
  .header
    .logo
      margin-right auto

    .actions-right
      gap 4px

    .locale-toggle
      font-size 10px
      padding 3px 6px
</style>
