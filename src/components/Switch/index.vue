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
import { getCurrentInstance } from 'vue'
import { useAppStore } from '@/store/main'
import { storeToRefs } from 'pinia'
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
    const store = useAppStore()
    const { userAppearance } = storeToRefs(store)
    const checked = userAppearance === 'dark'

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

    const onChange = function () {
      const changeColor = userAppearance.value === 'dark' ? 'light' : 'dark'
      store.SetAppearance(changeColor)
      switchAppearanceStyle(changeColor)
      proxy.changed = false
      proxy.$toast({ message: `已切換為${userAppearance.value === 'dark' ? '深' : '淺'}色`, position: 'top' })
      proxy.$emit('clickToClosed')
    }

    return {
      /** pinia */
      checked,
      /** Function */
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
