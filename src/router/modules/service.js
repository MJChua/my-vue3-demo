export default {
  path: '/service',
  name: 'Service',
  component: () => import(/* webpackChunkName: "Service" */ '@/views/stationery/service')
}
