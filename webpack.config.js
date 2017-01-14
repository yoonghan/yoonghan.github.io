const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
      index: "./src/js/index.tsx",
      about: "./src/js/about.tsx",
      develop: "./src/js/develop.tsx",
      portfolio: "./src/js/portfolio.tsx"
    },
    output: {
      filename: "[name].bundle.js",
      path: __dirname + "/ext"
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".scss", '.css']
    },

    module: {
        loaders: [
          // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
          { test: /\.tsx?$/, loader: "ts-loader" },
          {
            test: /(\.scss)$/,
            //loader: ExtractTextPlugin.extract('css!sass'),
            //loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
            loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass')
          },
          {
            test: /\.(svg|woff|woff2|ttf|eot)(\?.*$|$)/,
            loader: 'file-loader?name=../ext/font/[name].[ext]&publicPath=../'
          }
        ],
        postcss: [autoprefixer],
        preLoaders: [
        ]
    },
    plugins: [
        new ExtractTextPlugin(__dirname + './../ext/css/[name].css')
    ],
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
      "react": "React",
      "react-dom": "ReactDOM",
      "react-addons-css-transition-group": "var React.addons.CSSTransitionGroup",
      "react-addons-transition-group": "var React.addons.TransitionGroup",
      "trianglify": "Trianglify"
    },
};
