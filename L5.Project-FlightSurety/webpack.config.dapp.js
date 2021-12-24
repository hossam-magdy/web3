const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  entry: [path.join(__dirname, 'src/dapp')],
  output: {
    path: path.join(__dirname, 'prod/dapp'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        use: ['file-loader'],
      },
      {
        test: /\.html$/i,
        use: 'html-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new NodePolyfillPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/dapp/index.html'),
    }),
  ],
  resolve: {
    extensions: ['.js'],
  },
  devServer: {
    static: { directory: path.join(__dirname, 'dapp') },
    port: 8000,
  },
  stats: 'minimal',
};
