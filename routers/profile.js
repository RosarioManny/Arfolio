const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Library = require('../models/library.js');
const Artworks = require('../models/artworks.js');

router.get('/', async (req, res) => {
    try {
        // const currentUser = await User.findById(req.session.user._id);
        // const userArtworks = await Artworks.findById( { owner: req.session.user._id })
        res.render('application/index.ejs',
            // { userArtworks }
            //  { about: currentUser.about},
            //  { library: currentUser.library.works}
            )
    } catch(error) {
        console.log(error)
        res.redirect('/')
    }
});

router.get('/new', async (req, res) => {
    res.render('application/new.ejs')
});

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
    } catch(error) {
        console.log(error);
        res.redirect('/')
    }
});


module.exports = router;