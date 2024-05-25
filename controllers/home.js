var express = require('express');
var router = express.Router();

// Routes
router.get('/', function(req, res) {
    res.render("home", { user: "Danilo"});
});

module.exports = router;