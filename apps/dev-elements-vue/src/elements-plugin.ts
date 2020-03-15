import { App } from 'vue';

let isImport = false;

const install = (vue: App, options: any[]) => {
  console.log('vue', vue, options);
  if (isImport) {
    console.error(' already installed.');
  }
  isImport = true;
};

export const elementsVuePlugin = { install };
