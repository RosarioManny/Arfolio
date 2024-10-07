const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    name: { type:String, required: true },
    mainMedium: { type:String, required: true },
    website: String,
    contacts: String
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    image: String,
    about: [aboutSchema],
    library: {type: mongoose.Schema.Types.ObjectId, ref: "Library" },
});


const User = mongoose.model('User', userSchema);

module.exports = User