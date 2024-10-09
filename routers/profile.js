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
        console.log(currentUser);
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

router.post('/', async (req, res) => {
    try {
        const artData = {
            ...req.body,
            owner: req.session.user._id,
        }
        const artwork = new Artworks(artData);
        await artwork.save()
        const artworks = await Artworks.find( {owner: req.session.user._id});
        const currentUser = await User.findById(req.session.user._id)
        const userAbout = await currentUser.aboutMe

        res.render("/library",{ artworks, userAbout })

    } catch(error) {
        console.log(error)
        res.redirect('/')
    }
})
// router.get('/edit', async (req, res) => {
//     res.render('profile/edit.ejs')
// });

// router.post('/', async (req, res) => {
//     try {
//         const currentUser = await User.findById(req.session.user._id);
//     } catch(error) {
//         console.log(error);
//         res.redirect('/')
//     }
// });

// router.get("/:profileId", async (req, res) => {
//     try {
//         const currentUser = await User.findById(req.params.profileId)
//         if (currentUser.owner.toString() == req.session.user._id) {
//             await currentUser.findByIdAndUpdate(req.params.profileId, req.body)
//             res.redirect(`/profile/${req.params.profileId}`)
//         } else {
//             res.redirect('/')
//         }
//     } catch(error) {
//         console.log(error);
//         res.redirect('/')
//     }
// })

module.exports = router;