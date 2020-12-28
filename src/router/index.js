import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/search',
    component: () => import('../views/SearchLocation.vue'),
    meta: { transition: 'slide' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
