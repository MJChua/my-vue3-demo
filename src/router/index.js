import { createRouter, createWebHistory } from 'vue-router'

import home from './modules/home'
import mine from './modules/mine'
import aboutUs from './modules/aboutUs'
import service from './modules/service'
import project from './modules/project'

const routes = []

routes.push(home)
routes.push(mine)
routes.push(aboutUs)
routes.push(service)
routes.push(project)

const router = createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

export default router
