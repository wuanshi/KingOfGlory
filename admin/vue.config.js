module.exports = {
  lintOnSave:false,
  configureWebpack:{
    resolve:{
      // 配置项目文件别名
      alias:{
        'network':'@/network',
      }
    }
  }
}