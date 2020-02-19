module.exports = {
  // 修改的配置
  // 将baseUrl: '/api',改为baseUrl: '/',
  publicPath: '/',
  devServer: {
      proxy: {
          '/api': {
              target: 'http://127.0.0.1:8085/api',
              // target: 'http://127.0.0.1:8085/api',
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                '^/api': ''
              }
          }
      }
  }
}
// .env.development
// VUE_APP_BASE_API=/api