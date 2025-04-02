import express from "express";
import {__dirname, path, getQuizImg} from '../utils/utils.js'
import {startGame, saveScore} from "../controller/gameController.js";
import {createUser} from "../controller/userController.js";
import jwt from "jsonwebtoken";
import {verifyToken} from "../auth/JWT.js";

const gameRouter = express.Router();


gameRouter.get('/game', verifyToken, startGame)


gameRouter.get('/levels', verifyToken, (req, res) => {

    res.sendFile(path.join(__dirname, '../../public/html/levels.html'));
});

gameRouter.post('/game/saves-score', saveScore)

gameRouter.get('/api/banana/getData', async (req, res) => {
    res.json(await getQuizImg());
})


export default gameRouter;
