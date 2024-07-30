export default {
  path: '/',
  name: 'Home',
  // meta: { showNavBar: true },
  component: () => import(/* webpackChunkName: "Home" */ '@/views/home/index')
}
