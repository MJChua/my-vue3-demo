export default {
  path: '/',
  name: 'HomeView',
  meta: { showNavVar: true },
  component: () => import(/* webpackChunkName: "home" */ '@/views/home/HomeView')
}
