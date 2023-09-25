const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/api', '/auth'], // 프록시를 사용할 경로
    createProxyMiddleware({
      target: 'http://localhost:8000', // 백엔드 서버 주소
      changeOrigin: true,
    })
  );
};
