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
      <p v-if="!filteredPosts.length" class="diary-page__empty">{{ $t('diary.empty') }}</p>

      <article
        v-for="post in filteredPosts"
        :key="post.id"
        :id="`diary-${post.id}`"
        :class="['diary-card', { 'is-focused': focusedDiaryId === post.id }]"
      >
        <div class="diary-card__top">
          <h3>{{ post.title }}</h3>
          <span>{{ formatDate(post.createdAt) }}</span>
        </div>

        <p class="diary-card__meta">{{ $t('diary.author') }}: {{ post.author }}</p>
        <img v-if="post.imageUrl" :src="post.imageUrl" :alt="post.title" class="diary-card__image">
        <p>{{ post.content }}</p>

        <div class="diary-card__bottom">
          <span class="diary-card__likes">♥ {{ post.likes || 0 }}</span>
          <button class="diary-card__cta" type="button" @click="onReadMore(post.id)">{{ $t('diary.readMore') }}</button>
        </div>
      </article>
    </section>
  </main>
</template>

<script>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

import Header from '@/components/Header/index.vue'
import { useUserContentStore } from '@/store/userContent'

const filters = [
  { value: 'latest', labelKey: 'diary.latest' },
  { value: 'popular', labelKey: 'diary.popular' },
  { value: 'following', labelKey: 'diary.following' }
]

export default {
  name: 'DiaryPage',
  components: {
    Header
  },
  setup (_, { proxy }) {
    const route = useRoute()
    const userContentStore = useUserContentStore()
    const { communityDiaryFeed } = storeToRefs(userContentStore)

    const activeFilter = ref('latest')
    const focusedDiaryId = ref('')

    const filteredPosts = computed(() => {
      return communityDiaryFeed.value.filter((item) => item.filterType === activeFilter.value)
    })

    const formatDate = (value) => {
      return new Intl.DateTimeFormat('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(new Date(value))
    }

    const focusDiaryCard = async (diaryId) => {
      if (!diaryId) return
      focusedDiaryId.value = diaryId
      await nextTick()
      const target = document.getElementById(`diary-${diaryId}`)
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    const onReadMore = (id) => {
      focusDiaryCard(id)
      proxy?.$toast?.({ message: proxy.$t('diary.readMore'), position: 'top' })
    }

    watch(
      () => route.query.diaryId,
      (value) => {
        if (typeof value === 'string') {
          focusDiaryCard(value)
        }
      },
      { immediate: true }
    )

    onMounted(() => {
      if (route.query.fromWall) {
        proxy?.$toast?.({ message: proxy.$t('diary.linkedFromWall'), position: 'top' })
      }
    })

    return {
      filters,
      activeFilter,
      focusedDiaryId,
      filteredPosts,
      formatDate,
      onReadMore
    }
  }
}
</script>

<style lang="stylus" scoped>
.diary-page
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

  &__filters
    margin-top 14px
    display flex
    gap 8px
    flex-wrap wrap

  &__list
    margin-top 12px
    display grid
    gap 10px

  &__empty
    margin 0
    color var(--text-secondary)

.chip
  border 1px solid var(--black-30-percent)
  border-radius 999px
  background var(--surface-soft)
  color var(--text-primary)
  padding 7px 12px
  cursor pointer

  &.is-active
    background var(--main-color)
    color #fff
    border-color transparent

.diary-card
  border 1px solid var(--black-30-percent)
  border-radius 14px
  background var(--surface-card)
  padding 14px
  transition box-shadow .2s ease

  &.is-focused
    box-shadow 0 0 0 2px rgba(93, 104, 255, 0.4)

  h3
    margin 0
    color var(--text-primary)

  p
    margin 8px 0 0
    color var(--text-secondary)

  &__image
    margin-top 10px
    width 100%
    max-height 260px
    border-radius 10px
    object-fit cover

  &__top
    display flex
    align-items center
    justify-content space-between
    gap 8px

    span
      color var(--text-secondary)
      font-size 11px

  &__meta
    font-size 12px

  &__bottom
    margin-top 12px
    display flex
    align-items center
    justify-content space-between
    gap 8px

  &__likes
    color var(--text-secondary)
    font-size 12px

  &__cta
    border 0
    border-radius 999px
    padding 8px 12px
    color #fff
    background linear-gradient(120deg, #4ea6ff, #5d68ff)

@media (min-width: 768px)
  .diary-page
    padding-bottom 36px
</style>
