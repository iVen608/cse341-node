const passport = require('passport');
const googleStrat = require('passport-google-oauth20');
const dotenv = require('dotenv');
dotenv.config();

passport.use(
    new googleStrat({
        callbackURL: 'https://cse341wintersword.onrender.com/google/redirect',
        //callbackURL: 'http://localhost:3000/google/redirect',
        scope: ['profile', 'email'],
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
    }, function(req, accToken, refToken, profile, done) {
            console.log(profile);
            done(null, profile);
      }));
      
      passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
      passport.deserializeUser(function(user, done) {
        done(null, user);
      });