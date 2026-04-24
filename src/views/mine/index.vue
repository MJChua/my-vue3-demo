<template>
  <main class="mine-page">
    <Header />

    <section class="container mine-page__hero">
      <h1>{{ $t('mine.title') }}</h1>
      <p>{{ $t('mine.subtitle') }}</p>
    </section>

    <section class="container mine-page__section">
      <div class="mine-page__section-header">
        <h2>{{ $t('mine.photoSection') }}</h2>
        <button class="edit-button" type="button">{{ $t('mine.edit') }}</button>
      </div>
      <p>{{ $t('mine.photoEmpty') }}</p>
    </section>

    <section class="container mine-page__section">
      <div class="mine-page__section-header">
        <h2>{{ $t('mine.diarySection') }}</h2>
        <button class="edit-button" type="button">{{ $t('mine.edit') }}</button>
      </div>
      <p>{{ $t('mine.diaryEmpty') }}</p>
    </section>
  </main>
</template>

<script>
import Header from '@/components/Header/index.vue'

export default {
  name: 'MinePage',
  components: {
    Header
  }
}
</script>

<style lang="stylus" scoped>
.mine-page
  min-height 100vh

  &__hero
    margin-top 16px

    h1
      margin 0
      color var(--black-70-percent)

    p
      margin 8px 0 0
      color var(--black-70-percent)

  &__section
    margin-top 12px
    border 1px solid var(--black-30-percent)
    border-radius 14px
    background var(--white-80-percent-header)
    padding 14px
    color var(--black-70-percent)

  &__section-header
    display flex
    align-items center
    justify-content space-between
    gap 8px

    h2
      margin 0
      font-size 18px

.edit-button
  border 0
  border-radius 999px
  padding 7px 11px
  color #fff
  background linear-gradient(120deg, #4ea6ff, #5d68ff)
</style>
