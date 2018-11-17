const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/app/js/app.js',
  output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: false
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      NODE_ENV: process.env.NODE_ENV,
      inject: true,
      template: 'src/templates/client.html'
    }),
    new CopyWebpackPlugin([
      { from: 'src', to: '' },
    ], { debug: 'error' }),
    new webpack.HashedModuleIdsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
        exclude: /node_modules/
      },
      {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
          'file-loader'
          ],
          exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ],
        exclude: /node_modules/
      }
    ]
  }
};
