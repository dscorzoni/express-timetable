const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { getUser } = require('../models/users');

router.post('/', async function(req, res, next) {
    if (!isFormComplete(req)) {
        res.redirect('/');
        return;
    }
    const userInstance = await(getUser(req));
    if (userInstance) {
        loginUser(res, userInstance);
        res.redirect("/home");
        return;
    }
    req.flash('message', {'type': 'error', 'message': 'Usuário ou senha inválidos.'});
    res.redirect('/');
    return;
});

router.get('/logout', function(req, res) {
    logout(req, res);
})


// Login function that generates a token, register on cookie and return it.
function loginUser(res, userInstance) {
    const token = jwt.sign({username: userInstance.username, fullName: userInstance.fullName}, process.env.ACCESS_TOKEN_SECRET);
    res.cookie("accessToken", token);
    return token;
}

// Auth function to be used as middleware
function authToken(req, res, next) {
    const token = req.cookies.accessToken;
    if (!token) {
        req.flash('message', {'type': 'error', 'message': 'Autenticação é necessária para acessar esta página.'});
        res.redirect("/");
        return;
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            req.flash('message', {'type': 'error', 'message': 'Autenticação é necessária para acessar esta página.'});
            res.redirect("/");
            return;
        }
        req.user = user;
        next();
    })
}

// Logout function - Delete the jwt cookie
function logout(req, res) {
    const cookie = req.cookies;
    res.cookie('accessToken', '', {expires: new Date(0)});
    res.redirect('/');
}

// Validations
function isFormComplete(req) {
    if (req.body.username != '' && req.body.password != '') {
        return true;
    }
    req.flash('message', {"type":"error", "message": "Usuário e senha são necessários."})
    return false;
}

module.exports = { router, authToken };