<template>
  <main class="home">
    <Header />

    <section class="hero container">
      <div class="hero__media">
        <img :src="heroImage" :alt="$t('home.heroAlt')" class="hero__img" loading="eager">
      </div>

      <div class="hero__content">
        <p class="hero__badge">{{ $t('home.heroBadge') }}</p>
        <h1 class="hero__title">{{ $t('home.heroTitle') }}</h1>
        <p class="hero__subtitle">{{ $t('home.heroSubtitle') }}</p>
      </div>
    </section>

    <section class="pet-gallery container">
      <div class="pet-gallery__header">
        <h2 class="pet-gallery__title">{{ $t('home.wallTitle') }}</h2>
        <p class="pet-gallery__subtitle">{{ $t('home.wallSubtitle') }}</p>
      </div>

      <div class="filter-list">
        <button
          v-for="item in filterItems"
          :key="item.value"
          :class="{ 'is-active': activeFilter === item.value }"
          class="filter-chip"
          type="button"
          @click="activeFilter = item.value"
        >
          {{ $t(item.labelKey) }}
        </button>
      </div>

      <p v-if="feedErrorMessage" class="feed-error">{{ feedErrorMessage }}</p>

      <div :class="{ 'is-loading': isLoading }" class="pet-wall">
        <article
          v-for="pet in filteredPets"
          :key="pet.petId"
          :style="{ '--card-height': `${pet.cardHeight}px` }"
          class="pet-card"
        >
          <div class="pet-card__media">
            <img
              v-if="!failedImageMap[pet.petId]"
              :src="pet.imageUrl"
              :alt="`${pet.name} ${$t('home.imageAlt')}`"
              class="pet-card__image"
              loading="lazy"
              @error="onImageError(pet.petId)"
            >
            <div v-else class="pet-card__placeholder">
              <p class="pet-card__placeholder-title">{{ $t('home.imageLoadFailed') }}</p>
              <p class="pet-card__placeholder-subtitle">{{ $t('home.imageLoadHint') }}</p>
            </div>
          </div>

          <div class="pet-card__meta">
            <strong>{{ pet.name }}</strong>
            <span>{{ $t(`home.filter${pet.categoryLabel}`) }}</span>
          </div>
        </article>
      </div>
    </section>

    <Footer />
  </main>
</template>

<script>
import { computed, getCurrentInstance, onMounted, ref } from 'vue'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import heroImage from '@/assets/images/home/hero-pet.webp'
import { fetchReadOnlyPetRows } from '@/data/laceDb/readOnlyPetRepository'

const filterItems = [
  { value: 'all', labelKey: 'home.filterAll' },
  { value: 'dog', labelKey: 'home.filterDog' },
  { value: 'cat', labelKey: 'home.filterCat' },
  { value: 'exotic', labelKey: 'home.filterExotic' }
]

const categoryLabelMap = {
  dog: 'Dog',
  cat: 'Cat',
  exotic: 'Exotic'
}

export default {
  name: 'HomeView',
  components: {
    Header,
    Footer
  },
  setup () {
    const { proxy } = getCurrentInstance()
    const pets = ref([])
    const isLoading = ref(false)
    const activeFilter = ref('all')
    const failedImageMap = ref({})
    const feedErrorMessage = ref('')

    const filteredPets = computed(() => {
      if (activeFilter.value === 'all') return pets.value

      return pets.value.filter((pet) => pet.category === activeFilter.value)
    })

    const onImageError = (petId) => {
      failedImageMap.value = {
        ...failedImageMap.value,
        [petId]: true
      }
    }

    const loadPetWall = async () => {
      isLoading.value = true
      feedErrorMessage.value = ''

      try {
        const result = await fetchReadOnlyPetRows({
          dogCount: 8,
          catCount: 8,
          exoticCount: 8
        })

        pets.value = result.pets.map((pet) => ({
          ...pet,
          categoryLabel: categoryLabelMap[pet.category]
        }))

        if (result.errors.length > 0) {
          proxy?.$toast?.({ message: proxy.$t('home.partialLoadHint'), position: 'top' })
        }

        if (pets.value.length === 0) {
          feedErrorMessage.value = proxy.$t('home.loadFailed')
        }
      } catch (error) {
        console.warn('pet wall error:', error)
        pets.value = []
        feedErrorMessage.value = proxy.$t('home.loadFailed')
        proxy?.$toast?.({ message: proxy.$t('home.loadFailed'), position: 'top' })
      } finally {
        isLoading.value = false
      }
    }

    onMounted(() => {
      loadPetWall()
    })

    return {
      heroImage,
      filterItems,
      activeFilter,
      isLoading,
      failedImageMap,
      filteredPets,
      feedErrorMessage,
      onImageError
    }
  }
}
</script>

