import store from '@/store'

const bebelConfig = require('@/../babel.config')

const styledComponentsPx2rem = bebelConfig.plugins.find(plugin => plugin[0] === 'styled-components-px2rem')[1]
const { unitPrecision = 5, rootValue = 100 } = styledComponentsPx2rem

/**
 * 编译时期的px to rem的换算
 * @param px
 * @returns {string}
 */
const pxToRem = px => (px / rootValue).toFixed(unitPrecision) + 'rem'
/**
 * 编译时期的px to rem的换算，回传值为数字
 * @param px
 * @returns {number}
 */
const pxToRemNumber = px => (px / rootValue).toFixed(unitPrecision)

/**
 * 执行时间，client端的「设计稿px」换算成「client应要有的px」的比例
 * @returns {number}
 */
const remToPx = px => {
  return px * (store.state.app.fontSize / rootValue)
}

export {
  pxToRem,
  pxToRemNumber,
  remToPx
}
