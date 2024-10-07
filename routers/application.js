const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        // const currentUser = await User.findById(req.session.user._id);
        res.render('application/index.ejs') // May need a locals object
    } catch(error) {
        console.log(error)
        res.redirect('/')
    }
});

router.get('/new', async (req, res) => {
    res.render('application/new.ejs')
})

module.exports = router;