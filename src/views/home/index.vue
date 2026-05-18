<template>
  <main class="home">
    <Header />

    <section class="hero container">
      <div class="hero__media">
        <div class="hero__slides">
          <img
            v-for="(slide, index) in heroSlides"
            :key="slide"
            :src="slide"
            :alt="$t('home.heroAlt')"
            :class="{ 'is-active': index === heroIndex }"
            class="hero__slide"
            loading="eager"
          >
        </div>

        <div class="hero__overlay">
          <h1 class="hero__title">{{ $t('home.heroHeadline') }}</h1>
          <p class="hero__subtitle">{{ $t('home.heroSubheadline') }}</p>

          <div class="hero__cta-row">
            <button class="hero__cta hero__cta--primary" type="button" @click="scrollToWall">
              {{ $t('home.ctaCatMode') }}
            </button>
            <button class="hero__cta" type="button" @click="focusDailyStar">
              {{ $t('home.ctaWhoCute') }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section ref="dailyStarRef" class="daily-star container">
      <h2 class="section-title">{{ $t('home.dailyStarTitle') }}</h2>
      <article v-if="dailyStar" class="daily-star__card" @click="openDailyGallery">
        <img :src="dailyStar.imageUrl" :alt="dailyStar.name" class="daily-star__image" loading="lazy">
        <div class="daily-star__content">
          <p class="daily-star__label">{{ $t('home.dailyStarBadge') }}</p>
          <h3>{{ dailyStar.name }}</h3>
          <p>{{ dailyStar.species }}</p>
          <div class="daily-star__tags">
            <span v-for="tag in dailyStar.personalityTags" :key="tag">#{{ tag }}</span>
          </div>
          <button class="daily-star__open" type="button">{{ $t('home.dailyStarOpenGallery') }}</button>
        </div>
      </article>
    </section>

    <section class="explorer container">
      <h2 class="section-title">{{ $t('home.explorerTitle') }}</h2>
      <div class="explorer__row">
        <button
          v-for="item in explorerItems"
          :key="item.value"
          class="explorer__item"
          type="button"
          @click="onExplorerSelect(item)"
        >
          <span class="explorer__emoji">{{ item.emoji }}</span>
          <span class="explorer__text">{{ $t(item.labelKey) }}</span>
        </button>
      </div>
    </section>

    <section ref="pawWallRef" class="paw-wall container">
      <div class="paw-wall__header">
        <h2 class="section-title">{{ $t('home.pawWallTitle') }}</h2>
        <div class="paw-wall__tabs">
          <button
            v-for="tab in feedTabs"
            :key="tab.value"
            :class="{ 'is-active': activeFeed === tab.value }"
            class="chip"
            type="button"
            @click="activeFeed = tab.value"
          >
            {{ $t(tab.labelKey) }}
          </button>
        </div>
      </div>

      <div class="paw-wall__filters">
        <button
          v-for="filter in categoryFilters"
          :key="filter.value"
          :class="{ 'is-active': activeCategory === filter.value }"
          class="chip chip--outline"
          type="button"
          @click="activeCategory = filter.value"
        >
          {{ $t(filter.labelKey) }}
        </button>
      </div>

      <p v-if="feedErrorMessage" class="feed-error">{{ feedErrorMessage }}</p>

      <div :class="{ 'is-loading': isLoading }" class="pet-wall">
        <article
          v-for="pet in displayedPets"
          :key="pet.petId"
          :style="{ '--card-height': `${pet.cardHeight}px` }"
          class="pet-card"
        >
          <button class="pet-card__link" type="button" @click="openLinkedDiary(pet)">
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

              <div class="pet-card__stats">
                <span>♥ {{ resolvePetLikes(pet) }}</span>
                <span>👁 {{ pet.views }}</span>
              </div>
            </div>
          </button>

          <div class="pet-card__meta">
            <strong>{{ pet.name }}</strong>
            <span>{{ $t(`home.filter${pet.categoryLabel}`) }}</span>
          </div>

          <div class="pet-card__actions">
            <button class="pet-card__action" type="button" @click="likePet(pet)">♥ +1</button>
            <button class="pet-card__action pet-card__action--link" type="button" @click="openLinkedDiary(pet)">
              {{ pet.diaryId ? $t('home.linkDiary') : $t('home.noLinkedDiary') }}
            </button>
          </div>
        </article>
      </div>

      <div ref="loadMoreSentinel" class="paw-wall__sentinel" />
    </section>

    <section class="upcoming container">
      <div class="upcoming__panel">
        <h2 class="section-title">{{ $t('home.upcomingTitle') }}</h2>
        <p class="upcoming__desc">{{ $t('home.upcomingDesc') }}</p>

        <div class="upcoming__features">
          <div class="upcoming__feature">📸 {{ $t('home.upcomingUpload') }}</div>
          <div class="upcoming__feature">💬 {{ $t('home.upcomingInteract') }}</div>
          <div class="upcoming__feature">🏆 {{ $t('home.upcomingContest') }}</div>
        </div>

        <button class="upcoming__cta" type="button" @click="subscribeUpcoming">
          {{ $t('home.upcomingCta') }}
        </button>
      </div>
    </section>

    <Footer />

    <van-popup v-model:show="showDailyGallery" round position="bottom" class="daily-gallery-popup">
      <div class="daily-gallery">
        <h3>{{ $t('home.dailyGalleryTitle') }}</h3>
        <div class="daily-gallery__grid">
          <img
            v-for="item in dailyGalleryPets"
            :key="item.petId"
            :src="item.imageUrl"
            :alt="item.name"
            loading="lazy"
          >
        </div>
      </div>
    </van-popup>
  </main>
</template>

<script>
import { computed, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { Popup } from 'vant'

import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'
import heroPetImage from '@/assets/images/home/hero-pet.webp'
import { fetchReadOnlyPetRows } from '@/data/laceDb/readOnlyPetRepository'
import { useUserContentStore } from '@/store/userContent'

const heroSlides = [
  heroPetImage,
  'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1800&q=80&fm=webp',
  'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1800&q=80&fm=webp'
]

const explorerItems = [
  { value: 'cat', emoji: '🐱', labelKey: 'home.explorerCat', category: 'cat' },
  { value: 'dog', emoji: '🐶', labelKey: 'home.explorerDog', category: 'dog' },
  { value: 'rabbit', emoji: '🐰', labelKey: 'home.explorerRabbit', category: 'exotic' },
  { value: 'bird', emoji: '🐦', labelKey: 'home.explorerBird', category: 'exotic' },
  { value: 'lizard', emoji: '🦎', labelKey: 'home.explorerLizard', category: 'exotic' }
]

const feedTabs = [
  { value: 'latest', labelKey: 'home.feedLatest' },
  { value: 'hot', labelKey: 'home.feedHot' },
  { value: 'funny', labelKey: 'home.feedFunny' }
]

const categoryFilters = [
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

const personalityTagMap = {
  dog: ['playful', 'snack-lover'],
  cat: ['lazy', 'gentle'],
  exotic: ['rare', 'curious']
}

function enrichRemotePet (pet, index) {
  const now = Date.now()
  return {
    ...pet,
    petId: `remote_${pet.petId}_${index + 1}`,
    categoryLabel: categoryLabelMap[pet.category],
    likes: 300 + (index * 37) % 4000,
    views: 2000 + (index * 113) % 22000,
    humorScore: (index * 13) % 100,
    uploadedTs: now - index * 3600 * 1000,
    personalityTags: personalityTagMap[pet.category],
    cardHeight: pet.cardHeight + ((index % 4) * 12),
    diaryId: null,
    source: 'remote'
  }
}

function buildInfinitePool (basePets, maxCount = 120) {
  if (!basePets.length) return []

  const pool = []
  let index = 0
  while (pool.length < maxCount) {
    const source = basePets[index % basePets.length]
    pool.push(enrichRemotePet(source, pool.length))
    index += 1
  }

  return pool
}

export default {
  name: 'HomeView',
  components: {
    Header,
    Footer,
    'van-popup': Popup
  },
  setup () {
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const userContentStore = useUserContentStore()
    const { wallUploads } = storeToRefs(userContentStore)

    const isLoading = ref(false)
    const feedErrorMessage = ref('')
    const failedImageMap = ref({})
    const localLikesMap = ref({})

    const activeCategory = ref('all')
    const activeFeed = ref('latest')
    const visibleCount = ref(18)

    const heroIndex = ref(0)
    const showDailyGallery = ref(false)

    const remotePetPool = ref([])

    const dailyStarRef = ref(null)
    const pawWallRef = ref(null)
    const loadMoreSentinel = ref(null)

    let heroTimer = null
    let observer = null

    const uploadPets = computed(() => {
      return wallUploads.value.map((item, index) => ({
        petId: `upload_${item.id}`,
        name: item.caption || `My Pet ${index + 1}`,
        category: item.category || 'dog',
        categoryLabel: categoryLabelMap[item.category || 'dog'],
        species: 'User Upload',
        imageUrl: item.imageUrl,
        likes: item.likes,
        views: item.views || 0,
        humorScore: 40 + (index % 30),
        uploadedTs: new Date(item.createdAt).getTime(),
        personalityTags: ['user', 'pet'],
        cardHeight: 220 + (index % 3) * 20,
        diaryId: item.diaryId,
        source: 'upload'
      }))
    })

    const allWallPets = computed(() => {
      return [...uploadPets.value, ...remotePetPool.value]
    })

    const filteredPets = computed(() => {
      if (activeCategory.value === 'all') return allWallPets.value
      return allWallPets.value.filter((pet) => pet.category === activeCategory.value)
    })

    const rankedPets = computed(() => {
      const list = [...filteredPets.value]

      if (activeFeed.value === 'hot') {
        return list.sort((a, b) => (resolvePetLikes(b) + b.views) - (resolvePetLikes(a) + a.views))
      }

      if (activeFeed.value === 'funny') {
        return list.sort((a, b) => b.humorScore - a.humorScore)
      }

      return list.sort((a, b) => b.uploadedTs - a.uploadedTs)
    })

    const displayedPets = computed(() => rankedPets.value.slice(0, visibleCount.value))

    const dailyStar = computed(() => {
      if (!allWallPets.value.length) return null
      return [...allWallPets.value].sort((a, b) => resolvePetLikes(b) - resolvePetLikes(a))[0]
    })

    const dailyGalleryPets = computed(() => {
      if (!dailyStar.value) return []

      return allWallPets.value
        .filter((pet) => pet.category === dailyStar.value.category)
        .slice(0, 9)
    })

    const resolvePetLikes = (pet) => {
      const localLikes = localLikesMap.value[pet.petId] || 0
      return (pet.likes || 0) + localLikes
    }

    const onImageError = (petId) => {
      failedImageMap.value = {
        ...failedImageMap.value,
        [petId]: true
      }
    }

    const loadMorePets = () => {
      if (visibleCount.value >= rankedPets.value.length) return
      visibleCount.value = Math.min(visibleCount.value + 12, rankedPets.value.length)
    }

    const setupInfiniteObserver = async () => {
      await nextTick()

      if (!loadMoreSentinel.value) return

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMorePets()
          }
        })
      }, {
        threshold: 0.2
      })

      observer.observe(loadMoreSentinel.value)
    }

    const startHeroLoop = () => {
      heroTimer = window.setInterval(() => {
        heroIndex.value = (heroIndex.value + 1) % heroSlides.length
      }, 4500)
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

        if (result.errors.length > 0) {
          proxy?.$toast?.({ message: proxy.$t('home.partialLoadHint'), position: 'top' })
        }

        if (result.pets.length === 0) {
          feedErrorMessage.value = proxy.$t('home.loadFailed')
          return
        }

        remotePetPool.value = buildInfinitePool(result.pets)
        visibleCount.value = 18
        await setupInfiniteObserver()
      } catch (error) {
        console.warn('pet wall error:', error)
        feedErrorMessage.value = proxy.$t('home.loadFailed')
        proxy?.$toast?.({ message: proxy.$t('home.loadFailed'), position: 'top' })
      } finally {
        isLoading.value = false
      }
    }

    const scrollToWall = () => {
      pawWallRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const focusDailyStar = () => {
      dailyStarRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const onExplorerSelect = (item) => {
      activeCategory.value = item.category
      scrollToWall()
    }

    const openDailyGallery = () => {
      showDailyGallery.value = true
    }

    const subscribeUpcoming = () => {
      proxy?.$toast?.({ message: proxy.$t('home.upcomingSubscribed'), position: 'top' })
    }

    const likePet = (pet) => {
      if (pet.source === 'upload') {
        const uploadId = pet.petId.replace('upload_', '')
        userContentStore.increaseUploadLike(uploadId)
        return
      }

      localLikesMap.value = {
        ...localLikesMap.value,
        [pet.petId]: (localLikesMap.value[pet.petId] || 0) + 1
      }
    }

    const openLinkedDiary = (pet) => {
      if (!pet.diaryId) {
        proxy?.$toast?.({ message: proxy.$t('home.noLinkedDiary'), position: 'top' })
        return
      }

      router.push({
        name: 'Diary',
        query: {
          diaryId: pet.diaryId,
          fromWall: '1'
        }
      })
    }

    watch([activeCategory, activeFeed], () => {
      visibleCount.value = 18
    })

    onMounted(async () => {
      startHeroLoop()
      await loadPetWall()
    })

    onBeforeUnmount(() => {
      if (heroTimer) {
        window.clearInterval(heroTimer)
      }
      observer?.disconnect()
    })

    return {
      heroSlides,
      heroIndex,
      explorerItems,
      feedTabs,
      categoryFilters,
      activeCategory,
      activeFeed,
      isLoading,
      displayedPets,
      dailyStar,
      dailyGalleryPets,
      showDailyGallery,
      failedImageMap,
      feedErrorMessage,
      dailyStarRef,
      pawWallRef,
      loadMoreSentinel,
      onImageError,
      scrollToWall,
      focusDailyStar,
      onExplorerSelect,
      openDailyGallery,
      subscribeUpcoming,
      resolvePetLikes,
      likePet,
      openLinkedDiary
    }
  }
}
</script>

