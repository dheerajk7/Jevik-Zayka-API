const express = require('express');
const router = express.Router();

//routes
router.use('/api', require('./api/index'));
router.get('/', function (req, res) {
  return res.status(200).json({
    message: 'Working',
  });
});

module.exports = router;
