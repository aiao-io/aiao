const { VueLoaderPlugin } = require('vue-loader');

function getCustomWebpackConfig(webpackConfig) {
  const config = webpackConfig;

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
    use: {
      loader: 'vue-loader',
      options: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('aiao-') || tag.startsWith('ion-')
        }
      }
    }
  });

  config.plugins.push(new VueLoaderPlugin());
  return config;
}

module.exports = getCustomWebpackConfig;
