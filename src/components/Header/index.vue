<template>
  <header :class="['header', { 'header--mobile': $isMobile() }]" class="fw-700 py-16">
    <template v-if="$isMobile()">
      <button class="mobile-menu-trigger" type="button" @click="show = true">
        <HamburgerMenu :opened="show" :absolute="false" class="mobile-hamburger" />
      </button>

      <div class="logo logo--center" @click="goToRoute('Home')">{{ $t('header.brand') }}</div>

      <button class="auth-entry" type="button" @click="goToRoute('Auth')">
        {{ $t('header.loginRegister') }}
      </button>
    </template>

    <template v-else>
      <div class="logo" @click="goToRoute('Home')">{{ $t('header.brand') }}</div>

      <van-cell-group :border="false" class="desktop-nav">
        <van-cell
          v-for="(item, index) in homeTabs"
          :key="index"
          :title="$t(item.titleKey)"
          :icon="item.icon"
          clickable
          @click.stop="onDesktopTab(index)"
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
          :size="'18px'"
          class="appearance-switch"
          @change="onAppearanceChange"
        />
      </div>
    </template>

    <van-popup v-model:show="show" class="mobile-drawer-popup" position="left">
      <aside class="mobile-drawer">
        <h3 class="mobile-drawer__title">{{ $t('mobileNav.quickAccess') }}</h3>

        <button
          v-for="item in mobilePrimaryNav"
          :key="item.name"
          :class="['mobile-drawer__item', { 'is-active': isRouteActive(item.name) }]"
          type="button"
          @click="onDrawerNavigate(item.name)"
        >
          <van-icon :name="item.icon" />
          <span>{{ $t(item.labelKey) }}</span>
        </button>

        <div class="mobile-drawer__tools">
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
            :size="'16px'"
            class="appearance-switch"
            @change="onAppearanceChange"
          />
        </div>
      </aside>
    </van-popup>
  </header>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { CellGroup, Cell, Popup, Switch, Icon } from 'vant'

import { applyAppearanceClass } from '@my-vue3/core'
import { useHomeStore } from '@/store/home'
import { useAppStore } from '@/store/main'
import { getLocale, toggleLocale } from '@/i18n'
import { homeTabs } from '@/store/constant'
import HamburgerMenu from '@/components/HamburgerMenu/index.vue'

const mobilePrimaryNav = [
  { name: 'Home', icon: 'wap-home-o', labelKey: 'mobileNav.home' },
  { name: 'Diary', icon: 'notes-o', labelKey: 'mobileNav.diary' },
  { name: 'Mine', icon: 'contact-o', labelKey: 'mobileNav.mine' },
  { name: 'More', icon: 'apps-o', labelKey: 'mobileNav.more' }
]

export default {
  name: 'HeaderMenu',
  components: {
    'van-cell': Cell,
    'van-cell-group': CellGroup,
    'van-popup': Popup,
    'van-switch': Switch,
    'van-icon': Icon,
    HamburgerMenu
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const homeStore = useHomeStore()
    const appStore = useAppStore()
    const { userAppearance } = storeToRefs(appStore)

    const show = ref(false)
    const checkedSwitch = ref(userAppearance.value === 'dark')
    const currentLocale = ref(getLocale())
    const isLocaleSwitching = ref(false)

    const localeToggleLabel = computed(() => {
      return currentLocale.value === 'zh-TW' ? 'EN' : '繁中'
    })

    const goToRoute = (name) => {
      if (route.name === name) return
      router.push({ name })
    }

    const onDrawerNavigate = (name) => {
      show.value = false
      goToRoute(name)
    }

    const isRouteActive = (name) => route.name === name

    const onDesktopTab = (index) => {
      homeStore.onTab(index)
      goToRoute(homeStore.computePage)
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

    watch(() => route.fullPath, () => {
      show.value = false
    })

    return {
      show,
      homeTabs,
      checkedSwitch,
      isLocaleSwitching,
      localeToggleLabel,
      mobilePrimaryNav,
      goToRoute,
      onDrawerNavigate,
      isRouteActive,
      onDesktopTab,
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
  padding-left 18px
  padding-right 18px

  .logo
    margin-right 16px
    font-size 24px
    font-style italic
    transform rotate(-5deg)
    background linear-gradient(to right, #ff4e76, #4c7fff)
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

.header--mobile
  position sticky
  padding 10px 12px
  min-height 58px
  justify-content space-between

  .mobile-menu-trigger
    border 0
    padding 0
    margin 0
    width 38px
    height 38px
    border-radius 10px
    background rgba(255, 255, 255, 0.16)
    display flex
    align-items center
    justify-content center
    cursor pointer

  .mobile-hamburger
    transform scale(.78)

  .logo--center
    position absolute
    left 50%
    top 50%
    margin 0
    transform translate(-50%, -50%) rotate(-5deg)
    font-size 20px

  .auth-entry
    border 1px solid var(--header-control-border)
    border-radius 999px
    background var(--header-control-bg)
    color var(--header-control-text)
    font-size 11px
    font-weight 700
    line-height 1
    padding 6px 10px
    min-width 78px
    cursor pointer

:deep(.desktop-nav)
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

.mobile-drawer-popup
  width min(80vw, 320px)
  height 100vh
  border-radius 0
  background var(--list-block-background)

.mobile-drawer
  padding 20px 14px
  display flex
  flex-direction column
  gap 10px

  &__title
    margin 0 0 6px
    color var(--black-70-percent)
    font-size 15px

  &__item
    border 1px solid var(--black-30-percent)
    border-radius 12px
    background var(--header-control-bg)
    color var(--header-control-text)
    padding 10px 12px
    display flex
    align-items center
    gap 10px
    font-size 14px
    cursor pointer

    &.is-active
      border-color var(--main-color)
      box-shadow 0 6px 12px var(--black-30-percent)

  &__tools
    margin-top 6px
    display flex
    align-items center
    justify-content space-between
    border 1px solid var(--black-30-percent)
    border-radius 12px
    padding 10px
    background var(--header-control-bg)

@media (min-width: 768px)
  .header--mobile
    display none
</style>
