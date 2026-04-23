<template>
  <div :class="$isMobile() ? 'px-24' : 'px-40'" class="header fw-700 py-16">
    <div :class="$isMobile() ? 'fz-20' : 'fz-24'" class="logo" @click="$goHome()">Demo</div>

    <div v-if="$isMobile()" class="mobile-actions">
      <van-switch
        v-if="showAppearanceSwitch"
        v-model="checkedSwitch"
        size="22px"
        class="appearance-switch appearance-switch--mobile"
        @change="onAppearanceChange"
      />
      <HamburgerMenu :opened="show" :absolute="false" @click="() => show = true" />
    </div>

    <div v-else class="desktop-actions">
      <van-cell-group :border="false" class="desktop-nav">
        <van-cell
          v-for="(item, index) in homeTabs"
          :key="index"
          :title="item.title"
          :icon="item.icon"
          clickable
          @click.stop="onTab(index)"
        />
      </van-cell-group>
      <van-switch
        v-if="showAppearanceSwitch"
        v-model="checkedSwitch"
        size="24px"
        class="appearance-switch appearance-switch--desktop"
        @change="onAppearanceChange"
      />
    </div>

    <van-popup v-model:show="show" position="right" round>
      <van-cell
        v-for="(item, index) in homeTabs"
        :key="index"
        :title="item.title"
        :icon="item.icon"
        clickable
        @click.stop="onTab(index)"
      />
    </van-popup>
  </div>
</template>

<script>
import { ref, getCurrentInstance, computed, watch } from 'vue'
import { useHomeStore } from '@/store/home'
import { useAppStore } from '@/store/main'
import { storeToRefs } from 'pinia'
import { applyAppearanceClass } from '@my-vue3/core'

import { CellGroup, Cell, Popup, Switch } from 'vant'
import HamburgerMenu from '@/components/HamburgerMenu'

import { homeTabs } from '@/store/constant'

export default {
  name: 'HeaderMenu',
  components: {
    'van-cell': Cell,
    'van-cell-group': CellGroup,
    'van-popup': Popup,
    'van-switch': Switch,
    HamburgerMenu
  },

  setup (_) {
    const { proxy } = getCurrentInstance()
    const homeStore = useHomeStore()
    const appStore = useAppStore()
    const { userAppearance } = storeToRefs(appStore)

    const show = ref(false)
    const checkedSwitch = ref(userAppearance.value === 'dark')

    const showAppearanceSwitch = computed(() => proxy?.$route?.name === 'Home')

    const onTab = (index) => {
      homeStore.onTab(index)
      proxy.$goToPage(homeStore.computePage)

      if (proxy.$isMobile()) {
        show.value = false
      }
    }

    const onAppearanceChange = (checked) => {
      const nextMode = checked ? 'dark' : 'light'
      applyAppearanceClass(nextMode)
      appStore.SetAppearance(nextMode)
    }

    watch(() => userAppearance.value, (value) => {
      checkedSwitch.value = value === 'dark'
    })

    return {
      show,
      homeTabs,
      checkedSwitch,
      showAppearanceSwitch,
      onTab,
      onAppearanceChange
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
    justify-content space-between
    box-shadow 2px 1px 6px 0 $neutral_normal_color
    border-radius 0 0 10px 10px
    background var(--white-80-percent-header)
    overflow hidden

    .logo
      margin-right auto
      font-style italic
      transform rotate(-5deg)
      background linear-gradient(to right, red, blue)
      background-clip text
      color transparent
      cursor pointer

    .mobile-actions
      display flex
      align-items center
      margin-left auto
      gap 12px

    .desktop-actions
      display flex
      align-items center
      margin-left auto
      flex-wrap nowrap

    .appearance-switch
      margin-top 0

      &--desktop
        margin-left 12px

  /deep/
    .van-cell-group
      display flex
      align-items center
      flex-wrap nowrap
      width auto
      background transparent

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
