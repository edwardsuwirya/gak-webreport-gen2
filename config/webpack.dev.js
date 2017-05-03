var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  
  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:3000/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  
  devServer: {
 	proxy: {
            '/ajax': {
                target: 'http://192.168.5.20:8080/',
		pathRewrite: {'^/ajax' : ''},
                secure: false
            }
	},
    historyApiFallback: true,
    stats: 'minimal'
  }
});
