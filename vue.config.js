const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  // publicPath: './',
  publicPath: '/',
  // devServer: {
  //   host:'127.0.0.1',
  //   port: 9001,
  //   proxy: {
  //     '/api': {
  //       target: 'http://192.168.134.233:9001',
  //       changeOrigin: true,
  //       // ws: true,
  //       // pathRewrite: {
  //       //   '^/api': ''
  //       // }
  //     }
  //   }
  // }
})