<style lang="stylus" scoped>
.home
  scroll-behavior smooth

.section-title
  margin 0
  color var(--black-70-percent)
  font-size 26px

.hero
  margin-top 14px

  &__media
    position relative
    min-height 66vh
    border-radius 28px
    overflow hidden

  &__slides
    position absolute
    inset 0

  &__slide
    position absolute
    inset 0
    width 100%
    height 100%
    object-fit cover
    opacity 0
    transition opacity .8s ease

    &.is-active
      opacity 1

  &__overlay
    position relative
    z-index 2
    min-height 66vh
    display flex
    flex-direction column
    justify-content center
    gap 14px
    padding 24px
    color #fff
    background linear-gradient(120deg, rgba(8, 12, 18, 0.72), rgba(18, 22, 33, 0.35) 55%, rgba(34, 78, 86, 0.5))

  &__title
    margin 0
    font-size 36px
    line-height 1.15
    max-width 720px

  &__subtitle
    margin 0
    font-size 16px
    line-height 1.7
    max-width 780px

  &__cta-row
    display flex
    flex-wrap wrap
    gap 10px

  &__cta
    border 1px solid rgba(255, 255, 255, 0.6)
    border-radius 999px
    padding 10px 16px
    color #fff
    background rgba(18, 23, 33, 0.4)
    font-weight 600
    cursor pointer

    &--primary
      border-color transparent
      background linear-gradient(120deg, #ff8f7f, #f74f82)

.daily-star
  margin-top 28px

  &__card
    margin-top 14px
    display grid
    grid-template-columns 1fr
    background var(--white-80-percent-header)
    border 1px solid var(--black-30-percent)
    border-radius 22px
    overflow hidden
    cursor pointer

  &__image
    width 100%
    min-height 260px
    max-height 360px
    object-fit cover

  &__content
    padding 18px
    color var(--black-70-percent)

    h3
      margin 8px 0 4px
      font-size 24px

    p
      margin 0

  &__label
    margin 0
    font-size 12px
    letter-spacing .08em
    text-transform uppercase

  &__tags
    margin-top 10px
    display flex
    flex-wrap wrap
    gap 8px

    span
      display inline-flex
      border-radius 999px
      background var(--main-color)
      color #fff
      font-size 12px
      padding 4px 10px

  &__open
    margin-top 12px
    border 0
    border-radius 10px
    background var(--header-control-bg)
    color var(--header-control-text)
    padding 10px 12px
    cursor pointer

.explorer
  margin-top 30px

  &__row
    margin-top 14px
    display grid
    grid-template-columns repeat(3, minmax(0, 1fr))
    gap 10px

  &__item
    display flex
    flex-direction column
    align-items center
    justify-content center
    gap 8px
    border 1px solid var(--black-30-percent)
    border-radius 18px
    background var(--white-80-percent-header)
    padding 12px 8px
    color var(--black-70-percent)
    cursor pointer
    transition transform .18s ease, box-shadow .18s ease

    &:hover
      transform translateY(-2px) scale(1.03)
      box-shadow 0 10px 18px var(--black-30-percent)

  &__emoji
    width 44px
    height 44px
    border-radius 50%
    display flex
    align-items center
    justify-content center
    font-size 22px
    background linear-gradient(135deg, rgba(255, 179, 140, 0.35), rgba(138, 195, 255, 0.35))

  &__text
    font-size 12px

.paw-wall
  margin-top 28px

  &__header
    display flex
    flex-direction column
    gap 12px

  &__tabs
    display flex
    flex-wrap wrap
    gap 8px

  &__filters
    margin-top 12px
    display flex
    flex-wrap wrap
    gap 8px

  &__sentinel
    height 32px

.chip
  border 0
  border-radius 999px
  padding 7px 14px
  background var(--main-color)
  color #fff
  cursor pointer

  &--outline
    background var(--header-control-bg)
    color var(--header-control-text)
    border 1px solid var(--black-30-percent)

  &.is-active
    filter saturate(1.1)
    box-shadow 0 6px 12px var(--black-30-percent)

.feed-error
  margin 12px 0 0
  color #bf4545
  font-weight 600

.pet-wall
  margin-top 14px
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
  content-visibility auto

  &__link
    border 0
    background transparent
    padding 0
    width 100%
    cursor pointer

  &__media
    position relative
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

  &__stats
    position absolute
    right 8px
    bottom 8px
    display flex
    gap 8px

    span
      border-radius 999px
      background rgba(0, 0, 0, 0.55)
      color #fff
      font-size 11px
      padding 4px 8px

  &__meta
    display flex
    justify-content space-between
    gap 8px
    padding 10px 10px 6px
    color var(--black-70-percent)
    font-size 12px

  &__actions
    display flex
    gap 8px
    padding 0 10px 10px

  &__action
    border 1px solid var(--black-30-percent)
    border-radius 999px
    padding 4px 9px
    background var(--surface-soft)
    color var(--text-primary)
    font-size 11px
    cursor pointer

    &--link
      margin-left auto

.upcoming
  margin 26px auto 30px

  &__panel
    position relative
    overflow hidden
    border-radius 20px
    background linear-gradient(140deg, rgba(255, 242, 222, 0.95), rgba(228, 243, 255, 0.92))
    border 1px solid var(--black-30-percent)
    padding 18px

    &::before
      content ''
      position absolute
      width 220px
      height 220px
      right -60px
      top -60px
      border-radius 40% 60% 45% 55%
      background rgba(255, 186, 186, 0.25)

  &__desc
    position relative
    margin 10px 0 0
    color rgba(20, 27, 41, 0.78)

  &__features
    position relative
    margin-top 12px
    display grid
    gap 8px

  &__feature
    border-radius 12px
    background rgba(255, 255, 255, 0.68)
    padding 10px
    color rgba(20, 27, 41, 0.85)

  &__cta
    margin-top 14px
    border 0
    border-radius 999px
    background linear-gradient(120deg, #ff865e, #ff5c93)
    color #fff
    font-weight 700
    padding 10px 16px
    cursor pointer

.daily-gallery-popup
  max-height 80vh

.daily-gallery
  padding 18px

  h3
    margin 0 0 10px

  &__grid
    display grid
    grid-template-columns repeat(3, minmax(0, 1fr))
    gap 8px

    img
      width 100%
      aspect-ratio 1 / 1
      object-fit cover
      border-radius 8px

@media (min-width: 768px)
  .hero
    &__overlay
      padding 34px

    &__title
      font-size 52px

    &__subtitle
      font-size 18px

  .daily-star
    &__card
      grid-template-columns minmax(0, 1fr) minmax(0, 1fr)

    &__image
      min-height 340px
      max-height 420px

  .explorer
    &__row
      grid-template-columns repeat(5, minmax(0, 1fr))

  .paw-wall
    &__header
      flex-direction row
      justify-content space-between
      align-items center

  .pet-wall
    column-count 3
    column-gap 16px

  .pet-card
    margin-bottom 16px

  .upcoming
    &__features
      grid-template-columns repeat(3, minmax(0, 1fr))
</style>
