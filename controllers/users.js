var express = require('express');
var router = express.Router();
var { userModel, addUser, deleteUser, getUserInfo, updateUser } = require('../models/users');
const authToken = require('./login').authToken;
const bcrypt = require('bcrypt');

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

router.get('/change', authToken, async function(req, res) {
  const userInstance = await getUserInfo(req);
  const flashMessage = req.flash('message');
  res.render('userChange', { user: userInstance, flashMessage: flashMessage });
});

router.post('/change', authToken, async function(req, res) {
  validateUserChangeForm(req, res);
});





/* Validation Functions */

async function validateUserChangeForm(req, res) {
  // console.log('Form complete', isFormComplete(req));
  // console.log('Password matching', isPasswordMatching(req));
  // console.log('isCurrentPasswordCorrect', await isCurrentPasswordCorrect(req));
  // console.log('updateUser', await updateUser(req));
  if (isFormComplete(req) 
    && isPasswordMatching(req) 
    && await isCurrentPasswordCorrect(req) 
    ) {
    await updateUser(req);
    req.flash('message', {'type':'success', 'message':'Dados atualizado com sucesso! Prossiga com o login.'});
    res.redirect('/login/logout');
    return;
  }
  req.flash('message', {'type':'error', 'message':'Houve um erro, tente novamente.'})
  res.redirect('/users/change');
  return;
}

async function isCurrentPasswordCorrect(req) {
  const userInstance = await getUserInfo(req);
  const isMatch = await bcrypt.compare(req.body.old_password, userInstance.password);
  if (isMatch) {
    return isMatch;
  } else {
   req.flash('message', {'type': 'error', 'message': 'Senha atual é inválida. Tente novamente.'}) 
  }
}

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
