/**
 * express  模拟应用后台服务器
 */
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.prod.js');
const compiler = webpack(config);

// 告诉 express 使用 webpack-dev-middleware，以及将 webpack.prod.js 配置文件作为基础配置
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// 将文件 serve 到 port 80
app.listen(80, function () {
  console.log('Example app listening on port 80!\n');
});