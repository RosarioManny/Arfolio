const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    name: String,
    mainMedium: String,
    website: String,
    contacts: String
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    image: String,
    aboutMe: aboutSchema,
    library: [{type: mongoose.Schema.Types.ObjectId, ref: "Artwork" }],
});

const User = mongoose.model('User', userSchema);

module.exports = User
