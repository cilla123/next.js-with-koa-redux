const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    data: {
      type: String
    }
  }
);

const Test = mongoose.model('test', schema);

module.exports = Test;