var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.set('Cache-Control', 'no-cache');
  res.render('sortoe');
});

module.exports = router;