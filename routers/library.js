const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Library = require('../models/library.js');
const Artworks = require('../models/artworks.js');

router.get('/', async (req, res) => {
    try {
        const artworks = await Artworks.find( {owner: req.session.user._id});
        res.render('library/index.ejs', { artworks }); 
    } catch(error) {
        console.log(error);
        res.redirect('/');
    }
})

router.get('/new', async (req, res) => {
    try {
        res.render('library/new.ejs');
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
});

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

router.get("/:artworkId", async (req, res) => {
    try{
        const artwork = await Artworks.findById(req.params.artworkId)
        if (artwork.owner.toString() === req.session.user._id) {
            res.render("library/show.ejs", { artwork })
        } else {
            res.redirect("/")
        } 

    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
})

module.exports = router