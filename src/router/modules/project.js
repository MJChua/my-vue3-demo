export default {
  path: '/project',
  name: 'Project',
  component: () => import(/* webpackChunkName: "Project" */ '@/views/stationery/project')
}
