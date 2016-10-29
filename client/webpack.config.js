const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// multiple extract instances
const extractCSS = new ExtractTextPlugin('[name].css');

function entryJs() {
  let entry = {
    'vendor': ['whatwg-fetch', 'promise']
  };
  const excludePaths = [];
  glob.sync('./src/js/**/*.jsx').forEach((path) => {
    const isExclude = excludePaths.find((p) => {
      return path.indexOf(p) !== -1;
    });
    if (isExclude) {
      return;
    }
    // 深いネストは考慮しない
    const split = path.split('/');
    // 拡張子は外す
    const point = path.replace('./src/js/', '').split('.')[0];
    // componentは[]を囲まないと読み込めないが面倒なので全部[]
    // refs. https://github.com/webpack/webpack/issues/300
    entry[`js/${point}`] = [path];
  });
  return entry;
}

function entryCss() {
  let entry = {};
  const excludePaths = [];
  glob.sync('./src/css/**/*.scss').forEach((path) => {
    const isExclude = excludePaths.find((p) => {
      return path.indexOf(p) !== -1;
    });
    if (isExclude) {
      return;
    }
    // 深いネストは考慮しない
    const split = path.split('/');
    // 拡張子は外す
    const point = path.replace('./src/css/', '').split('.')[0];
    entry[`css/${point}`] = path;
  });
  return entry;
}

module.exports = [
  {
    entry: entryJs(),
    output: {
      path: '../app/assets/javascripts/webpack',
      filename: '[name].js'
    },
    module: {
      loaders: [
        {
          test: /\.(jsx|js)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'react', 'stage-2']
          }
        }
      ]
    },
    loader: {
      configEnvironment: process.env.NODE_ENV || 'local'
    },
    plugins: [
      // vendor.bundle.jsを入れてないものはエラーになる
      new webpack.optimize.CommonsChunkPlugin("vendor", "js/vendor.bundle.js"),
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    devtool: 'source-map',
    devServer: {
      // dev-serverのcontext root
      contentBase: './src/html',
      port: 3001,
    }
  },
  {
    entry: entryCss(),
    output: {
      path: '../app/assets/stylesheets/webpack',
      filename: '[name].css'
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: extractCSS.extract(['css'])
        }, {
          test: /\.scss$/,
          loader: extractCSS.extract(['css', 'sass'])
        },
      ]
    },
    plugins: [
      extractCSS
    ],
    resolve: {
      extensions: ['', '.css', '.scss']
    }
  }
];
