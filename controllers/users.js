var express = require('express');
var router = express.Router();
var { userModel, addUser } = require('../models/users');

/* Users Routes */
router.get('/new', function(req, res, next) {
  const flashMessage = req.flash('message');
  res.render('newUser', { flashMessage });
});

router.post('/new', function(req, res, next) {
  validateNewUserForm(req, res);
});






/* Validation Functions */

async function validateNewUserForm(req, res) {
  if (isFormComplete(req) && isPasswordMatching(req) && await addUser(req)) {
    req.flash('message', {'type': 'success', 'message': 'Conta criada com sucesso! Prossiga com o login.'});
    res.redirect('/');
    return;
    }
  res.redirect('/users/new');
  return;
}

function isFormComplete(req) {
  if (req.body.username != '' && req.body.name != '' && req.body.email != '' && req.body.password != '' && req.body.confirm_password != '') {
    return true;
  }
  req.flash('message', {'type': 'error', 'message': 'Erro: todos os campos devem ser preenchidos.'});
  return false;
}

function isPasswordMatching(req, res) {
  if (req.body.password === req.body.confirm_password) {
    return true;
  }
  req.flash('message', {'type': 'error', 'message': 'Erro: as senhas estão diferentes.'});
  return false;
}



module.exports = router;
