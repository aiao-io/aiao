import { defineCustomElements as defineIcons } from 'ionicons/dist/loader';
import { createApp, h } from 'vue';

import { applyPolyfills, defineCustomElements } from '@aiao/elements/loader';

import App from './app/App.vue';
import { router } from './router';
import { globalState } from './store';

applyPolyfills().then(() => {
  defineCustomElements(window);
  defineIcons(window);
});

const app = createApp(App);
app.provide('state', globalState);
app.use(router);
app.mount('#app');
