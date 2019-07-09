const { sep } = require('path')

module.exports = ({ file }) => {
  // path.sep 用于获取操作系统的路径分隔符
  const rootValue = file.dirname.indexOf(`node_modules${sep}vant`) !== -1
    ? 16 // vant 转换的基准值
    : 32 // 我们的设计稿转换的基准值

  return {
    plugins: {
      autoprefixer: {},
      'postcss-pxtorem': {
        rootValue,
        propList: ['*']
      }
    }
  }
}
