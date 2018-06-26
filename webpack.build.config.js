const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: path.resolve(__dirname, './src/index')
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    library: 'MpvueMarkdownParser',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.js'],
    modules: [path.join(__dirname, './node_modules')]
  },
  
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};
