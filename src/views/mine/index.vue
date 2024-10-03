<template>
  <main class="mine">
    <Header />
    <div class="container text-left">
      <strong class="title p-10 fz-24">Mine</strong>

      <div class="row">
        <div
          v-for="(item, index) in contentItems"
          :key="index"
          :style="{ 'min-height': $isMobile() ? '200px' : '170px' }"
          class="container-xs content mt-28 mx-auto"
        >
          <div class="desc-wrap row py-16 px-24">
            <strong :class="{ 'mx-auto': $isMobile() }">{{ item.title }}</strong>
            <div class="desc mt-10">
              <p>slrfgjsl;oi132pj4;oi34wt</p>
              <p>selrkgfnselukgn2804yut8hsoelu</p>
            </div>
          </div>
          <Button
            v-if="item.button" text="切換"
            :size="device === 'desktop' ? 'large' : 'middle'"
            class="btn-position"
            @click="() => show = true"
          />
        </div>
      </div>
    </div>
  </main>

  <van-popup
    v-model:show="show"
    style="min-width: 100px;"
    class="p-12"
    round
  >
    <Switcher
      :title="`切換為${userAppearance === 'dark' ? '淺' : '深'}色`"
      justify-content="end"
      @click-to-closed="() => show = false"
    />
  </van-popup>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
import { useAppStore } from '@/store/main'
import { storeToRefs } from 'pinia'

import { Popup } from 'vant'
import Switcher from '@/components/Switch'
import Button from '@/components/Button'
import Header from '@/components/Header'

export default {
  name: 'MinePage',
  components: {
    'van-popup': Popup,
    Switcher,
    Button,
    Header
  },
  setup (_) {
    const { proxy } = getCurrentInstance()
    const store = useAppStore()
    const { device, userAppearance } = storeToRefs(store)
    const contentItems = [
      {
        index: 0,
        title: '背景切換',
        button: true
      },
      {
        index: 1,
        title: '背景切換',
        button: false
      },
      {
        index: 2,
        title: '背景切換',
        button: false
      },
      {
        index: 3,
        title: '背景切換',
        button: false
      }
    ]

    const show = ref(false)

    const changeTab = index => {
      store.onTab(index)
      proxy.$goToPage(store.computePage)
    }

    return {
      /** pinia */
      device,
      userAppearance,

      /** data */
      contentItems,
      show,

      /** function */
      changeTab
    }
  }
}
</script>

<style lang="stylus" scoped>
  .mine
    height 100vh

    .container
      margin-top 20px

      .title, .content
        cursor default

      .content
        background var(--black-30-percent)
        border-radius 30px
        width calc(100% / 2 - 15px)

        .desc-wrap
          justify-content space-between

          .desc > p
            word-break break-all

      .btn-position
        position relative
        left 50%
        transform translate(-50%, 0)

</style>
