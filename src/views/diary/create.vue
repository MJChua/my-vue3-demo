<template>
  <main class="diary-create">
    <Header />

    <section class="container diary-create__panel">
      <h1>{{ $t('diaryCreate.title') }}</h1>
      <p>{{ $t('diaryCreate.subtitle') }}</p>

      <label>
        <span>{{ $t('diaryCreate.titleLabel') }}</span>
        <input v-model.trim="title" type="text" :placeholder="$t('diaryCreate.titlePlaceholder')">
      </label>

      <label>
        <span>{{ $t('diaryCreate.contentLabel') }}</span>
        <textarea
          v-model.trim="content"
          rows="6"
          :placeholder="$t('diaryCreate.contentPlaceholder')"
        />
      </label>

      <label class="diary-create__image-picker">
        <span>{{ $t('diaryCreate.imageLabel') }}</span>
        <input accept="image/*" class="diary-create__image-input" type="file" @change="onImageChange">
        <em>{{ selectedImageLabel }}</em>
      </label>

      <div v-if="imageUrl" class="diary-create__image-preview">
        <img :src="imageUrl" :alt="$t('diaryCreate.imageLabel')">
      </div>

      <label>
        <span>{{ $t('diaryCreate.filterLabel') }}</span>
        <select v-model="filterType">
          <option value="latest">{{ $t('diaryCreate.filterLatest') }}</option>
          <option value="popular">{{ $t('diaryCreate.filterPopular') }}</option>
          <option value="following">{{ $t('diaryCreate.filterFollowing') }}</option>
        </select>
      </label>

      <div class="diary-create__actions">
        <button class="button button--ghost" type="button" @click="onSaveDraft">{{ $t('diaryCreate.saveDraft') }}</button>
        <button class="button" type="button" @click="onPublish">{{ $t('diaryCreate.publish') }}</button>
      </div>
    </section>
  </main>
</template>

<script>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserContentStore } from '@/store/userContent'
import Header from '@/components/Header/index.vue'

function readFileAsDataUrl (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

export default {
  name: 'DiaryCreatePage',
  components: {
    Header
  },
  setup (_, { proxy }) {
    const router = useRouter()
    const userContentStore = useUserContentStore()

    const title = ref('')
    const content = ref('')
    const filterType = ref('latest')
    const imageUrl = ref('')
    const fileName = ref('')

    const selectedImageLabel = computed(() => {
      return fileName.value || proxy.$t('diaryCreate.imageEmpty')
    })

    const isInputValid = () => {
      return Boolean(title.value) && Boolean(content.value)
    }

    const onImageChange = async (event) => {
      const file = event.target.files?.[0]
      if (!file) return

      try {
        imageUrl.value = await readFileAsDataUrl(file)
        fileName.value = file.name
      } catch (error) {
        console.warn('diary image read failed:', error)
      }
    }

    const onSaveDraft = () => {
      if (!isInputValid()) {
        proxy?.$toast?.({ message: proxy.$t('diaryCreate.validation'), position: 'top' })
        return
      }

      userContentStore.addDiary({
        title: title.value,
        content: content.value,
        filterType: filterType.value,
        imageUrl: imageUrl.value,
        draft: true
      })

      proxy?.$toast?.({ message: proxy.$t('diaryCreate.draftSaved'), position: 'top' })
      router.push({ name: 'Mine' })
    }

    const onPublish = () => {
      if (!isInputValid()) {
        proxy?.$toast?.({ message: proxy.$t('diaryCreate.validation'), position: 'top' })
        return
      }

      userContentStore.addDiary({
        title: title.value,
        content: content.value,
        filterType: filterType.value,
        imageUrl: imageUrl.value,
        draft: false
      })

      proxy?.$toast?.({ message: proxy.$t('diaryCreate.publishSuccess'), position: 'top' })
      router.push({ name: 'Diary' })
    }

    return {
      title,
      content,
      filterType,
      imageUrl,
      selectedImageLabel,
      onImageChange,
      onSaveDraft,
      onPublish
    }
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

      input, textarea, select
        border 1px solid var(--black-30-percent)
        border-radius 10px
        padding 9px 10px
        background var(--surface-soft)
        color var(--text-primary)

  &__image-picker
    em
      color var(--text-secondary)
      font-size 12px
      font-style normal

  &__image-input
    cursor pointer

  &__image-preview
    border-radius 12px
    overflow hidden
    border 1px solid var(--black-30-percent)

    img
      width 100%
      max-height 280px
      object-fit cover
      display block

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
    color var(--text-primary)
    background var(--surface-soft)
</style>
