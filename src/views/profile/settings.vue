<template>
  <main class="profile-settings">
    <Header />

    <section class="container profile-settings__panel">
      <h1>{{ $t('profileSettings.title') }}</h1>
      <article class="profile-settings__card">
        <strong>{{ $t('profileSettings.appearance') }}</strong>
        <p>{{ $t('profileSettings.descLine1') }}</p>
        <p>{{ $t('profileSettings.descLine2') }}</p>
      </article>
    </section>
  </main>
</template>

<script>
import Header from '@/components/Header/index.vue'

export default {
  name: 'ProfileSettingsPage',
  components: {
    Header
  }
}
</script>

<style lang="stylus" scoped>
.profile-settings
  min-height 100vh

  &__panel
    margin-top 16px

    h1
      margin 0
      color var(--black-70-percent)

  &__card
    margin-top 12px
    border 1px solid var(--black-30-percent)
    border-radius 14px
    background var(--white-80-percent-header)
    padding 14px
    color var(--black-70-percent)

    p
      margin 8px 0 0
</style>
