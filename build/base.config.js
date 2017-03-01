const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'dom-app.js',
    path: path.resolve('dist')
  },
  module: {
    rules: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/}
    ]
  },
  plugins: []
};
