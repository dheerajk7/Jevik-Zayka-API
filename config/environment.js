const fs = require('fs');
const rfs = require('rotating-file-stream').createStream;
const path = require('path');

const logDirectory = path.join(__dirname, '../production_log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

console.log(rfs);
const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory,
});

const development = {
  name: 'development',
  db: 'jaivik_jaayaka_development',
  smtp: {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'dheeraj77253@gmail.com', // generated ethereal user
      pass: '7253@Dheeraj', // generated ethereal password
    },
  },
  jwt_secret: 'jaivik-jaayaka',
  morgan: {
    mode: 'dev',
    options: { stream: accessLogStream },
  },
};

const production = {
  name: 'production',
  db: 'jaivik_jaayaka_production',
  smtp: {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.JAIVIK_EMAIL, // generated ethereal user
      pass: process.env.JAIVIK_EMAIL_PASSWORD, // generated ethereal password
    },
  },
  jwt_secret: process.env.JAIVIK_JWT_SECRET,
  morgan: {
    mode: 'combined',
    options: { stream: accessLogStream },
  },
};

module.exports =
  eval(process.env.JAIVIK_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.JAIVIK_ENVIRONMENT);
