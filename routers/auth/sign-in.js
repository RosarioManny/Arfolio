const express = require('express');
const router = express.Router(); 
const bcrypt = require('bcrypt'); 

const User = require('/Users/emmanuelr/seb/projects/Back-End-Project/models/user.js');

router.get('/', (req, res) => {
    res.render('auth/sign-in.ejs')
});

router.post('/sign-in', async (req, res) => {
    try {
        const userInDatabase = await User.findONe({ username: req.body.username });
        if (!userInDatabase){
            return res.send('Login failed. Try again')
        } 

        const validPassword = bcrypt.compareSync(
            req.body.password, 
            userInDatabase.password
        );

        if(!validPassword) {
            return res.send('Login failed. Please try again.')
        }

        req.session.user = {
            username: userInDatabase.username,
            _id: userInDatabase._id
        }

    } catch(error) {
        console.log(error);
        res.redirect('/')
    }
});

module.exports = router