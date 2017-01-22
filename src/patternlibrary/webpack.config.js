/**
 * For development on patternlibrary only.
 **/
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer');
module.exports = {
    entry: {
      header: "./src/patternlibrary/js/header.tsx",
      post: "./src/patternlibrary/js/post.tsx",
      footer: "./src/patternlibrary/js/footer.tsx",
      localize: "./src/patternlibrary/js/localize.tsx",
      mainscreen: "./src/patternlibrary/js/mainscreen.tsx",
      material: "./src/patternlibrary/js/material.tsx",
      stickytitle: "./src/patternlibrary/js/stickytitle.tsx",
      metitle: "./src/patternlibrary/js/metitle.tsx",
      gallery: "./src/patternlibrary/js/gallery.tsx"
    },
    output: {
        filename: "[name].bundle.js",
        path: __dirname + "/ext"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".scss", '.css']
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/,
              loader: "ts-loader" },
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
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
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
