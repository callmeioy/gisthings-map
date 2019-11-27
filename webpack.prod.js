const merge = require('webpack-merge');
const common = require(__dirname +'/webpack.common.js');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')


module.exports = merge(common,{
  mode:'production', // 打包模式
  devtool: 'source-map' , // 源码映射
  // devtool: '#eval-source-map', // 映射源码
  // devtool:'inline-source-map', //编译后的js源码 映射，以便开发错误查找
  output:{
    publicPath:'/'
  },

  plugins:[
    new BundleAnalyzerPlugin()
  ]
});