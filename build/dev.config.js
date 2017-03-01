const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./base.config');


config.plugins.push(new HtmlWebpackPlugin({
  title: 'dom-app',
  template: './build/index.html'
}));
config.plugins.push(new webpack.HotModuleReplacementPlugin());

config.devServer = {
  port: 3000,
  inline: true,
  hot: true,
  historyApiFallback: true
};

module.exports = config;
