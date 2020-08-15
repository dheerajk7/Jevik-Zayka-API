const kue = require('kue');
const env = require('./environment');

//creating queue for delayed jobs
const queue = kue.createQueue({ redis: env.redisURL });

module.exports = queue;
