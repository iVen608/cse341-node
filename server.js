const express = require("express");
const bodyParser= require('body-parser');
const app = express();
const session = require('express-session')
const destination = require("./routes/")
const mongodb = require('./db/connect.js');
const port = process.env.PORT || 3000;
const destination2 = require("./routes/town.js");
const passportSetup = require("./controllers/passport");
const passport = require("passport");

app.use(bodyParser.urlencoded({ extended: true }))
    .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  }).use(bodyParser.json())
  .use("/", destination2)
  .use(session({
    secret: 'testing',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
  }))
  .use(passport.session());

const callback = (error) => {
    if(error){
        console.log(`There was an error: ${error}`);
    } else {
        app.listen(port);
    }
}

mongodb.initDb(callback);