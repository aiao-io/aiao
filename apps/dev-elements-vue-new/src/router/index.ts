import { RouteRecordRaw } from 'vue-router';

import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/code-editor'
  },
  {
    path: '/code-editor',
    component: import('../views/code-editor.vue')
  },
  {
    path: '/elements-editor',
    component: import('../views/elements-editor.vue')
  },
  {
    path: '/elements-preview',
    component: import('../views/elements-preview.vue')
  },
  {
    path: '/text-editor',
    component: import('../views/text-editor.vue')
  }
];

// https://vitejs.dev/guide/env-and-mode.html
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
