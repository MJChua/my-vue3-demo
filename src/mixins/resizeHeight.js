/**
 * resizeOptions: {
    selector: '.xxx',      // 须设定高度的目标（id, class, tag...）
    attr: 'height',        // height | min-height...
    min: 100,             // 最小高
    customDistance: 40, // 扣掉 自訂 distance
  }
 */

import { mapState } from '@/utils/store'
import { remToPx } from '@/utils/helper'

import { getCurrentInstance, ref, onBeforeUnmount, onMounted } from 'vue'

export default function (resizeOptions) {
  const { proxy } = getCurrentInstance()
  const currentHeight = ref(0)

  const { footerHeight } = mapState('app')

  onMounted(() => {
    window.addEventListener('resize', setHeight, true)
    setHeight()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', setHeight, true)
  })

  const setHeight = () => {
    const els = [...document.querySelectorAll(resizeOptions.selector)]
    els.forEach(el => {
      const currentTopDistance = Math.round(el.getBoundingClientRect().top)
      let _height = Math.round(document.documentElement.clientHeight, window.innerHeight || 0)

      // 扣掉 top distance
      _height -= currentTopDistance

      // 扣掉 自訂 distance
      _height -= ~~remToPx(resizeOptions.customDistance)

      // 扣掉 footer navbar 高度
      if (proxy.$isMobile() && proxy.$route?.meta?.showNavBar) _height -= ~~remToPx(footerHeight.value)

      // 有限制最小高
      if (resizeOptions.min && _height < resizeOptions.min) _height = resizeOptions.min

      const attr = resizeOptions.attr || 'height'
      el.setAttribute('style', `${attr}: ${_height}px`)
      currentHeight.value = _height
    })
  }

  return { currentHeight }
}
