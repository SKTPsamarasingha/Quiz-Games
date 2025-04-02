import {__dirname, path} from "../utils/utils.js";
import Score from "../model/scoreModel.js";
import {getUserID} from "./userController.js";

const startGame = async (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/html/gamePage.html'));
}

const saveScore = async (req, res) => {
    try {
        const {userid, level, points} = req.body;

        const score = await Score.create({userid, level, points});
        res.status(201).json({message: "Score saved successfully", score});

    } catch (err) {
        res.status(500).send({message: "Error saving score", err});

        console.log(err)
    }

}

export {
    startGame,
    saveScore
};