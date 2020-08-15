const express = require('express');
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const app = express();
//connecting to database
const db = require('./config/mongoose');
const multer = require('multer');
const upload = multer();
const logger = require('morgan');
const env = require('./config/environment');
const Redis = require('ioredis');

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// console.log(env.morgan.mode, env.morgan.options);
app.use(logger(env.morgan.mode, env.morgan.options));

app.use(bodyParser.json());
// app.use(upload.array("kk"));
// app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', './views');
//make the upload path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

//used for session cookie
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');

let client = require('redis').createClient(env.redisURL);
let redis = new Redis(env.redisURL);

app.use(express.static('./static'));
app.use(passport.initialize());
//using router
app.use('/', require('./routes/index.js'));

app.listen(port, function (err) {
  if (err) {
    console.log('Error in running server');
    return;
  }
  console.log('Server is running and up at port ', port);
  return;
});
