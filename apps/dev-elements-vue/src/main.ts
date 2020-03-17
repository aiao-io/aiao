import { createApp } from 'vue';

import { applyPolyfills, defineCustomElements } from '@aiao/elements/loader';
import { defineCustomElements as IonicCore } from '@ionic/core/loader';

import App from './app/App.vue';
import { elementsVuePlugin } from './plugin/elements-plugin';
import { router } from './router';
import { globalState } from './store';

applyPolyfills().then(() => {
  defineCustomElements(window);
  IonicCore(window);
});

const app = createApp(App);
app.provide('state', globalState);

app.use(router);
app.use(elementsVuePlugin);
app.mount('#app');
