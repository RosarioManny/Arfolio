const mongoose = require('mongoose')

const librarySchema = new mongoose.Schema({
    name: String,
    works: [{type: mongoose.Schema.Types.ObjectId, ref: "Artwork"}], // artSchema goes in here
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})

const Library = mongoose.model("Library", librarySchema)

module.exports = Library;