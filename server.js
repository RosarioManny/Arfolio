const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require('morgan');
const session = require("express-session");

const signInRoutes = require('./routers/auth/sign-in.js');
const signUpRoutes = require('./routers/auth/sign-up.js');
const signOutsession = require('./routers/auth/sign-out.js');
const passUserToView = require("./middleware/pass-user-to-view.js");

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
})

app.use('/sign-in', signInRoutes); // SIGN-IN ROUTES
app.use('/sign-up', signUpRoutes); // SIGN-UP ROUTES
app.use('/sign-out', signOutsession)





app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`)
})