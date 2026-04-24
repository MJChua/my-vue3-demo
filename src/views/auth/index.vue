<template>
  <main class="auth-page">
    <Header />

    <section class="container auth-page__panel">
      <h1>{{ $t('auth.title') }}</h1>
      <p>{{ $t('auth.subtitle') }}</p>

      <div class="auth-page__tabs">
        <button
          :class="['auth-tab', { 'is-active': activeTab === 'login' }]"
          type="button"
          @click="activeTab = 'login'"
        >
          {{ $t('auth.loginTab') }}
        </button>
        <button
          :class="['auth-tab', { 'is-active': activeTab === 'register' }]"
          type="button"
          @click="activeTab = 'register'"
        >
          {{ $t('auth.registerTab') }}
        </button>
      </div>

      <label>
        <span>{{ $t('auth.email') }}</span>
        <input type="email" placeholder="name@email.com" />
      </label>

      <label>
        <span>{{ $t('auth.password') }}</span>
        <input type="password" placeholder="********" />
      </label>

      <label v-if="activeTab === 'register'">
        <span>{{ $t('auth.confirmPassword') }}</span>
        <input type="password" placeholder="********" />
      </label>

      <button class="auth-page__submit" type="button">
        {{ activeTab === 'login' ? $t('auth.loginAction') : $t('auth.registerAction') }}
      </button>
    </section>
  </main>
</template>

<script>
import { ref } from 'vue'
import Header from '@/components/Header/index.vue'

export default {
  name: 'AuthPage',
  components: {
    Header
  },
  setup () {
    const activeTab = ref('login')

    return {
      activeTab
    }
  }
}
</script>

<style lang="stylus" scoped>
.auth-page
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

      input
        border 1px solid var(--black-30-percent)
        border-radius 10px
        padding 9px 10px
        background rgba(255, 255, 255, 0.86)
        color #1d2431

  &__tabs
    display flex
    gap 8px

  &__submit
    justify-self end
    border 0
    border-radius 999px
    padding 8px 14px
    color #fff
    background linear-gradient(120deg, #4ea6ff, #5d68ff)

.auth-tab
  border 1px solid var(--black-30-percent)
  border-radius 999px
  padding 7px 12px
  background var(--header-control-bg)
  color var(--header-control-text)

  &.is-active
    background var(--main-color)
    color #fff
    border-color transparent
</style>
