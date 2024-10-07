const express = require('express');
const router = express.Router(); 
const bcrypt = require('bcrypt'); 

const User = require('/Users/emmanuelr/seb/projects/Back-End-Project/models/user.js');

router.get('/', (req, res) => {
    res.render('auth/sign-up.ejs')
});

router.post('/', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username });
        if (userInDatabase) {
            return res.send('Username already taken.');
        }
        if (req.body.password !== req.body.confirmPassword) {
            return res.send("Passwords must match.");
        }
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;

        await User.create(req.body);

        res.redirect('/sign-in');
    } catch(error) {
        console.log(error)
        res.redirect('/')
    }
});

module.exports = router