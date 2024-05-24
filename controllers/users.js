var express = require('express');
var router = express.Router();

/* Users Routes */
router.get('/new', function(req, res, next) {
  const flashMessage = req.flash('message');
  res.render('new_user', { flashMessage });
});

router.post('/new', function(req, res, next) {
  validateNewUserForm(req, res);
});

/* Validation Functions */
function validateNewUserForm(req, res) {
  if (isFormComplete(req) && isPasswordMatching(req)) {
    req.flash('message', 'Conta criada com sucesso! Prossiga com o login.');
    res.redirect('/');
  }
  res.redirect('/users/new');
}

function isFormComplete(req) {
  if (req.body.username != '' && req.body.name != '' && req.body.email != '' && req.body.password != '' && req.body.confirm_password != '') {
    return true;
  }
  req.flash('message', 'Erro: Todos os campos devem ser preenchidos.');
  return false;
}

function isPasswordMatching(req) {
  if (req.body.password === req.body.confirm_password) {
    return true;
  }
  req.flash('message', 'Erro: As senhas estão diferentes.');
  return false;
}

module.exports = router;
