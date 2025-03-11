import User from '../model/usersModel.js';
import dotenv from "dotenv"
import jwt from "jsonwebtoken";
import multer from "multer";

dotenv.config({path: "dotenv.env"});
const upload = multer({dest: 'assets/uploads'})

const createUser = async (req, res) => {
    upload.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(400).send({message: "Error uploading image", error: err});
        }

        const {username, email, password} = req.body;
        const imagePath = req.file ? req.file.path : null;
        let userType = 'player';

        try {
            const user = await User.create({
                username,
                email,
                password,
                userType,
                imagePath,
            });

            res.status(201).json({message: "User registered successfully", user});
        } catch (err) {
            res.status(500).send({message: "Error registering user", err});
        }
    });
};

const createGoogleUser = async (profile) => {
    try {

        const userData = {
            username: profile.displayName,
            email: profile.emails[0].value,
            password: profile.id,
            userType: "player",
            imagePath: profile.photos[0].value
        };
        let user = await User.findOne({where: {email: userData.email}})
        if (!user) {
            user = await User.create({userData})
        } else {
            console.log(`user exists with email: ${userData.email}`);
        }
        return user
    } catch (err) {
        console.log(err)
        return `Error creating google user${err}`
    }
}

const loginUser = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({where: {username}})
    const isCorrect = await user.checkPassword(password)

    if (!user) {
        return res.status(401).json({message: "Invalid Username or password"});
    } else if (!isCorrect) {
        return res.status(401).json({message: "Invalid password"});
    } else {
        const token = jwt.sign({
            userid: user.userid,
            email: user.email,
        }, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 3600000
        });

        res.redirect("/levels")
    }
}


const getUserID = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) return res.status(401).json({message: "Unauthorized"});
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        res.json({userid: decoded.userid, email: decoded.email});
    } catch (error) {
        res.status(401).json({message: "Invalid Token"});
    }
}

const getUser = async (req, res) => {
    try {
        let userID = req.user ? req.user.userid : null;
        const user = await User.findOne({where: {userid: userID}})
        if (!user) return res.status(404).json({message: "User not found"});
        else return res.status(200).json({user});

    } catch (err) {
        console.log(err)
    }
}

export {
    createUser, loginUser, createGoogleUser, getUserID, getUser
};