var express = require('express');
var router = express.Router();
const { getUser } = require('../models/users');
const authToken = require('./login').authToken;

// Routes
router.get('/', authToken, async function(req, res) {
    res.render("home", { user: req.user.fullName });
});



module.exports = router;