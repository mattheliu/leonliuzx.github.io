import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutPage.vue')
    },
    {
      path: '/experience',
      name: 'experience',
      component: () => import('../views/ExperiencePage.vue')
    },
    {
      path: '/thoughts',
      name: 'thoughts',
      component: () => import('../views/ThoughtsPage.vue')
    },
    {
      path: '/thoughts/:id',
      name: 'thought-detail',
      component: () => import('../views/ThoughtDetailPage.vue')
    },
    {
      path: '/life',
      name: 'life',
      component: () => import('../views/LifePage.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactPage.vue')
    }
  ]
})

export default router 