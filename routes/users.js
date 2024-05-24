var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new', function(req, res, next) {
  res.render('new_user');
});

router.post('/new', function(req, res, next) {
  console.log(req.body);
  res.redirect('/');
})

module.exports = router;
