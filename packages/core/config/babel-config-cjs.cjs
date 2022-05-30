const resolver = require('./babel-resolver.cjs');

const CONFIG_ESM = {
  modules: false,
  targets: {
    node: '12',
  },
};

module.exports = (api) => {
  if (api) api.cache(true);

  return resolver([
    // ordering important, decorators before class properties
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-optional-chaining',
    ['@babel/plugin-transform-runtime', { useESModules: true }],
    '@babel/plugin-syntax-bigint',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-syntax-top-level-await',
    rewriteExt && [
      'babel-plugin-module-extension-resolver',
      {
        dstExtension: '.js',
        srcExtensions: ['.js', '.ts', '.tsx'],
      },
    ],
    '@babel/preset-typescript',
    [
      '@babel/preset-react',
      {
        development: false,
        runtime: 'automatic',
      },
    ],
    ['@babel/preset-env', CONFIG_ESM],
  ]);
};
