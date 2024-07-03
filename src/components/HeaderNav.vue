<template>
  <div class="header-nav">
    <van-cell title="Home" size="large" to="/" />
    <van-cell title="背景" is-link class="header-nav__switcher" @click="() => show = true" />

    <van-popup v-model:show="show" round>
      <div class="container">
        <Appearance
          :title="`切换为${userAppearance === 'dark' ? '浅' : '深'}色`"
          justify-content="end"
          @click-to-closed="() => show = false"
        />
      </div>
    </van-popup>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Cell, Popup } from 'vant'
import Appearance from '@/components/Appearance'

import { mapState } from '@/utils/store'

export default {
  name: 'HeaderNav',
  components: {
    'van-cell': Cell,
    'van-popup': Popup,
    Appearance
  },
  setup () {
    const { userAppearance } = mapState('app')

    const show = ref(false)

    return {
      /** vuex */
      userAppearance,

      /** data */
      show
    }
  }

}

</script>

<style lang="stylus" scoped>
  .header-nav
    padding 8px 14px
    background var(--white-50-percent)
    display flex
    justify-content center
    align-items center

    &__switcher
      max-width 20%

    .van-popup
      .container
        padding 10px
        background var(--white-50-percent)

</style>
