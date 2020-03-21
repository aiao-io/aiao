import { createRouter, createWebHistory } from 'vue-router';

import CodeEditor from './app/views/code-editor.vue';
import ElementsEditor from './app/views/elements-editor.vue';
import ElementsPreview from './app/views/elements-preview.vue';
import TextEditor from './app/views/text-editor.vue';

export const routerHistory = createWebHistory();

export const router = createRouter({
  history: routerHistory,
  routes: [
    { path: '/code-editor', component: CodeEditor },
    { path: '/elements-editor', component: ElementsEditor },
    { path: '/elements-preview', component: ElementsPreview },
    { path: '/text-editor', component: TextEditor },
    { path: '/', redirect: '/code-editor' }
  ]
});
