import { RouteRecordRaw } from 'vue-router';

import { createRouter, createWebHistory } from '@ionic/vue-router';

import About from '../views/About.vue';
import CodeEditor from '../views/code-editor.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: CodeEditor
  },
  {
    path: '/about',
    component: About
  }
];

// https://vitejs.dev/guide/env-and-mode.html
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
