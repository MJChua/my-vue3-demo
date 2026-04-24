<template>
  <main class="diary-page">
    <Header />

    <section class="container diary-page__hero">
      <h1>{{ $t('diary.title') }}</h1>
      <p>{{ $t('diary.subtitle') }}</p>
    </section>

    <section class="container diary-page__filters">
      <button
        v-for="item in filters"
        :key="item.value"
        :class="['chip', { 'is-active': activeFilter === item.value }]"
        type="button"
        @click="activeFilter = item.value"
      >
        {{ $t(item.labelKey) }}
      </button>
    </section>

    <section class="container diary-page__list">
      <article v-for="post in filteredPosts" :key="post.id" class="diary-card">
        <h3>{{ post.title }}</h3>
        <p class="diary-card__meta">{{ $t('diary.author') }}: {{ post.author }}</p>
        <p>{{ post.excerpt }}</p>
        <button class="diary-card__cta" type="button">{{ $t('diary.readMore') }}</button>
      </article>
    </section>
  </main>
</template>

<script>
import { computed, ref } from 'vue'
import Header from '@/components/Header/index.vue'

const filters = [
  { value: 'latest', labelKey: 'diary.latest' },
  { value: 'popular', labelKey: 'diary.popular' },
  { value: 'following', labelKey: 'diary.following' }
]

const posts = [
  { id: 1, title: 'Mochi learned to spin today', author: 'Amy', type: 'latest', excerpt: 'Sharing the cutest trick training progress from today.' },
  { id: 2, title: 'Rainy day cat window diary', author: 'Leo', type: 'popular', excerpt: 'A short visual diary about a cat watching the rain all afternoon.' },
  { id: 3, title: 'How we built a bunny-safe room', author: 'Nina', type: 'following', excerpt: 'A practical setup note for people living with curious rabbits.' }
]

export default {
  name: 'DiaryPage',
  components: {
    Header
  },
  setup () {
    const activeFilter = ref('latest')

    const filteredPosts = computed(() => {
      return posts.filter((item) => item.type === activeFilter.value)
    })

    return {
      filters,
      activeFilter,
      filteredPosts
    }
  }
}
</script>

<style lang="stylus" scoped>
.diary-page
  min-height 100vh

  &__hero
    margin-top 16px

    h1
      margin 0
      color var(--black-70-percent)

    p
      margin 8px 0 0
      color var(--black-70-percent)

  &__filters
    margin-top 14px
    display flex
    gap 8px
    flex-wrap wrap

  &__list
    margin-top 12px
    display grid
    gap 10px

.chip
  border 1px solid var(--black-30-percent)
  border-radius 999px
  background var(--header-control-bg)
  color var(--header-control-text)
  padding 7px 12px
  cursor pointer

  &.is-active
    background var(--main-color)
    color #fff
    border-color transparent

.diary-card
  border 1px solid var(--black-30-percent)
  border-radius 14px
  background var(--white-80-percent-header)
  padding 14px

  h3
    margin 0
    color var(--black-70-percent)

  p
    margin 8px 0 0
    color var(--black-70-percent)

  &__meta
    font-size 12px

  &__cta
    margin-top 12px
    border 0
    border-radius 999px
    padding 8px 12px
    color #fff
    background linear-gradient(120deg, #4ea6ff, #5d68ff)
</style>
