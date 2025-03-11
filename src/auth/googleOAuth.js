import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth2';
import dotenv from "dotenv"
import User from '../model/usersModel.js'
import {createGoogleUser, loginUser} from "../controller/userController.js"

dotenv.config({path: "dotenv.env"});


passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/callback',
        passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
        try {
            const user = await createGoogleUser(profile)
            return done(null, profile);
        } catch (err) {
            console.log(err);
        }
    }
));
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

export default passport;