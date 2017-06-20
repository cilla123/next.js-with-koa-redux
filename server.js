require('dotenv').config({silent: true});

const Koa = require('koa');
const Router = require('koa-router');

const next = require('next');
const { parse } = require('url')

const NextRouter = require('./routes').Router
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

    // match all the navigation routes for UI
    NextRouter.forEachPattern((page, pattern, defaultParams = {}) => app_router.get(pattern, async (ctx, next) => {
      await n.render(ctx.req, ctx.res, `/${page}`, Object.assign({}, defaultParams, ctx.req.query, ctx.params));
      ctx.respond = false;
    }));

    // if not route matches show error
    app_router.get('*', async (ctx, next) => {
      const parsedUrl = parse(ctx.req.url, true)
      const { query } = parsedUrl

      await n.render(ctx.req, ctx.res, '/error', query);
      ctx.respond = false;
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
