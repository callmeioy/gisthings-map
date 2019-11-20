const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 用于自动生产html 与配套的js引入
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清除上次生成的dist目录
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制静态文件用的

// Cesium源码所在目录
// const cesiumSource = '本地xxxxxxxx修改源码';
// const cesiumWorkers = '本地xxxxxxxx修改源码';
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

module.exports = {
  entry: {
    app: './src/main.js'
  },
  // 公共文件打包,
  mode: 'development',
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
        // use: ['style-loader', 'css-loader','sass-loader']
        use:[
          {loader:'style-loader'},
          {loader:'css-loader'},
          {loader:'sass-loader'},
        ]
      },
      //图片字体，json资源
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf|json)$/,
        loader: 'url-loader',
        // options: {
        //     limit: 8192,
        //     name: '[name].[hash].[ext]',
        //     useRelativePath: false,
        //     outputPath: './static/assets',
        //     publicPath: './static/assets',
        // }
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: { // 设置访问路径别名 ，便于引入
      '@cesium': path.resolve(__dirname, cesiumSource),
      '@assets': path.resolve(__dirname, 'assets'),
      '@src': path.resolve(__dirname, 'src')
    },
  }, // 该resolve属性允许我们指定Webpack将解析哪些扩展
  output: {
    path: path.resolve(__dirname, './dist'),
    // publicPath: "/dist/",
    filename: '[name].[hash].js',
    //需要编译Cesium中的多行字符串
    sourcePrefix: ''
  },
  amd: {
    //允许Cesium兼容 webpack的require方式
    toUrlUndefined: true
  },
  node: {
    // 解决fs模块的问题（Resolve node module use of fs）
    fs: 'empty'
  },
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    port: 3000,
    hot: true
  },
  devtool: '#eval-source-map', // 映射源码
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: 'src/index.html', style: 'src/style.scss' }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(), // 热加载
    // 拷贝Cesium 资源、控件、web worker到静态目录
    new CopyWebpackPlugin([
      { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
      { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
      { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }
    ]),
    new webpack.DefinePlugin({
      //Cesium载入静态的资源的相对路径
      CESIUM_BASE_URL: JSON.stringify('')
    })
  ],
};
