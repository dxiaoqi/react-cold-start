const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const path = require('path');
module.exports = merge(common, {
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/index.js',
    // 自动清空上次打包，以前需要clean插件
    clean: true,
    publicPath: './'
  },
  optimization: {
    minimize: true, //开启压缩
    moduleIds: 'deterministic', //单独模块id，模块内容变化再更新
    splitChunks: {
      chunks: 'all', // 匹配的块的类型：initial（初始块），async（按需加载的异步块），all（所有块）
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name:'vendors',
          chunks: 'all'
        }
      }
    }
  },
  mode: 'production'
})