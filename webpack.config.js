const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  entry: './main.js',
  output: {
    path: path.join(__dirname, '/dist')
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.BUILD_ENV,
      ARCH: process.env.ARCH,
    })
  ]
}