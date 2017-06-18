const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = function db () {
  mongoose.connect(process.env.MONGODB_URL);

  mongoose.connection.on('error', (err) => {
    console.log('\n\n');
    console.log('#### Error connecting to DB');
    console.log('\n\n');
    console.error(err);
    console.log('\n\n');
    mongoose.disconnect();
  });

  mongoose.connection.on('connected', () => {
    console.log('\n\n');
    console.log('DB connection establised on', process.env.MONGODB_URL);
    console.log('\n\n');
  });

};