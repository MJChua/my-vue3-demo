<template>
  <main class="diary-create">
    <Header />

    <section class="container diary-create__panel">
      <h1>{{ $t('diaryCreate.title') }}</h1>
      <p>{{ $t('diaryCreate.subtitle') }}</p>

      <label>
        <span>Title</span>
        <input type="text" placeholder="Today with my pet..." />
      </label>

      <label>
        <span>Content</span>
        <textarea rows="6" placeholder="Write your diary..." />
      </label>

      <div class="diary-create__actions">
        <button class="button button--ghost" type="button">{{ $t('diaryCreate.saveDraft') }}</button>
        <button class="button" type="button">{{ $t('diaryCreate.publish') }}</button>
      </div>
    </section>
  </main>
</template>

<script>
import Header from '@/components/Header/index.vue'

export default {
  name: 'DiaryCreatePage',
  components: {
    Header
  }
}
</script>

<style lang="stylus" scoped>
.diary-create
  min-height 100vh

  &__panel
    margin-top 16px
    display grid
    gap 12px
    border 1px solid var(--black-30-percent)
    border-radius 16px
    background var(--white-80-percent-header)
    padding 14px

    h1
      margin 0
      color var(--black-70-percent)

    p
      margin 0
      color var(--black-70-percent)

    label
      display grid
      gap 6px
      color var(--black-70-percent)

      input, textarea
        border 1px solid var(--black-30-percent)
        border-radius 10px
        padding 9px 10px
        background rgba(255, 255, 255, 0.86)
        color #1d2431

  &__actions
    display flex
    justify-content flex-end
    gap 8px

.button
  border 0
  border-radius 999px
  padding 8px 14px
  color #fff
  background linear-gradient(120deg, #4ea6ff, #5d68ff)

  &--ghost
    border 1px solid var(--black-30-percent)
    color var(--header-control-text)
    background var(--header-control-bg)
</style>
