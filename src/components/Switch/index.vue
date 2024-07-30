<template>
  <div class="appearance">
    <van-cell-group :style="{ 'justify-content': justifyContent }" class="group">
      <van-cell
        :title="title"
        size="large"
        class="group__title"
      />
      <van-cell class="group__switch">
        <van-switch v-model="checked" @click="onChange()" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getCurrentInstance, computed } from 'vue'
import { mapState, mapMutations } from '@/utils/store'
import { CellGroup, Cell, Switch } from 'vant'

export default {
  name: 'ThemeAppearance',
  props: {
    title: {
      type: String,
      default: () => ''
    },
    justifyContent: {
      type: String,
      default: () => ''
    }
  },
  components: {
    'van-cell-group': CellGroup,
    'van-cell': Cell,
    'van-switch': Switch
  },
  setup (_) {
    const { proxy } = getCurrentInstance()

    const { userAppearance } = mapState('app')
    const { SET_USER_APPEARANCE } = mapMutations('app')
    const checked = computed(() => {
      return userAppearance.value === 'dark'
    })

    const switchAppearanceStyle = (value) => {
      switch (value) {
        case 'dark':
          document.body.classList.add('dark-mode')
          document.body.classList.remove('light-mode')
          break
        case 'light':
          document.body.classList.add('light-mode')
          document.body.classList.remove('dark-mode')
          break
        default:
          document.body.classList.remove('light-mode')
          document.body.classList.remove('dark-mode')
          break
      }
    }

    const onChange = () => {
      const changeColor = userAppearance.value === 'dark' ? 'light' : 'dark'
      SET_USER_APPEARANCE(changeColor)
      switchAppearanceStyle(changeColor)
      proxy.changed = false
      console.warn('change:', userAppearance.value)
      proxy.$toast({ message: `已切換為${userAppearance.value === 'dark' ? '深' : '淺'}色`, position: top })
      proxy.$emit('clickToClosed')
    }

    return {
      /** Function */
      checked,
      onChange
    }
  }
}
</script>

<style lang="stylus" scoped>
.appearance
  font-size 20px

  .group
    display flex
    background inherit

    .van-cell
      padding 0
      width auto

    &::after
      display none

    &__title
      white-space nowrap

    &__switch
      border none

</style>
