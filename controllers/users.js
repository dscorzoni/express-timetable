var express = require('express');
var router = express.Router();
var { userModel, addUser, deleteUser } = require('../models/users');
const authToken = require('./login').authToken;

/* Users Routes */
router.get('/new', function(req, res, next) {
  const flashMessage = req.flash('message');
  res.render('newUser', { flashMessage });
});

router.post('/new', function(req, res, next) {
  validateNewUserForm(req, res);
});

router.get('/delete', authToken, async function(req, res) {
  if (await deleteUser(req)) {
    req.flash('message', {'type': 'success', 'message': 'Usuário foi deletado com sucesso.'});
  } else {
    req.flash('message', {'type': 'error', 'message': 'Houve um erro. Tente novamente.'});
  }
  res.redirect('/login/logout');
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
