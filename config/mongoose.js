//configuring mongo db
const mongoose = require('mongoose');
const env = require('../config/environment');

mongoose.connect(
  process.env.MONGODBURI ||
    `mongodb+srv://jevik-zayka-user:7253@Dheeraj@cluster0.cmbhb.mongodb.net/<dbname>?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to mongo DB'));

db.once('open', () => {
  console.log('Database connected!');
});

module.exports = db;
