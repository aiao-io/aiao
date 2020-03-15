const getWebpackConfig = require('@nrwl/react/plugins/webpack');
const { VueLoaderPlugin } = require('vue-loader');

function getCustomWebpackConfig(webpackConfig) {
  const config = getWebpackConfig(webpackConfig);

  // Polyfill Node
  config.node = {
    global: true,
    process: true
  };

  // add vue
  config.resolve.alias = {
    ...config.resolve.alias,
    vue: '@vue/runtime-dom'
  };
  config.resolve.extensions.push('.vue');

  config.module.rules.push({
    test: /\.vue$/,
    use: 'vue-loader'
  });

  config.plugins.push(new VueLoaderPlugin());
  return config;
}

module.exports = getCustomWebpackConfig;
