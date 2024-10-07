const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.js');

router.get('/', (req, res) => {
    res.render('auth/sign-in.ejs')
});

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs')
});

module.exports = router