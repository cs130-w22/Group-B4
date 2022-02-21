const { createProxyMiddleware } = require('http-proxy-middleware');

const options = {
    target: 'http://localhost:3000',
    pathRewrite: {
      '^/api/': '/', // remove base path
    }
  };

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware(options)
  );
};