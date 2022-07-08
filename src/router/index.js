import { createRouter, createWebHistory } from 'vue-router'
import ViewTimer from '../views/ViewTimer.vue'

const routes = [
  {
    path: '/',
    name: 'ViewTimer',
    component: ViewTimer
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
