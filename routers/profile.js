const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Artworks = require('../models/artworks.js');

router.get('/', async (req, res) => {
    try {
        const artworks = await Artworks.find({owner: req.session.user._id});
        const currentUser = await User.findById(req.session.user._id)
        const userAbout = await currentUser.aboutMe
        res.render('profile/index.ejs', { artworks, userAbout })
    } catch(error) {
        console.log(error)
        res.redirect('/')
    }
});

router.put('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.aboutMe = {
            name: req.body.name,
            contacts: req.body.contacts,
            website: req.body.website,
            mainMedium: req.body.mainMedium,
        }

        await currentUser.save()
        
        res.redirect(`/profile/`)
    } catch(error) {
        console.log(error);
        res.redirect("/")
    }
})

router.get('/:profileId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.profileId)
        const userAbout = await currentUser.aboutMe
        if (currentUser._id == req.session.user._id) {
            res.render("profile/edit.ejs", { userAbout })
        
        } 
    } catch(error) {
    console.log(error);
    res.redirect('/')
}
})

module.exports = router;