<template>
  <main class="upload-page">
    <Header />

    <section class="container upload-page__panel">
      <h1>{{ $t('uploadImage.title') }}</h1>
      <p>{{ $t('uploadImage.subtitle') }}</p>

      <div class="upload-page__dropzone">
        <span>{{ $t('uploadImage.uploadButton') }}</span>
      </div>

      <button class="upload-page__submit" type="button">{{ $t('uploadImage.submit') }}</button>
    </section>
  </main>
</template>

<script>
import Header from '@/components/Header/index.vue'

export default {
  name: 'UploadImagePage',
  components: {
    Header
  }
}
</script>

<style lang="stylus" scoped>
.upload-page
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

  &__dropzone
    min-height 160px
    border 2px dashed var(--black-30-percent)
    border-radius 14px
    display flex
    align-items center
    justify-content center
    color var(--black-70-percent)
    background rgba(255, 255, 255, 0.6)

  &__submit
    justify-self end
    border 0
    border-radius 999px
    padding 8px 14px
    color #fff
    background linear-gradient(120deg, #4ea6ff, #5d68ff)
</style>
