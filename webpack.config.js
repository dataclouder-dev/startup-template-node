const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = function (options) {
  return {
    ...options,
    resolve: {
      ...(options.resolve || {}),
      plugins: [
        ...((options.resolve && options.resolve.plugins) || []),
        new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, 'tsconfig.json') }),
      ],
    },
    externals: [
      nodeExternals({
        allowlist: [/^@dataclouder\/nest-/],
      }),
    ],
    cache: {
      type: 'filesystem',
      cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/webpack'),
      buildDependencies: {
        config: [
          __filename,
          require.resolve('./nest-cli.json'),
          require.resolve('./package.json'),
          require.resolve('./pnpm-lock.yaml'),
          require.resolve('./tsconfig.json'),
        ],
      },
    },
  };
};
