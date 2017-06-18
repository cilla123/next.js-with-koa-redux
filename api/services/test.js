const Test = require('../models/test.js');

const tests = module.exports = {};

tests.doTest = async function  () {
  const record = new Test({
    data: Date.now()
  });

  const rec = await record.save();
  return rec;
}