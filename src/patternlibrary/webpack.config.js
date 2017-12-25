const extractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

const extractSass = new extractTextPlugin({
  filename: "[name].style.css"
});

module.exports = {
    entry: {
      header: "./src/patternlibrary/tsx/header.tsx",
      post: "./src/patternlibrary/tsx/post.tsx",
      mainscreen: "./src/patternlibrary/tsx/mainscreen.tsx",
      footer: "./src/patternlibrary/tsx/footer.tsx",
      stickytitle: "./src/patternlibrary/tsx/stickytitle.tsx",
      material: "./src/patternlibrary/tsx/material.tsx",
      metitle: "./src/patternlibrary/tsx/metitle.tsx",
      progressivebutton: "./src/patternlibrary/tsx/progressivebutton.tsx",
      localeselector: "./src/patternlibrary/tsx/localeselector.tsx",
      gallery: "./src/patternlibrary/tsx/gallery.tsx"
    },
    output: {
        filename: "[name].bundle.js",
        publicPath: "/extw/",
        path: __dirname + "/../../patternlibrary/dist/patternlibrary/"
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".scss"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
              test: /\.tsx?$/,
              loader: "awesome-typescript-loader",
              exclude: ['/node_modules/','/src/tsx/']
            },
            // All files with a '.scss' are precompiled
            {
              test: /(\.scss)$/,
              use: extractSass.extract({
                use: [{
                  loader: "css-loader",
                    options: {
                      modules: true,
                      localIdentName: '[name]_[local]--[hash:base64:5]'
                    }
                },
                {
                  loader: "postcss-loader"
                },
                {
                  loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
              })
            },
            {
              test: /\.css$/,
              use: [
                "style-loader",
                {
                  loader: "css-loader",
                  options: {
                    modules: true, // default is false
                    sourceMap: true,
                    importLoaders: 1,
                    localIdentName: "[name]--[local]--[hash:base64:8]"
                  }
                },
                "postcss-loader"
              ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
              enforce: "pre",
              test: /\.js$/,
              loader: "source-map-loader"
            }
        ]
    },

    plugins: [
      extractSass
    ],

    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "trianglify": "Trianglify"
    }
};
