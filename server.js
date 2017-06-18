require('dotenv').config({silent: true});

const Koa = require('koa');
const Router = require('koa-router');

const next = require('next');
const { parse } = require('url')

const router = require('./api/utils/router.js');
const db = require('./api/utils/db.js');
const tests = require('./api/routes/tests');

const dev = process.env.NODE_ENV !== 'production';
const n = next({dev: true});
const handle = n.getRequestHandler();

n.prepare()
  .then(() => {

    try {
      db();
    } catch (e) {
      console.log('No db connection');
      return process.exit(1);
    }
    const app = new Koa();
    const app_router = new Router();

    // testing additional routes
    // needed for making api calls within app
    app.use(tests.routes());

    // ssr
    app_router.get('*', async (ctx, next) => {
        const parsedUrl = parse(ctx.req.url, true)
        const { pathname, query } = parsedUrl
        const route = router(pathname);  

        if (route) {
          await n.render(ctx.req, ctx.res, route.component, query);        
          ctx.respond = false;
        } else {
          // display error other wise
          await n.render(ctx.req, ctx.res, '/error', query);
          ctx.respond = false;
        }
        
    });

    app.use(async (ctx, next) => {
      ctx.res.statusCode = 200
      await next();
    });

    app.use(app_router.routes());

    app.listen(3000, (err) => {
      if (err) throw err;
      console.log('App running on 3000');
    })
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  })
