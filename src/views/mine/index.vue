<template>
  <main class="mine-page">
    <Header />

    <section class="container mine-page__hero">
      <div class="mine-page__profile-card">
        <img :src="mineAvatarUrl" :alt="$t('mine.title')" class="mine-page__avatar">

        <div class="mine-page__profile-body">
          <h1>{{ profile.displayName || $t('mine.title') }}</h1>
          <p>{{ $t('mine.subtitle') }}</p>

          <div class="mine-page__profile-meta">
            <span>{{ $t('mine.photosCount') }}: {{ myUploads.length }}</span>
            <span>{{ $t('mine.diariesCount') }}: {{ myDiaries.length }}</span>
          </div>
        </div>

        <button class="edit-button" type="button" @click="goProfileSettings">{{ $t('mine.profileEdit') }}</button>
      </div>
    </section>

    <section class="container mine-page__section">
      <div class="mine-page__section-header">
        <h2>{{ $t('mine.photoSection') }}</h2>
        <button class="edit-button" type="button" @click="isPhotoEditMode = !isPhotoEditMode">
          {{ isPhotoEditMode ? $t('mine.done') : $t('mine.edit') }}
        </button>
      </div>

      <p v-if="!myUploads.length" class="mine-page__empty">{{ $t('mine.photoEmpty') }}</p>

      <div v-else class="mine-page__upload-grid">
        <article v-for="item in myUploads" :key="item.id" class="mine-page__upload-card">
          <img :src="item.imageUrl" :alt="item.caption || 'upload'" class="mine-page__upload-image">
          <p class="mine-page__upload-caption">{{ item.caption || '-' }}</p>

          <button
            v-if="isPhotoEditMode"
            class="remove-button"
            type="button"
            @click="removeUpload(item.id)"
          >
            {{ $t('mine.delete') }}
          </button>
        </article>
      </div>
    </section>

    <section class="container mine-page__section">
      <div class="mine-page__section-header">
        <h2>{{ $t('mine.diarySection') }}</h2>
        <button class="edit-button" type="button" @click="isDiaryEditMode = !isDiaryEditMode">
          {{ isDiaryEditMode ? $t('mine.done') : $t('mine.edit') }}
        </button>
      </div>

      <p v-if="!myDiaries.length" class="mine-page__empty">{{ $t('mine.diaryEmpty') }}</p>

      <div v-else class="mine-page__diary-list">
        <article v-for="item in myDiaries" :key="item.id" class="mine-page__diary-card">
          <div class="mine-page__diary-top">
            <h3>{{ item.title }}</h3>
            <span v-if="item.draft" class="mine-page__draft-chip">{{ $t('mine.draft') }}</span>
          </div>

          <p>{{ item.content }}</p>

          <button
            v-if="isDiaryEditMode"
            class="remove-button"
            type="button"
            @click="removeDiary(item.id)"
          >
            {{ $t('mine.delete') }}
          </button>
        </article>
      </div>
    </section>
  </main>
</template>

<script>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import Header from '@/components/Header/index.vue'
import { useUserContentStore } from '@/store/userContent'
import avatarPlaceholder from '@/assets/images/common/avatar-placeholder.svg'

export default {
  name: 'MinePage',
  components: {
    Header
  },
  setup () {
    const router = useRouter()
    const userContentStore = useUserContentStore()
    const { profile, myDiaries, myUploads } = storeToRefs(userContentStore)

    const isPhotoEditMode = ref(false)
    const isDiaryEditMode = ref(false)

    const mineAvatarUrl = computed(() => {
      return profile.value.avatarUrl || avatarPlaceholder
    })

    const goProfileSettings = () => {
      router.push({
        name: 'ProfileSettings',
        query: {
          from: 'more'
        }
      })
    }

    const removeUpload = (id) => {
      userContentStore.removeUpload(id)
    }

    const removeDiary = (id) => {
      userContentStore.removeDiary(id)
    }

    return {
      profile,
      myDiaries,
      myUploads,
      isPhotoEditMode,
      isDiaryEditMode,
      mineAvatarUrl,
      goProfileSettings,
      removeUpload,
      removeDiary
    }
  }
}
</script>

<style lang="stylus" scoped>
.mine-page
  min-height 100vh
  padding-bottom 96px

  &__hero
    margin-top 14px

  &__profile-card
    border 1px solid var(--black-30-percent)
    border-radius 14px
    background var(--surface-card)
    padding 12px
    display grid
    grid-template-columns auto 1fr auto
    gap 10px
    align-items center

  &__avatar
    width 58px
    height 58px
    border-radius 50%
    object-fit cover
    border 1px solid var(--black-30-percent)

  &__profile-body
    min-width 0

    h1
      margin 0
      font-size 20px
      color var(--text-primary)

    p
      margin 6px 0 0
      color var(--text-secondary)
      font-size 13px

  &__profile-meta
    margin-top 8px
    display flex
    flex-wrap wrap
    gap 8px

    span
      border 1px solid var(--black-30-percent)
      border-radius 999px
      background var(--surface-soft)
      color var(--text-secondary)
      padding 3px 8px
      font-size 11px

  &__section
    margin-top 12px
    border 1px solid var(--black-30-percent)
    border-radius 14px
    background var(--surface-card)
    padding 12px
    color var(--text-primary)

  &__section-header
    display flex
    align-items center
    justify-content space-between
    gap 8px

    h2
      margin 0
      font-size 18px

  &__empty
    color var(--text-secondary)

  &__upload-grid
    margin-top 10px
    display grid
    grid-template-columns repeat(2, minmax(0, 1fr))
    gap 10px

  &__upload-card
    border 1px solid var(--black-30-percent)
    border-radius 12px
    background var(--surface-soft)
    padding 8px

  &__upload-image
    width 100%
    aspect-ratio 4 / 3
    border-radius 8px
    object-fit cover

  &__upload-caption
    margin 8px 0 0
    color var(--text-secondary)
    font-size 12px

  &__diary-list
    margin-top 10px
    display grid
    gap 10px

  &__diary-card
    border 1px solid var(--black-30-percent)
    border-radius 12px
    background var(--surface-soft)
    padding 10px

    h3
      margin 0
      color var(--text-primary)

    p
      margin 8px 0 0
      color var(--text-secondary)

  &__diary-top
    display flex
    align-items center
    justify-content space-between
    gap 8px

  &__draft-chip
    border-radius 999px
    border 1px solid var(--black-30-percent)
    background var(--surface-card)
    color var(--text-secondary)
    padding 3px 8px
    font-size 11px

.edit-button
  border 0
  border-radius 999px
  padding 7px 11px
  color #fff
  background linear-gradient(120deg, #4ea6ff, #5d68ff)

.remove-button
  margin-top 10px
  border 1px solid rgba(213, 88, 95, 0.45)
  border-radius 999px
  padding 5px 10px
  color #c33a42
  background rgba(255, 115, 133, 0.1)

@media (min-width: 768px)
  .mine-page
    padding-bottom 36px

    &__profile-card
      padding 14px 16px

    &__upload-grid
      grid-template-columns repeat(3, minmax(0, 1fr))
</style>
