<template>
  <main class="upload-page">
    <Header />

    <section class="container upload-page__panel">
      <h1>{{ $t('uploadImage.title') }}</h1>
      <p>{{ $t('uploadImage.subtitle') }}</p>

      <label class="upload-page__picker">
        <input accept="image/*" class="upload-page__input" type="file" @change="onFileChange">
        <span>{{ $t('uploadImage.uploadButton') }}</span>
      </label>

      <div class="upload-page__dropzone">
        <img v-if="previewUrl" :src="previewUrl" :alt="$t('uploadImage.preview')" class="upload-page__preview">
        <span v-else>{{ $t('uploadImage.preview') }}</span>
      </div>

      <label>
        <span>{{ $t('uploadImage.captionLabel') }}</span>
        <input v-model.trim="caption" type="text" :placeholder="$t('uploadImage.captionPlaceholder')">
      </label>

      <label>
        <span>{{ $t('uploadImage.categoryLabel') }}</span>
        <select v-model="category">
          <option value="dog">{{ $t('uploadImage.categoryDog') }}</option>
          <option value="cat">{{ $t('uploadImage.categoryCat') }}</option>
          <option value="exotic">{{ $t('uploadImage.categoryExotic') }}</option>
        </select>
      </label>

      <label>
        <span>{{ $t('uploadImage.relatedDiaryLabel') }}</span>
        <select v-model="diaryId">
          <option value="">{{ $t('uploadImage.noRelatedDiary') }}</option>
          <option v-for="item in myPublishedDiaries" :key="item.id" :value="item.id">
            {{ item.title }}
          </option>
        </select>
      </label>

      <label class="upload-page__confirm">
        <input v-model="isPetConfirmed" type="checkbox">
        <span>{{ $t('uploadImage.petOnlyConfirm') }}</span>
      </label>

      <button class="upload-page__submit" type="button" @click="onSubmit">{{ $t('uploadImage.submit') }}</button>
    </section>
  </main>
</template>

<script>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import Header from '@/components/Header/index.vue'
import { useUserContentStore } from '@/store/userContent'

function readFileAsDataUrl (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

export default {
  name: 'UploadImagePage',
  components: {
    Header
  },
  setup (_, { proxy }) {
    const router = useRouter()
    const userContentStore = useUserContentStore()
    const { myPublishedDiaries } = storeToRefs(userContentStore)

    const previewUrl = ref('')
    const caption = ref('')
    const category = ref('dog')
    const diaryId = ref('')
    const isPetConfirmed = ref(false)

    const onFileChange = async (event) => {
      const file = event.target.files?.[0]
      if (!file) return

      try {
        previewUrl.value = await readFileAsDataUrl(file)
      } catch (error) {
        console.warn('upload preview error:', error)
      }
    }

    const onSubmit = () => {
      if (!previewUrl.value) {
        proxy?.$toast?.({ message: proxy.$t('uploadImage.validation'), position: 'top' })
        return
      }

      if (!isPetConfirmed.value) {
        proxy?.$toast?.({ message: proxy.$t('uploadImage.petOnlyError'), position: 'top' })
        return
      }

      userContentStore.addUpload({
        imageUrl: previewUrl.value,
        caption: caption.value,
        category: category.value,
        diaryId: diaryId.value || null,
        isPetConfirmed: true,
        likes: 0,
        views: 0
      })

      proxy?.$toast?.({ message: proxy.$t('uploadImage.submitSuccess'), position: 'top' })
      router.push({ name: 'Mine' })
    }

    return {
      myPublishedDiaries,
      previewUrl,
      caption,
      category,
      diaryId,
      isPetConfirmed,
      onFileChange,
      onSubmit
    }
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
    background var(--surface-card)
    padding 14px

    h1
      margin 0
      color var(--text-primary)

    p
      margin 0
      color var(--text-secondary)

    label
      display grid
      gap 6px
      color var(--text-primary)

      input, select
        border 1px solid var(--black-30-percent)
        border-radius 10px
        padding 9px 10px
        background var(--surface-soft)
        color var(--text-primary)

  &__confirm
    display inline-flex !important
    align-items center
    gap 8px

    input
      width 16px
      height 16px
      margin 0

  &__picker
    position relative
    border 1px dashed var(--black-30-percent)
    border-radius 12px
    background var(--surface-soft)
    min-height 44px
    display flex !important
    align-items center
    justify-content center
    cursor pointer

    span
      color var(--text-primary)
      font-weight 700

  &__input
    position absolute
    inset 0
    opacity 0
    cursor pointer

  &__dropzone
    min-height 180px
    border 2px dashed var(--black-30-percent)
    border-radius 14px
    display flex
    align-items center
    justify-content center
    color var(--text-secondary)
    background var(--surface-soft)
    overflow hidden

  &__preview
    width 100%
    height 100%
    object-fit cover

  &__submit
    justify-self end
    border 0
    border-radius 999px
    padding 8px 14px
    color #fff
    background linear-gradient(120deg, #4ea6ff, #5d68ff)
</style>
