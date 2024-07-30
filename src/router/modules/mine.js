export default {
  path: '/mine',
  name: 'Mine',
  component: () => import(/* webpackChunkName: "Mine" */ '@/views/mine/index')
}
