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

function validateNewUserForm(req, res) {
  if (isFormComplete(req) && isPasswordMatching(req)) {
    addUser(req);
    req.flash('message', 'Conta criada com sucesso! Prossiga com o login.');
    res.redirect('/');
  } else {
    res.redirect('/users/new');
  }
}

function isFormComplete(req) {
  if (req.body.username != '' && req.body.name != '' && req.body.email != '' && req.body.password != '' && req.body.confirm_password != '') {
    return true;
  }
  req.flash('message', 'Erro: todos os campos devem ser preenchidos.');
  return false;
}

function isPasswordMatching(req, res) {
  if (req.body.password === req.body.confirm_password) {
    return true;
  }
  req.flash('message', 'Erro: As senhas estão diferentes.');
  return false;
}




// User CRUD functions
// async function addUser(req) {
//   const userInstance = await userModel.create({
//     username: req.body.username,
//     fullName: req.body.name,
//     email: req.body.email,
//     password: req.body.password
//   });
//   return userInstance;
// }

module.exports = router;
