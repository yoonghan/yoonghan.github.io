const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
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
    }
  );
  config.module.rules.push(
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }
  );
  config.resolve.extensions.push(".js", ".jsx", ".ts", ".tsx");
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
