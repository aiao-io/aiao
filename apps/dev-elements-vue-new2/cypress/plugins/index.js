'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const vite_dev_server_1 = require('@cypress/vite-dev-server');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
module.exports = (on, config) => {
  on('dev-server:start', options => vite_dev_server_1.startDevServer({ options }));
  return config;
};
//# sourceMappingURL=index.js.map
