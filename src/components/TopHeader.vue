<template>
  <div class="top-header">
    <div>
      <router-link :to="title.routGo">{{ title.text }}</router-link>
      <van-switch v-model="checked">
        <template #node>
          <div class="icon-wrapper">
            <van-icon :name="checked ? 'success' : 'cross'" />
          </div>
        </template>
      </van-switch>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Switch, Icon } from 'vant'

export default {
  name: 'TopHeader',
  props: {
    title: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    'van-switch': Switch,
    'van-icon': Icon
  },
  setup (_) {
    const checked = ref(true)

    const onSwitch = (turnOn) => {
      console.warn('turnOn:', turnOn)
    }

    return {
      checked,
      onSwitch
    }
  }
}
</script>

<style lang="stylus" scoped>
.top-header
  padding 10px 0
  font-size 20px
  text-align center
  text-decoration none

  .switch
    .icon-wrapper
      display flex
      width 100%
      justify-content center
      font-size 18px

    .icon-wrapper .van-icon-success
      line-height 32px
      color var(--van-blue)

    .icon-wrapper .van-icon-cross
      line-height 32px
      color var(--van-gray-5)

</style>
