const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 用于自动生产html 与配套的js引入
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清除上次生成的dist目录
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制静态文件用的

// // 本地Cesium源码所在目录，用于修改源码调试
const cesiumSource = 'src/lib/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

// 使用npm install cesium 安装的 模块
// const cesiumSource = 'node_modules/cesium/Source';
// const cesiumWorkers = '../Build/Cesium/Workers';

module.exports = {
  entry: {
    gisthings: './src/index.js'
  },
  // 打包编译输出js 的配置
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash].js',
    //需要编译Cesium中的多行字符串
    sourcePrefix: ''
  },
  module: {
    //解决Critical dependency: require function is used in a way in which dependencies cannot be statically extracted的问题
    unknownContextCritical: false,
    // loader 加载模块时对文件预处理 css,image,ts..
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ]
      },
      //图片字体，json资源
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf|json)$/,
        use: ['file-loader']
      }
    ]
  },
  // 该resolve属性允许我们指定Webpack将解析哪些扩展
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: { // 设置访问路径别名 ，便于引入
      '@cesium': path.resolve(__dirname, cesiumSource),
      '@assets': path.resolve(__dirname, 'assets'),
      '@src': path.resolve(__dirname, 'src'),
      'react-dom': '@hot-loader/react-dom' // 热加载
    },
  },
  amd: {
    //允许Cesium兼容 webpack的require方式
    toUrlUndefined: true
  },
  node: {
    // 解决fs模块的问题（Resolve node module use of fs）
    fs: 'empty'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ title: 'gisthings 地理事物展示', template: 'src/index.html', style: 'src/style.scss' }),
    // 拷贝Cesium 资源、控件、web worker到静态目录
    new CopyWebpackPlugin([
      { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
      { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
      { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }
    ]),
    // 定义浏览器环境的全局变量 （window）
    new webpack.DefinePlugin({
      //Cesium载入静态的资源的相对路径
      CESIUM_BASE_URL: JSON.stringify(''),
      HJNAME:'何军',
    })
  ],
};
