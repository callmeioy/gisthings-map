const merge = require('webpack-merge');
const webpack =require('webpack');
const common = require(__dirname +'/webpack.common.js');

module.exports = merge(common,{
  mode:'development', // 打包模式
  devtool: '#eval-source-map', // 映射源码
  // devtool:'inline-source-map', //编译后的js源码 映射，以便开发错误查找

  // webpack-dev-server 配置
  devServer:{
    host:'127.0.0.1',
    port:'9234',
    contentBase:'./dist', // 加载server的web目录
    hot:true, // HMR 热模块替换
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(), // HMR
    new webpack.NamedModulesPlugin(), // 输出热模块加载的模块名称
  ]
});