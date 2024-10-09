const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Artworks = require('../models/artworks.js');

router.get('/', async (req, res) => {
    try {
        // const artworks = await Artworks.find( {owner: req.session.user._id});
        // const currentUser = await User.findById(req.session.user._id)
        // const userAbout = await currentUser.aboutMe;
        res.redirect("/profile/")
        // res.render('profile/index.ejs', { artworks, userAbout }); 
    } catch(error) {
        console.log(error);
        res.redirect('/');
    }
})

router.get('/new', async (req, res) => { // ADD WORKS PAGE
    try {
        res.render('library/new.ejs');
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
});



router.get("/:artworkId", async (req, res) => { // SHOW PAGE
    try{
        const artwork = await Artworks.findById(req.params.artworkId)
        if (artwork.owner.toString() === req.session.user._id) {
            res.render("library/show.ejs", { artwork })
        } else {
            res.send("/")
        } 

    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
})

router.get("/:artworkId/edit", async (req, res) => { // EDIT PAGE
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

router.delete("/:artworkId", async (req, res) => { // DELETE REQUEST FROM SHOW PAGE
    try {
        const artwork = await Artworks.findById(req.params.artworkId);
        const currentUser = await User.findById(req.session.user._id)
        const userAbout = await currentUser.aboutMe

        if (artwork.owner.toString() == req.session.user._id) {
            await Artworks.findByIdAndDelete(req.params.artworkId);
            res.redirect("/profile", { artwork, userAbout });
        } else {
            res.redirect("/");
        } 
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});



// router.put("/:artworkId", async (req, res) => {
//     try {
//         const artwork = await Artworks.findById(req.params.artworkId);
//         if (artwork.owner.toString() == req.session.user._id) {
//             await artwork.findByIdAndUpdate(req.params.artworkId, req.body);

//             res.redirect(`/library/${req.params.artworkId}`);
//         }  else {
//             res.redirect("/")
//         }
//     } catch (error) {
//         console.log(error);
//         res.redirect("/")
//     }
// });

router.put('/:artworkId', async (req, res) => {
    try {
        const artwork = await Artworks.findById(req.params.artworkId);
        artwork.set(req.body);
        await artwork.save();
        
        res.redirect(`/library/${artwork._id}`);
    } catch(error) {
        console.log(error);
        res.redirect("/")
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

// router.put('/:artworkId', async (req, res) => {
//     try {
//         const artwork = await Artworks.findById(req.params.artworkId);
//    
//         currentUser.aboutMe = {
//             name: req.body.name,
//             contacts: req.body.contacts,
//             website: req.body.website,
//             mainMedium: req.body.mainMedium,
//         }

//         await currentUser.save()
        
//         res.redirect(`/profile/`)
//     } catch(error) {
//         console.log(error);
//         res.redirect("/")
//     }
// })
module.exports = router