import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/ScanView.vue'),
    },
    {
      path: '/guess',
      name: 'guess-view',
      component: () => import('@/views/GuessView.vue'),
    },
  ],
});

export default router;
