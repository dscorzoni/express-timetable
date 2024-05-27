var express = require('express');
var router = express.Router();
const { getUser } = require('../models/users');

// Routes
router.post('/', async function(req, res) {
    if (isFormComplete(req)) {
        const userInstance = await getUser(req);
        if (userInstance) {
            res.render("home", { user: userInstance.fullName});
            return;
        }
        req.flash('message', {'type':'error', 'message': 'Usuário ou senha inválidos.'});
    }
    res.redirect("/");
});


// Validations
function isFormComplete(req) {
    if (req.body.username != '' && req.body.password != '') {
        return true;
    }
    req.flash('message', {"type":"error", "message": "Usuário e senha são necessários."})
    return false;
}


module.exports = router;