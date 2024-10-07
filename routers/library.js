const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Library = require('../models/library.js');
const Artworks = require('../models/artworks.js');

router.get('/', async (req, res) => {
    res.render('library/index.ejs'); 
})



module.exports = router