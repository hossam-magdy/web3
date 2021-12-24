// const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
// const StartServerPlugin = require('start-server-webpack-plugin');

module.exports = {
  entry: ['webpack/hot/poll?1000', './src/server/index'],
  watch: true,
  target: 'node',
  externals: [nodeExternals({ allowlist: ['webpack/hot/poll?1000'] })],
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    moduleIds: 'named',
  },
  plugins: [
    // new StartServerPlugin('server.js'),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
  ],
  output: {
    path: path.join(__dirname, 'prod/server'),
    filename: 'server.js',
  },
};
