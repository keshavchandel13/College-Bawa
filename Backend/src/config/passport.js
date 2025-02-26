require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback", 
},

async (accessToken, refreshToken, profile, cb) => {
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            user = new User({
                name: profile.displayName,
                email: profile.emails[0].value, 
                googleId: profile.id
            });

            await user.save(); // Save new user
        }

        cb(null, user); 
    } catch (err) {
        cb(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id); // Serialize only user ID
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
});

module.exports = passport;
