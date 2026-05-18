<template>
  <main class="profile-settings">
    <Header />

    <section class="container profile-settings__panel">
      <button class="profile-settings__back" type="button" @click="goBackToMore">{{ $t('common.backToMore') }}</button>

      <h1>{{ $t('profileSettings.title') }}</h1>

      <article class="profile-settings__card">
        <strong>{{ $t('profileSettings.avatarSection') }}</strong>

        <div class="profile-settings__avatar-row">
          <img :src="previewAvatarUrl" :alt="$t('profileSettings.avatarSection')" class="profile-settings__avatar">

          <label class="profile-settings__upload-trigger">
            <input accept="image/*" class="profile-settings__upload-input" type="file" @change="onAvatarFileChange">
            <span>{{ $t('profileSettings.avatarUpload') }}</span>
          </label>
        </div>

        <label class="profile-settings__field">
          <span>{{ $t('profileSettings.displayName') }}</span>
          <input v-model.trim="displayName" type="text">
        </label>

        <button class="profile-settings__save" type="button" @click="onSaveProfile">{{ $t('profileSettings.save') }}</button>
      </article>

      <article class="profile-settings__card">
        <strong>{{ $t('profileSettings.appearance') }}</strong>
        <p>{{ $t('profileSettings.descLine1') }}</p>
        <p>{{ $t('profileSettings.descLine2') }}</p>
      </article>
    </section>
  </main>
</template>

<script>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

import Header from '@/components/Header/index.vue'
import { useUserContentStore } from '@/store/userContent'
import avatarPlaceholder from '@/assets/images/common/avatar-default.svg'

function readFileAsDataUrl (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

export default {
  name: 'ProfileSettingsPage',
  components: {
    Header
  },
  setup (_, { proxy }) {
    const route = useRoute()
    const router = useRouter()
    const userContentStore = useUserContentStore()
    const { profile } = storeToRefs(userContentStore)

    const pendingAvatarUrl = ref('')
    const displayName = ref(profile.value.displayName)

    const previewAvatarUrl = computed(() => {
      return pendingAvatarUrl.value || profile.value.avatarUrl || avatarPlaceholder
    })

    const onAvatarFileChange = async (event) => {
      const file = event.target.files?.[0]
      if (!file) return

      try {
        pendingAvatarUrl.value = await readFileAsDataUrl(file)
      } catch (error) {
        console.warn('avatar upload error:', error)
      }
    }

    const onSaveProfile = () => {
      userContentStore.setDisplayName(displayName.value || 'Pet Lover')

      if (pendingAvatarUrl.value) {
        userContentStore.setAvatar(pendingAvatarUrl.value)
      }

      pendingAvatarUrl.value = ''
      proxy?.$toast?.({ message: proxy.$t('profileSettings.saveSuccess'), position: 'top' })
    }

    const goBackToMore = () => {
      if (route.query.from === 'more') {
        router.push({ name: 'More' })
        return
      }
      router.back()
    }

    return {
      displayName,
      previewAvatarUrl,
      onAvatarFileChange,
      onSaveProfile,
      goBackToMore
    }
  }
}
</script>

<style lang="stylus" scoped>
.profile-settings
  min-height 100vh
  padding-bottom 96px

  &__panel
    margin-top 16px

    h1
      margin 10px 0 0
      color var(--text-primary)

  &__back
    border 1px solid var(--black-30-percent)
    border-radius 999px
    padding 7px 12px
    background var(--surface-soft)
    color var(--text-primary)

  &__card
    margin-top 12px
    border 1px solid var(--black-30-percent)
    border-radius 14px
    background var(--surface-card)
    padding 14px
    color var(--text-primary)

    p
      margin 8px 0 0
      color var(--text-secondary)

  &__avatar-row
    margin-top 10px
    display flex
    align-items center
    gap 12px

  &__avatar
    width 64px
    height 64px
    border-radius 50%
    border 1px solid var(--black-30-percent)
    object-fit cover

  &__upload-trigger
    position relative
    border 1px solid var(--black-30-percent)
    border-radius 999px
    background var(--surface-soft)
    color var(--text-primary)
    font-size 12px
    padding 7px 12px
    cursor pointer

  &__upload-input
    position absolute
    inset 0
    opacity 0
    cursor pointer

  &__field
    margin-top 12px
    display grid
    gap 6px

    span
      color var(--text-primary)

    input
      border 1px solid var(--black-30-percent)
      border-radius 10px
      padding 9px 10px
      background var(--surface-soft)
      color var(--text-primary)

  &__save
    margin-top 12px
    border 0
    border-radius 999px
    padding 8px 14px
    color #fff
    background linear-gradient(120deg, #4ea6ff, #5d68ff)

@media (min-width: 768px)
  .profile-settings
    padding-bottom 36px
</style>
