const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Artworks = require('../models/artworks.js');

router.get('/', async (req, res) => {
    try {
        const artworks = await Artworks.find({owner: req.session.user._id});
        const userAbout = await User.find( { })
        res.render('profile/index.ejs', {artworks})
    } catch(error) {
        console.log(error)
        res.redirect('/')
    }
});

router.get('/edit', async (req, res) => {
    res.render('profile/edit.ejs')
});

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
    } catch(error) {
        console.log(error);
        res.redirect('/')
    }
});

router.put("/:profileId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.profileId)
        if (currentUser.owner.toString() == req.session.user._id) {
            await currentUser.findByIdAndUpdate(req.params.profileId, req.body)
            res.redirect(`/profile/${req.params.profileId}`)
        } else {
            res.redirect('/')
        }
    } catch(error) {
        console.log(error);
        res.redirect('/')
    }
})

module.exports = router;