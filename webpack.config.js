// Webpack v4
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    main: './src/js/app.js',
    style: './src/css/style.css'
  },
  mode: 'development',
  devServer: {
    contentBase: './dist'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use:  ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist', {} ),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/html/index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash()
  ]
}


// const path = require('path')
// const webpack = require('webpack')
//
// // additional plugins
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// module.exports = {
  // // Базовый путь к проекту
  // context: path.resolve(__dirname, 'src'),
  //
  // // точки входа JS
  // entry: {
  //   // Основной файл приложения
  //   app: [
  //     './js/app.js',
  //     './css/style.css'
  //   ]
  // },
  //
  // // путь для собранных файлов
  // output: {
  //   filename: 'js/[name].js', // [name] автоматически заменится на имя файла точки входа
  //   path: path.resolve(__dirname, 'dist'),
  //   publicPath: '../'
  // },
  // mode: 'development',
  //
  // // devServer configuration
  // devServer: {
  //   contentBase: './app'
  // },
  //
  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/,
  //       exclude: __dirname + "./src/assets",
  //       use: [
  //         'style-loader',
  //         'css-loader'
  //       ]
  //     }
  //   ]
  // },
  //
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     filename: 'style.css'
  //   })
  // ]

  //


// }
