<template>
  <Header />
  <main class="project container">
    <div class="mx-auto text-center">
      <strong class="title p-10 fz-24">{{ $t('project.title') }}</strong>

      <div class="content mt-28 p-20">
        <p :class="$isMobile() ? 'fz-30' : 'fz-40'">{{ $t('project.line1') }}</p>
        <p :class="$isMobile() ? 'fz-30' : 'fz-40'">{{ $t('project.line2') }}</p>
        <p :class="$isMobile() ? '' : 'fz-20'">{{ $t('project.line3') }}</p>
      </div>
    </div>
  </main>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'ProjectPage',
  components: {
    Header
  }
}
</script>

<style lang="stylus" scoped>
.project
  margin-top 50px
  height 100vh

  .title
    text-decoration underline

  .content
    background var(--white-50-percent)
    border-radius 15px
</style>
