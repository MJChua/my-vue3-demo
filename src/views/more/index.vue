<template>
  <main class="more-page">
    <Header />

    <section class="container more-page__hero">
      <h1>{{ $t('more.title') }}</h1>
      <p>{{ $t('more.subtitle') }}</p>
    </section>

    <section class="container more-page__list">
      <button
        v-for="item in moreItems"
        :key="item.name"
        class="more-card"
        type="button"
        @click="goTo(item.name)"
      >
        <strong>{{ $t(item.labelKey) }}</strong>
      </button>
    </section>
  </main>
</template>

<script>
import { useRouter } from 'vue-router'
import Header from '@/components/Header/index.vue'

const moreItems = [
  { name: 'AboutUs', labelKey: 'more.aboutUs' },
  { name: 'Service', labelKey: 'more.service' },
  { name: 'ProfileSettings', labelKey: 'more.profileSettings' }
]

export default {
  name: 'MorePage',
  components: {
    Header
  },
  setup () {
    const router = useRouter()

    const goTo = (name) => {
      router.push({
        name,
        query: {
          from: 'more'
        }
      })
    }

    return {
      moreItems,
      goTo
    }
  }
}
</script>

<style lang="stylus" scoped>
.more-page
  min-height 100vh
  padding-bottom 96px

  &__hero
    margin-top 16px

    h1
      margin 0
      color var(--text-primary)

    p
      margin 8px 0 0
      color var(--text-secondary)

  &__list
    margin-top 14px
    display grid
    gap 10px

.more-card
  border 1px solid var(--black-30-percent)
  border-radius 14px
  background var(--surface-card)
  padding 14px
  text-align left
  color var(--text-primary)

@media (min-width: 768px)
  .more-page
    padding-bottom 36px
</style>
