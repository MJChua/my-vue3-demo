<template>
  <button
    :aria-label="ariaLabel"
    :class="['theme-toggle', { 'is-dark': checked }]"
    aria-live="polite"
    title="Toggle theme"
    type="button"
    @click="onToggle"
  >
    <svg class="sun-and-moon" aria-hidden="true" viewBox="0 0 24 24">
      <circle class="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" />
      <g class="sun-beams">
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </g>
      <mask id="moon-mask">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <circle class="moon-cut" cx="24" cy="10" r="6" fill="black" />
      </mask>
    </svg>
  </button>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'ThemeSwitch',
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change'],
  setup (props, { emit }) {
    const ariaLabel = computed(() => {
      return props.checked ? 'dark mode' : 'light mode'
    })

    const onToggle = () => {
      emit('change', !props.checked)
    }

    return {
      ariaLabel,
      onToggle
    }
  }
}
</script>

<style lang="stylus" scoped>
.theme-toggle
  --size 34px
  border 0
  padding 0
  inline-size var(--size)
  block-size var(--size)
  aspect-ratio 1
  border-radius 50%
  cursor pointer
  touch-action manipulation
  -webkit-tap-highlight-color transparent
  outline-offset 3px
  display inline-flex
  align-items center
  justify-content center
  background var(--surface-soft)
  color var(--text-primary)
  border 1px solid var(--black-30-percent)

  &:focus-visible
    outline 2px solid var(--main-color)

  @media (hover: none)
    --size 38px

.sun-and-moon
  inline-size 70%
  block-size 70%

  & > :is(.sun, .sun-beams)
    transform-origin center center

  & > .sun
    fill currentColor
    transition transform .35s ease, fill .2s ease

  & > .sun-beams
    stroke currentColor
    stroke-width 2
    stroke-linecap round
    transition transform .35s ease, opacity .2s ease

  & .moon-cut
    transition cx .25s ease, transform .25s ease

.theme-toggle.is-dark
  .sun-and-moon
    & > .sun
      transform scale(1.75)

    & > .sun-beams
      opacity 0
      transform rotateZ(-25deg)

    .moon-cut
      transform translateX(-7px)

@supports (cx: 1px)
  .theme-toggle.is-dark
    .sun-and-moon
      .moon-cut
        transform translateX(0)
        cx 17
</style>
