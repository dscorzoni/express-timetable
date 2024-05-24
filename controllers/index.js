var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const flashMessage = req.flash('message');
  res.render('index', { flashMessage });
});

module.exports = router;
