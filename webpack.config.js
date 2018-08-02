const extractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

const reactToolboxVariables = {
  'color-primary-dark': 'var(--palette-bs)',
  'color-text': '#444548',
  'color-primary': 'var(--palette-blue-500)',
  'button-height': '30px',
};

const extractSass = new extractTextPlugin({
  filename: "[name].style.css"
});

module.exports = {
    entry: {
      index: "./src/tsx/index.tsx",
      portfolio: "./src/tsx/portfolio.tsx",
      technology: "./src/tsx/technology.tsx",
      about: "./src/tsx/about.tsx",
      develop: "./src/tsx/develop.tsx",
      progressive: "./src/tsx/progressive.tsx"
    },
    output: {
        filename: "[name].bundle.js",
        publicPath: "/extw/",
        path: __dirname + "/dist/main/extw/"
    },

    devtool: "source-map",

    resolve: {
        extensions: [ ".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
              test: /\.tsx?$/,
              loader: "awesome-typescript-loader",
              exclude: ['/node_modules/','/src/patternlibrary']
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
      extractSass,
      new webpack.LoaderOptionsPlugin({
        postcss: () => {
            return [
                require('postcss-cssnext')({
                    features: {
                        customProperties: {
                            variables: reactToolboxVariables,
                        },
                    },
                }),
            ];
        }
      })
    ],

    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "trianglify": "Trianglify"
    }
};