<style lang="stylus" scoped>
.home
  scroll-behavior smooth

.hero
  display grid
  grid-template-columns 1fr
  gap 14px
  margin-top 16px

  &__media
    border-radius 20px
    overflow hidden
    box-shadow 0 14px 28px var(--black-30-percent)

  &__img
    display block
    width 100%
    min-height 260px
    max-height 420px
    object-fit cover

  &__content
    background var(--white-80-percent-header)
    border 1px solid var(--black-30-percent)
    border-radius 20px
    padding 16px

  &__badge
    margin 0
    font-size 11px
    letter-spacing .12em
    text-transform uppercase
    color var(--black-70-percent)

  &__title
    margin 8px 0
    color var(--black-70-percent)

  &__subtitle
    margin 0
    line-height 1.7
    color var(--black-70-percent)

.pet-gallery
  margin-top 24px
  margin-bottom 24px

  &__header
    margin-bottom 14px

  &__title
    margin 0
    color var(--black-70-percent)

  &__subtitle
    margin 6px 0 0
    color var(--black-70-percent)

.filter-list
  display flex
  flex-wrap wrap
  gap 8px
  margin-bottom 14px

.filter-chip
  border 1px solid var(--black-30-percent)
  background var(--header-control-bg)
  color var(--header-control-text)
  border-radius 999px
  padding 6px 12px
  cursor pointer
  transition all .15s ease

  &.is-active
    border-color transparent
    background var(--main-color)
    color #fff

.feed-error
  margin 0 0 16px
  color #bf4545
  font-weight 600

.pet-wall
  column-count 1
  column-gap 12px
  transition opacity .2s ease

  &.is-loading
    opacity .65

.pet-card
  break-inside avoid
  margin-bottom 12px
  background var(--white-80-percent-header)
  border 1px solid var(--black-30-percent)
  border-radius 12px
  overflow hidden
  box-shadow 0 8px 16px var(--black-30-percent)
  content-visibility auto

  &__media
    height var(--card-height)
    min-height 180px
    background var(--normal-background)

  &__image
    width 100%
    height 100%
    object-fit cover
    display block

  &__placeholder
    width 100%
    height 100%
    display flex
    flex-direction column
    justify-content center
    align-items center
    text-align center
    padding 12px
    color var(--black-70-percent)

  &__placeholder-title
    margin 0
    font-weight 700

  &__placeholder-subtitle
    margin 6px 0 0
    font-size 12px

  &__meta
    display flex
    justify-content space-between
    gap 8px
    padding 10px
    color var(--black-70-percent)
    font-size 12px
    line-height 1.2

@media (min-width: 768px)
  .hero
    grid-template-columns minmax(0, 1.2fr) minmax(0, .8fr)
    gap 20px

    &__content
      display flex
      flex-direction column
      justify-content center
      padding 22px

    &__title
      font-size 30px
      line-height 1.2

  .pet-wall
    column-count 3
    column-gap 16px

  .pet-card
    margin-bottom 16px
</style>
