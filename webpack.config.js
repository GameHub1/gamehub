const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'client');

const config = {
  entry: `${APP_DIR}/index.js`,
  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'GameHub',
      template: 'client/index.html',
      filename: 'index.html'
    }),
    new ExtractTextPlugin('style.css')
  ],
  module: {
    loaders: [
      {
        test : /\.js?/,
        include : APP_DIR,
        loader : 'babel'
      },
      {
        test: /\.css$/,
        include: APP_DIR,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    ]
  }
}

module.exports = config;