const mongoose = require('mongoose')

const librarySchema = new mongoose.Schema({
    name: String,
    works: [ ], // artSchema goes in here
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})

const Library = mongoose.model("Library", librarySchema)

module.exports = Library;