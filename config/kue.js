const kue = require('kue');
const env = require('./environment');
let queue = null;
//creating queue for delayed jobs
if (env.name === 'development') {
  queue = kue.createQueue();
} else {
  queue = kue.createQueue({ redis: env.redisURL });
}

module.exports = queue;
