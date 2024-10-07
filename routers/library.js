const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Library = require('../models/library.js');
const Artworks = require('../models/artworks.js');

router.get('/', async (req, res) => {
    try {
    } catch(error) {
        console.log(error);
        res.redirect('/');
    }
    res.render('library/index.ejs'); 
})

router.get('/new', async (req, res) => {
    res.render('library/new.ejs')
})

router.post('/', async (req, res) => {
    try {
        const artData = {
            ...req.body,
            owner: req.session.user._id,
        }
        const artwork = new Artworks(artData);
        await artwork.save()

        res.redirect("/library")

    } catch(error) {
        console.log(error)
        res.redirect('/')
    }
})



module.exports = router