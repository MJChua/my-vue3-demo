<template>
  <Header />
  <main class="about-us container">
    <div class="mx-auto text-center">
      <strong class="title p-10 fz-24">{{ $t('aboutUs.title') }}</strong>

      <div class="content mt-28 p-20">
        <p :class="$isMobile() ? 'fz-30' : 'fz-40'">{{ $t('aboutUs.line1') }}</p>
        <p :class="$isMobile() ? 'fz-30' : 'fz-40'">{{ $t('aboutUs.line2') }}</p>
        <p :class="$isMobile() ? '' : 'fz-20'">{{ $t('aboutUs.description') }}</p>
      </div>
    </div>
  </main>
</template>

<script>
import Header from '@/components/Header/index.vue'

export default {
  name: 'AboutUsPage',
  components: {
    Header
  }
}
</script>

<style lang="stylus" scoped>
.about-us
  margin-top 50px
  height 100vh

  .title
    text-decoration underline

  .content
    background var(--white-50-percent)
    border-radius 15px
</style>
