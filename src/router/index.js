import { createRouter, createWebHistory } from 'vue-router'

import home from './modules/home'
import mine from './modules/mine'
import diary from './modules/diary'
import diaryCreate from './modules/diaryCreate'
import uploadImage from './modules/uploadImage'
import more from './modules/more'
import auth from './modules/auth'
import profileSettings from './modules/profileSettings'
import aboutUs from './modules/aboutUs'
import service from './modules/service'

const routes = []

routes.push(home)
routes.push(diary)
routes.push(diaryCreate)
routes.push(uploadImage)
routes.push(mine)
routes.push(more)
routes.push(auth)
routes.push(profileSettings)
routes.push(aboutUs)
routes.push(service)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
