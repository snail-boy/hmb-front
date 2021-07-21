'use strict'
const {projectName } = require("./src/setting");

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = projectName // page title

const port = 9519 // dev port

// const timestamp = new Date().getTime();
// console.log(process.env.outputDir, 'process.env.outputDir')
// filenameHashing: false,
module.exports = {
  publicPath: './',
  outputDir: process.env.outputDir,
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_BASE_API + '/gateway']: {
        target: 'http://gateway.test.shie.com.cn/',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API + '/gateway']: ''
        }
      },
      [process.env.VUE_APP_BASE_API + '/track']: {
        target: 'http://track.test.shie.com.cn/',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API + '/track']: ''
        }
      },
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://qdihc-order.test.shie.com.cn/qdihc-order/v1',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        'img': resolve('src/assets/images')
      }
    },
    // output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
    //   filename: `static/js/[name].${timestamp}.js`,
    //   chunkFilename: `static/js/[name].${timestamp}.js`
    // },
  },
  // css: { //重点.
  //   extract:{ // 打包后css文件名称添加时间戳
  //     filename:`static/css/[name].${timestamp}.css`,
  //     chunkFilename:`/static/css/[name].${timestamp}.css`,
  //   }
  // },
  // chainWebpack: config => {
  // config
  // .module
  //   .rule('images')
  //   .test(/\.(jpg|png|gif|jpeg)$/)
  //   .use('url-loader')
  //   .loader('url-loader')
  //   .options({
  //     limit: 10,
  //     // 以下配置项用于配置file-loader
  //     // 根据环境使用cdn或相对路径
  //     publicPath: process.env.NODE_ENV === 'development' ? 'https://webrabbit.oss-cn-beijing.aliyuncs.com/qdeb/assets/images/' : './',
  //     // 将图片打包到dist/img文件夹下, 不配置则打包到dist文件夹下
  //     // outputPath: 'img',
  //     // 配置打包后图片文件名
  //     name: '[name].[ext]'
  //   })
  //   .end()
  // }

  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
