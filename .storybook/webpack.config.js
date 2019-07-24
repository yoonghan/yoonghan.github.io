const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve("babel-loader")
      },
      {
        loader: require.resolve("awesome-typescript-loader")
      },
      {
        loader: require.resolve("react-docgen-typescript-loader")
      }
    ]
  });
  config.resolve.extensions.push(".ts", ".tsx");
  /**Resolves to not use tslint, awesome typescript sends error immediately, forkts relies on linting.**/
  // config.plugins.push(
  //   new ForkTsCheckerWebpackPlugin({
  //     async: false,
  //     checkSyntacticErrors: true,
  //     formatter: require('react-dev-utils/typescriptFormatter'),
  //   })
  // )
  return config;
};
