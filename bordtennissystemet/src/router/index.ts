import { createRouter, createWebHistory } from 'vue-router'
import PlayerEntries from '../pages/PlayerEntries.vue'
import Tournament from '../pages/Tournament.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PlayerEntries,
    },
    {
      path: '/tournament',
      name: 'tournament',
      component: Tournament,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
