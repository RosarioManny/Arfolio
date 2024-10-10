const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Artworks = require('../models/artworks.js');

// GET - SHOW PROFILE PAGE
router.get('/', async (req, res) => {
    try {
        res.redirect("/profile/")
    } catch(error) {
        console.log(error);
        res.redirect('/');
    }
})

// GET - SHOW ADD WORKS PAGE
router.get('/new', async (req, res) => { 
    try {
        res.render('library/new.ejs');
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
});

// GET - SHOW PAGE
router.get("/:artworkId", async (req, res) => { 
    // console.log('berfore the tryyyy yturyvuyifgvbiutgbnitubgni ugbhniuogbhnioughnouhi nouhn', req.params)

    try{
        console.log('why do i appear twotimes????????????????????????????????????,', req.params)
        const artwork = await Artworks.findById(req.params.artworkId)
        const currentUser = await User.findById(req.session.user._id)
        // console.log(artwork, 'dcfvgbiuvfyucdtxrszaxrydcufvigbohigfudctysxtzrydctufvyigbuohivfyucdtxysrtzydctufvyigubivfyucdtyxtcuyviubgovicyudxtysrtzxsydtcufyvigubfcyudtxysrtzxydtcufyvigbvfycudtxysrtzydcufvigboivycutyxrtcdufvigb')
        // console.log(currentUser,'tdcfvgifucydxtzsxrdycfuvgibhobguvfycdtxsrzasxdycfuvgibvfcydtxsrzasxdycfuvgb')
            res.render("library/show.ejs", { artwork, currentUser})
            // res.send('hello')
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
})

// GET - SHOW EDIT PAGE
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

// DELETE - DELETE REQUEST FROM SHOW PAGE
router.delete("/:artworkId", async (req, res) => { 
    try {
        const artwork = await Artworks.findById(req.params.artworkId);

        if (artwork.owner.toString() == req.session.user._id) {
            await Artworks.findByIdAndDelete(req.params.artworkId);
            res.redirect("/profile");
        } else {
            res.redirect("/");
        } 
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

// PUT - EDIT ARTWORKS PAGE
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

// POST - ADDING NEW ARTWORK 
router.post('/', async (req, res) => {
    try {
        const artData = {
            ...req.body,
            owner: req.session.user._id,
        }
        const artwork = new Artworks(artData);
        console.log(artwork)
        await artwork.save()

        res.redirect("/profile/")

    } catch(error) {
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router