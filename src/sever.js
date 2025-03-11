import express from "express";
import dotenv from "dotenv";
import gameRouter from "./routes/gameRoutes.js";
import {__dirname, path} from './utils/utils.js'
import bodyParser from "body-parser";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";


const app = express();
dotenv.config({path: "dotenv.env"});

app.use(express.static(path.join(__dirname, '../../public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use("/", gameRouter)
app.use("/", userRouter);


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
