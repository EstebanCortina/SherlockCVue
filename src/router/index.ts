import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: import('@/views/Login.vue')
  },
  {
    path: '/candidates',
    name: 'CandidatesPool',
    component: import('@/views/CandidatesPoolView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
