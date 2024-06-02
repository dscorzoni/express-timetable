var express = require('express');
var router = express.Router();
const authToken = require('./login').authToken;
const { addTime } = require('../models/time');


// TimeTable Routes
router.get('/new', authToken, function(req, res) {
    const flashMessage = req.flash('message');
    res.render('timeForm', { flashMessage });
});

router.post('/new', authToken, async function(req, res) {
    if (isFormValid(req) && areTimesValid(req)) {
        await addTime(req);
        req.flash('message', {'type': 'success', 'message': 'Horário de trabalho registrado com sucesso!'});
    }
    res.redirect('/time/new');
    return;
});

module.exports = router;


// Validation functions

function isFormValid(req) {
    if (req.body.starttime != '' && req.body.endtime != '') {
        return true;
    } else {
        req.flash('message', {'type': 'error', 'message': 'Horário de início e fim precisam ser preenchidos.'})
        return false;
    }
}

function areTimesValid(req) {
    const starttime = req.body.starttime;
    const endtime = req.body.endtime;
    if (endtime < starttime) {
        req.flash('message', {'type': 'error', 'message': 'Horário de fim deve ser posterior ao de início.'})
        return false;
    }
    return true;
}