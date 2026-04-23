<template>
  <keep-alive>
    <main class="home">
      <Header />
      <section class="middle-section container">
        <div class="middle-section__img" />
        <div class="content">
          <ul>
            <li v-for="(_, index) in 6" :key="index" class="p-10">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos, ab. Exercitationem optio perspiciatis hic quae veritatis alias at aliquam fugit quidem, nostrum saepe. Itaque reiciendis, adipisci necessitatibus repellat reprehenderit est.
            </li>
          </ul>
        </div>
        <div class="card-wrap">
          <div v-for="(imageUrl, index) in imageUrls" :key="`${imageUrl}-${index}`" class="card">
            <img :src="imageUrl" alt="api-image" loading="lazy">
          </div>
        </div>
      </section>

      <Footer />
    </main>
  </keep-alive>
</template>

<script>
import { onMounted, ref, getCurrentInstance } from 'vue'
import { useHomeStore } from '@/store/home'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

import { getPublicImages } from '@/api/diablo4'

export default {
  name: 'HomeView',
  components: {
    Header,
    Footer
  },
  setup (_) {
    const { proxy } = getCurrentInstance()
    const store = useHomeStore()
    const imageUrls = ref([])

    const changeTab = (index) => {
      store.onTab(index)
      proxy.$goToPage(store.computePage)
    }

    const getApiImages = async () => {
      try {
        imageUrls.value = await getPublicImages(18)
        return imageUrls.value.length > 0
      } catch (err) {
        console.warn('error:', err)
        proxy?.$toast?.({ message: 'Failed to load API images.', position: 'top' })
        imageUrls.value = []
        return false
      }
    }

    onMounted(() => {
      getApiImages()
    })

    return {
      /** data */
      imageUrls,

      /** function */
      changeTab
    }
  }
}
</script>

<style lang="stylus" scoped>
  .home

    .middle-section

      &__img
        margin 15px auto
        width 100%
        height 50vh
        background url('~@/assets/images/home/doggy.jpg') center no-repeat
        background-size cover
        border-radius 20px
        overflow hidden

      .card-wrap
        display flex
        flex-wrap wrap
        align-items center

        .card
          margin 10px auto
          max-width 100px

      .content
        margin 50px auto
        columns 300px

</style>
