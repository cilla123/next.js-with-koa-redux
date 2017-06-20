const UrlPrettifier = require('next-url-prettifier').default;

const routes = [
  {
    page: 'index',
    prettyUrl: '/'
  },
  {
    page: 'about',
    prettyUrl: '/about'
  },
  {
    page: 'about',
    prettyUrlPatterns: [
      {
        pattern: '/about/:name'
      }
    ]
  }
]

const urlPrettifier = new UrlPrettifier(routes);
exports.default = routes;
exports.Router = urlPrettifier;