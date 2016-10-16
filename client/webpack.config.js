module.exports = [
  {
    entry: {
      app: './js/index.js',
      vendor: ['whatwg-fetch']
    },
    output: {
      path: '../app/assets/javascripts/webpack'
      filename: '[name].js'
    },
    module: {
      loaders: [{
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      }]
    },
    plugins:[
      // vendor.bundle.jsを入れてないものはエラーになる
      new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    devServer: {
      // dev-serverのcontext root
      contentBase: 'public',
      port: 3001
    }
  },
  {
    entry: {
      app: './css/index.css'
    }
    output: {
      path: '../app/assets/stylesheets/webpack'
      filename: '[name].css'
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: extractCSS.extract(['css'])
        },{
          test: /\.scss$/,
          loader: extractCSS.extract(['css','sass'])
        }
      ]
    },
    plugins:[
      extractCSS
    ],
    resolve: {
      extensions: ['', '.css', '.scss']
    }
  }
]
