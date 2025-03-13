import { createRouter, createWebHistory } from 'vue-router';
import ScanView from '@/views/ScanView.vue';
import GuessView from '@/views/GuessView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ScanView,
    },
    {
      path: '/guess',
      name: 'guess-view',
      component: GuessView,
    },
  ],
});

export default router;
