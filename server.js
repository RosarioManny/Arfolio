const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require('morgan');
const session = require("express-session");

const authRoutes = require('./routers/auth/auth.js')

const passUserToView = require("./middleware/pass-user-to-view.js");

const profileRoutes = require('./routers/profile.js')
const libraryRoutes = require('./routers/library.js')

const port = process.env.PORT ? process.env.PORT : '3000'; 

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Conneceted to MongoDB ${mongoose.connection.name}.`)
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(
    session ({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passUserToView);

app.get('/', (req, res) => { // HOME PAGE 
    res.render("index.ejs")
});

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes) // PROFILE ROUTES
app.use('/library', libraryRoutes)

app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`)
});