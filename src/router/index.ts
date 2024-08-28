import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/SignupView.vue')
  },
  {
    // Experimental name for the path
    path: '/vacants',
    name: 'Vacants',
    component: () => import('@/views/JobCardsView.vue')
  },
  {
    path: '/candidates',
    name: 'CandidatesPool',
    component: () => import('@/views/CandidatesPoolView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
