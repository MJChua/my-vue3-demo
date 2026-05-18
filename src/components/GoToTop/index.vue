<template>
  <transition name="go-top-fade">
    <button
      v-show="isVisible"
      class="go-top-button"
      type="button"
      @click="scrollToTop"
    >
      <img :src="goTopIcon" alt="" aria-hidden="true" class="go-top-icon" />
    </button>
  </transition>
</template>

<script>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import goTopIcon from '@/assets/images/common/go-top-arrow.jpg'

const SHOW_THRESHOLD = 280

export default {
  name: 'GoToTop',
  setup () {
    const isVisible = ref(false)
    const isTicking = ref(false)

    const updateVisibility = () => {
      isVisible.value = window.scrollY > SHOW_THRESHOLD
    }

    const handleScroll = () => {
      if (isTicking.value) return

      isTicking.value = true
      window.requestAnimationFrame(() => {
        updateVisibility()
        isTicking.value = false
      })
    }

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    onMounted(() => {
      updateVisibility()
      window.addEventListener('scroll', handleScroll, { passive: true })
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      isVisible,
      goTopIcon,
      scrollToTop
    }
  }
}
</script>

<style lang="stylus" scoped>
.go-top-button
  position fixed
  right 16px
  bottom 96px
  z-index $z-index-float-action-button
  width 44px
  height 44px
  border none
  border-radius 999px
  overflow hidden
  display flex
  align-items center
  justify-content center
  padding 0
  font-size 18px
  font-weight 700
  line-height 1
  color var(--header-control-text)
  background var(--header-control-bg)
  box-shadow 0 8px 18px rgba(0, 0, 0, 0.18)
  opacity .76
  cursor pointer
  backdrop-filter blur(6px)
  -webkit-backdrop-filter blur(6px)
  transition opacity .2s ease, transform .2s ease, box-shadow .2s ease

  &:hover
    opacity .92
    transform translateY(-2px)
    box-shadow 0 10px 22px rgba(0, 0, 0, 0.22)

  &:active
    transform translateY(0)

  &:focus-visible
    outline 2px solid var(--main-color)
    outline-offset 2px

.go-top-icon
  width 100%
  height 100%
  object-fit cover
  display block

.go-top-fade-enter-active,
.go-top-fade-leave-active
  transition opacity .18s ease, transform .18s ease

.go-top-fade-enter-from,
.go-top-fade-leave-to
  opacity 0
  transform translateY(8px) scale(.92)

@media (max-width: 767px)
  .go-top-button
    width 38px
    height 38px
    font-size 16px
    right 12px
    bottom 82px

</style>
