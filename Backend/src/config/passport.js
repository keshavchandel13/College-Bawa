require('dotenv').config();
const User = require('../models/User');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:"http://localhost:500/auth/google/callback",
},

async(accessToken, refreshToken, profile, cb)=>{
   let user = await User.findOne({googleId: profile.id});
   if(!user){
    user = new User({name:profile.displayName, email:profile.email[0].value, googleId:profile.id});
   } 
   done(null, user);
}
));

passport.serializeUser((user, done)=>{
    done(null,user);
});
passport.deserializeUser((id, done) => User.findById(id, (err, user)=> done(null,user)));