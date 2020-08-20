const kue = require('kue');

let queue = null;
//creating queue for delayed jobs

queue = kue.createQueue();

module.exports = queue;
