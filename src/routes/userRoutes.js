import express from "express";
import {__dirname, path} from '../utils/utils.js'
import multer from "multer";
import passport from "../auth/googleOAuth.js";
import session from "express-session";
import {createUser, loginUser, getUserID, getUser} from "../controller/userController.js"
import {verifyToken} from "../auth/JWT.js";

const upload = multer({dest: 'assets/uploads'})

const userRouter = express.Router();

// Middleware Setup
userRouter.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
userRouter.use(passport.initialize());
userRouter.use(passport.session());


userRouter.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/html/register.html'));
})

userRouter.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/html/login.html'));
})
userRouter.post('/register', createUser)


userRouter.post("/login", loginUser)

userRouter.get('/request/user-id', verifyToken, getUserID)
userRouter.get('/request/user', verifyToken, getUser)


userRouter.get('/auth/google',
    passport.authenticate('google', {scope: ['profile', 'email']})
);

userRouter.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: "/levels",
    failureRedirect: "/register"
}))

userRouter.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy()
    res.redirect("/login");
})

function isLoggedIn(req, res, next) {
    req.user ? next() : res.status(401).send("Not logged in");
}

export default userRouter;
