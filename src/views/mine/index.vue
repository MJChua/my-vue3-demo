<template>
  <main class="mine">
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
          <div v-if="item.button" class="button text-center mx-auto p-6" @click.stop="() => show = true">切換</div>
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
import { ref } from 'vue'
import { mapState } from '@/utils/store'

import { Popup } from 'vant'
import Switcher from '@/components/Switch'

export default {
  name: 'MinePage',
  components: {
    'van-popup': Popup,
    Switcher
  },
  setup (_) {
    const { userAppearance } = mapState('app')
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
      }
    ]

    const show = ref(false)

    return {
      /** vuex */
      userAppearance,

      /** data */
      contentItems,
      show
    }
  }
}
</script>

<style lang="stylus" scoped>
  .mine

    .container
      margin-top 80px
      height 100vh

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

        .button
          width 150px
          background $primary_normal_color
          color var(--black)
          cursor pointer
          border-radius 20px
          box-shadow 2px 1px 6px 0 $neutral_normal_color

        .list-wrap
          justify-content space-between

</style>
