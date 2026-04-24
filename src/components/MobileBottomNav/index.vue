<template>
  <nav v-if="$isMobile()" class="mobile-bottom-nav" role="navigation" :aria-label="$t('mobileNav.navLabel')">
    <button
      :class="['mobile-bottom-nav__item', { 'is-active': isHomeActive }]"
      type="button"
      @click="goToRoute('Home')"
    >
      <van-icon name="wap-home-o" />
      <span>{{ $t('mobileNav.home') }}</span>
    </button>

    <button
      :class="['mobile-bottom-nav__item', { 'is-active': isDiaryActive }]"
      type="button"
      @click="goToRoute('Diary')"
    >
      <van-icon name="notes-o" />
      <span>{{ $t('mobileNav.diary') }}</span>
    </button>

    <div class="mobile-bottom-nav__fab-slot">
      <button
        :aria-expanded="isFabOpen ? 'true' : 'false'"
        :aria-label="$t('mobileNav.plus')"
        :class="['mobile-bottom-nav__fab', { 'is-open': isFabOpen }]"
        type="button"
        @click="toggleFab"
      >
        <van-icon :name="isFabOpen ? 'cross' : 'plus'" />
      </button>

      <button
        :class="['mobile-bottom-nav__quick-action', 'mobile-bottom-nav__quick-action--left', { 'is-open': isFabOpen }]"
        type="button"
        @click="onQuickAction('DiaryCreate')"
      >
        <van-icon class="mobile-bottom-nav__quick-icon" name="edit" />
        <span>{{ $t('mobileNav.newDiary') }}</span>
      </button>

      <button
        :class="['mobile-bottom-nav__quick-action', 'mobile-bottom-nav__quick-action--right', { 'is-open': isFabOpen }]"
        type="button"
        @click="onQuickAction('UploadImage')"
      >
        <van-icon class="mobile-bottom-nav__quick-icon" name="photo-o" />
        <span>{{ $t('mobileNav.uploadImage') }}</span>
      </button>
    </div>

    <button
      :class="['mobile-bottom-nav__item', { 'is-active': isMineActive }]"
      type="button"
      @click="goToRoute('Mine')"
    >
      <van-icon name="contact-o" />
      <span>{{ $t('mobileNav.mine') }}</span>
    </button>

    <button
      :class="['mobile-bottom-nav__item', { 'is-active': isMoreActive }]"
      type="button"
      @click="goToRoute('More')"
    >
      <van-icon name="apps-o" />
      <span>{{ $t('mobileNav.more') }}</span>
    </button>
  </nav>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from 'vant'

export default {
  name: 'MobileBottomNav',
  components: {
    'van-icon': Icon
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const isFabOpen = ref(false)

    const homeRouteNames = ['Home']
    const diaryRouteNames = ['Diary', 'DiaryCreate']
    const mineRouteNames = ['Mine']
    const moreRouteNames = ['More', 'AboutUs', 'Service', 'Project', 'ProfileSettings']

    const isHomeActive = computed(() => homeRouteNames.includes(route.name))
    const isDiaryActive = computed(() => diaryRouteNames.includes(route.name))
    const isMineActive = computed(() => mineRouteNames.includes(route.name))
    const isMoreActive = computed(() => moreRouteNames.includes(route.name))

    const goToRoute = (name) => {
      isFabOpen.value = false
      if (route.name === name) return
      router.push({ name })
    }

    const toggleFab = () => {
      isFabOpen.value = !isFabOpen.value
    }

    const onQuickAction = (name) => {
      isFabOpen.value = false
      router.push({ name })
    }

    watch(() => route.fullPath, () => {
      isFabOpen.value = false
    })

    return {
      isFabOpen,
      isHomeActive,
      isDiaryActive,
      isMineActive,
      isMoreActive,
      goToRoute,
      toggleFab,
      onQuickAction
    }
  }
}
</script>

<style lang="stylus" scoped>
.mobile-bottom-nav
  position fixed
  left 0
  right 0
  bottom 0
  z-index ($z-index-footer-navbar + 2)
  height 72px
  padding 8px 8px calc(8px + env(safe-area-inset-bottom, 0px))
  display grid
  grid-template-columns repeat(5, minmax(0, 1fr))
  align-items end
  background var(--header-control-bg)
  backdrop-filter blur(10px)
  -webkit-backdrop-filter blur(10px)
  border-top 1px solid var(--black-30-percent)
  box-shadow 0 -8px 20px rgba(13, 18, 34, 0.16)

  &__item
    border 0
    background transparent
    color var(--black-70-percent)
    display flex
    flex-direction column
    align-items center
    justify-content center
    gap 2px
    font-size 10px
    cursor pointer
    transition color .18s ease

    .van-icon
      font-size 20px

    &.is-active
      color var(--main-color)

  &__fab-slot
    position relative
    display flex
    justify-content center
    align-items center

  &__fab
    width 44px
    height 44px
    border 0
    border-radius 999px
    background linear-gradient(120deg, #4ea6ff, #5d68ff)
    color #fff
    box-shadow 0 8px 16px rgba(38, 74, 188, 0.35)
    transform translateY(-14px)
    cursor pointer
    transition transform .2s ease, box-shadow .2s ease

    .van-icon
      font-size 24px

    &.is-open
      transform translateY(-14px) rotate(45deg)

  &__quick-action
    position absolute
    top -56px
    width 88px
    height 38px
    border 0
    border-radius 999px
    background rgba(255, 255, 255, 0.94)
    color var(--header-control-text)
    box-shadow 0 8px 16px rgba(13, 18, 34, 0.2)
    display flex
    align-items center
    justify-content center
    gap 4px
    font-size 11px
    font-weight 700
    opacity 0
    pointer-events none
    transform translateY(6px) scale(.92)
    transition opacity .2s ease, transform .2s ease

    &.is-open
      opacity 1
      pointer-events auto
      transform translateY(0) scale(1)

    &--left
      right 26px

    &--right
      left 26px

  &__quick-icon
    font-size 14px

@media (min-width: 768px)
  .mobile-bottom-nav
    display none
</style>
