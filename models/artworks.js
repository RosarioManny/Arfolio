const mongoose = require('mongoose')

const artworkSchema = new mongoose.Schema({
    artwork: { type: String, required: true },
    title: { type: String, required: true },
    date: Date,
    medium: { type: String, required: true },
    size: String,
    description: String,
    genre: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Artworks = mongoose.model("Artwork", artworkSchema)

module.exports = Artworks;