const passport = require('passport');
const googleStrat = require('passport-google-oauth20');
const dotenv = require('dotenv');
dotenv.config();

passport.use(
    new googleStrat({
        callbackURL: '/google/redirect',
        scope: ['profile', 'email'],
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
    }, () => {
    
    })
)