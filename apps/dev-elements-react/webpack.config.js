const getWebpackConfig = require('@nrwl/react/plugins/webpack');

function getCustomWebpackConfig(webpackConfig) {
  const config = getWebpackConfig(webpackConfig);

  // // TS v3.7 support
  // const babelRuleOptions = config.module.rules.find(r => r.loader === 'babel-loader').options;
  // babelRuleOptions.plugins.push('@babel/plugin-proposal-optional-chaining');
  // babelRuleOptions.plugins.push('@babel/plugin-proposal-nullish-coalescing-operator');

  // Polyfill Node
  config.node = {
    global: true,
    process: true
  };

  return config;
}

module.exports = getCustomWebpackConfig;
