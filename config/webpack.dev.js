var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const API_URL = process.env.API_URL = 'http://localhost:3000';

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: API_URL + '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'API_URL': JSON.stringify(API_URL)
            }
        })
    ],

    devServer: {
        proxy: {
            '/ajax': {
                target: 'http://192.168.5.20:8080/',
                pathRewrite: {'^/ajax': ''},
                secure: false
            }
        },
        historyApiFallback: true,
        stats: 'minimal'
    }
});
