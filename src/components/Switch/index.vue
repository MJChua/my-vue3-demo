<template>
  <div class="appearance">
    <van-cell-group :style="{ 'justify-content': justifyContent }" class="group">
      <van-cell
        :title="title"
        size="large"
        class="group__title"
      />
      <van-cell class="group__switch">
        <van-switch v-model.lazy="checkedSwitch" @click="onChange()" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted } from 'vue'
import { useAppStore } from '@/store/main'
import { storeToRefs } from 'pinia'
import { CellGroup, Cell, Switch } from 'vant'
import { applyAppearanceClass } from '@my-vue3/core'

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
    const checkedSwitch = ref(false)

    const onChange = function () {
      const changeColor = userAppearance.value === 'dark' ? 'light' : 'dark'
      applyAppearanceClass(changeColor)
      store.SetAppearance(changeColor)

      proxy.$toast({ message: `已切換為${userAppearance.value === 'dark' ? '深' : '淺'}色`, position: 'top' })
      proxy.$emit('clickToClosed')
    }

    onMounted(() => {
      checkedSwitch.value = userAppearance.value === 'dark'
    })

    return {
      /** pinia */
      checkedSwitch,
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
