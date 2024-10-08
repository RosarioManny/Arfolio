const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Artworks = require('../models/artworks.js');

router.get('/', async (req, res) => {
    try {
        const artworks = await Artworks.find( {owner: req.session.user._id});
        res.render('profile/index.ejs', { artworks }); 
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
        if (artwork.owner.toString() === req.params.artworkId) {
            res.render("library/show.ejs", { artwork })
        } else {
            res.redirect("/")
        } 

    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
})

router.delete("/:artworkId", async (req, res) => {
    try {
        const artwork = await Artworks.findById(req.params.artworkId);
        if (artwork.owner.toString() == req.session.user._id) {
            await Artworks.findByIdAndDelete(req.params.artworkId);
            res.redirect("/library");
        } else {
            res.redirect("/");
        } 
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

router.get("/:artworkId/edit", async (req, res) => {
    try {
    const artwork = await Artworks.findById(req.params.artworkId);
    if (artwork.owner.toString() == req.session.user._id) {
        res.render("library/edit.ejs", { artwork })
    } else {
        res.redirect("/")
    }
    } catch(error) {
        console.log(error);
        res.redirect("/")
    }
})

router.put("/:artworkId", async (req, res) => {
    try {
        const artwork = await Artworks.findById(req.params.artworkId);
        if (artwork.owner.toString() == req.session.user._id) {
            await Artworks.findByIdAndUpdate(req.params.artworkId, req.body);

            res.redirect(`/library/${req.params.artworkId}`);
        }  else {
            res.redirect("/")
        }
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
});

module.exports = router