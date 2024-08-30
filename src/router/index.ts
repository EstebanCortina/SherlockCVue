import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import JobCardsView from '@/views/JobCardsView.vue'

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
    component: JobCardsView
  },
  {
    path: '/candidates',
    name: 'CandidatesPool',
    component: () => import('@/views/CandidatesPoolView.vue')
  },
  {
    path: '/reports/:id',
    name: 'Reports',
    component: () => import('@/views/ReportsView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import ('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
