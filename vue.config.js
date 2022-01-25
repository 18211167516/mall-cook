/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-12-20 15:11:49
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-20 15:14:47
 */
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  configureWebpack: {
    devtool: 'source-map'
  },
  chainWebpack: config => {
    // 别名配置
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('@', resolve('src'))

    // 定义全局scss变量
   /*  const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // 公用scss
          resources: './src/scss/index.scss'
        })
        .end()
    }) */

    // 适配
    config.module
      .rule('scss')
      .oneOf('vue')
      .use('px2rem-loader')
      .loader('px2rem-loader')
      .before('postcss-loader') // this makes it work.
      .options({ remUnit: 37.5, remPrecision: 8 })
      .end()
  },
  pluginOptions: {
    'style-resources-loader': {
        preProcessor: 'scss',
        patterns: [
            // 这个是绝对路径,不能使用 alias 中配置的别名路径，如@表示的src
            path.resolve(__dirname, './src/scss/index.scss')
        ]
    }
  }
}
