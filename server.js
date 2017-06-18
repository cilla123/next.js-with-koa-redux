const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev: true});
const handle = app.getRequestHandler();
const router = require('./utils/routes.js');
const { parse } = require('url')

const test = require('./api/routes/test');

app.prepare()
  .then(() => {
    const server = express();

    // testing additional routes
    // needed for making api calls within app
    server.use('/api/test', test);

    // ssr
    server.get('*', (req, res) => {
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl
      const route = router(pathname);

      // only custom defined routes will be rendered
      if (route) {
        return app.render(req, res, route.component, query);
      } else {
        // display error other wise
        return app.render(req, res, '/error', query);
      }
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('App running on 3000');
    })
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  })
