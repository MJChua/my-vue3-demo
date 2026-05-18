<template>
  <main class="service-page">
    <Header />

    <section class="container service-page__container">
      <button class="service-page__back" type="button" @click="goBackToMore">{{ $t('common.backToMore') }}</button>

      <div class="service-page__panel">
        <strong class="service-page__title">{{ $t('service.title') }}</strong>

        <div class="service-page__content">
          <p :class="$isMobile() ? 'fz-30' : 'fz-40'">{{ $t('service.line1') }}</p>
          <p :class="$isMobile() ? 'fz-30' : 'fz-40'">{{ $t('service.line2') }}</p>
          <p :class="$isMobile() ? '' : 'fz-20'">{{ $t('service.line3') }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'

import Header from '@/components/Header/index.vue'

export default {
  name: 'ServicePage',
  components: {
    Header
  },
  setup () {
    const route = useRoute()
    const router = useRouter()

    const goBackToMore = () => {
      if (route.query.from === 'more') {
        router.push({ name: 'More' })
        return
      }
      router.back()
    }

    return {
      goBackToMore
    }
  }
}
</script>

<style lang="stylus" scoped>
.service-page
  min-height 100vh
  padding-bottom 96px

  &__container
    margin-top 16px

  &__back
    border 1px solid var(--black-30-percent)
    border-radius 999px
    padding 7px 12px
    background var(--surface-soft)
    color var(--text-primary)

  &__panel
    margin-top 12px
    border 1px solid var(--black-30-percent)
    border-radius 14px
    background var(--surface-card)
    padding 16px

  &__title
    color var(--text-primary)
    text-decoration underline

  &__content
    margin-top 16px
    color var(--text-secondary)

@media (min-width: 768px)
  .service-page
    padding-bottom 36px
</style>
