// const express = require('express');
const  Router = require('koa-router');

const tests = require('../services/test.js');

const router = new Router({
  prefix: '/v1/api/tests',
});


// testing api routes
router.get('/', async (ctx, next) => {
  ctx.body = {data: 'testing api calls'};
});

router.post('/', async (ctx, next) => {
  const date = Date.now();
  const rec = await tests.doTest();
  ctx.body = {current_time: rec};
});

module.exports = router;