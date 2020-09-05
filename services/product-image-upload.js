const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const env = require('../config/environment');

aws.config.update({
  accessKeyId: env.aws.AWS_ID,
  secretAccessKey: env.aws.AWS_SECRET,
  region: env.aws.AWS_BUCKET_REGION,
});

const s3 = new aws.S3();

const fileFilter = (request, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(
      new Error('Invalid File Type, only JPEG,JPg and PNG are acceptable'),
      false
    );
  }
};

var upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: env.aws.AWS_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: 'Jaivik_Zayka_Product_Images' });
    },
    key: function (req, file, cb) {
      cb(null, 'Jaivik_Zayka_Product_Image-' + Date.now().toString());
    },
  }),
});

module.exports = upload;
