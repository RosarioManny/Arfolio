const express = require('express');
const router = express.Router(); 
const bcrypt = require('bcrypt'); 

const User = require('/Users/emmanuelr/seb/projects/Back-End-Project/models/user.js');

router.get('/', (req, res) => {
    res.render('auth/sign-up.ejs')
})

module.exports = router