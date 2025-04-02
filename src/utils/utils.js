import {fileURLToPath} from "url";
import {dirname} from "path";
import path from "path";
import axios from "axios";
import multer from "multer";
const upload = multer({ dest: 'uploads/' })


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getQuizImg = async () => {
    try {
        const url = 'http://marcconrad.com/uob/banana/api.php'
        const response = await axios.get(url);

        if (!response) {
            throw new Error(response.statusText);
        }
        return response.data;

    } catch (err) {
        console.log(err)
    }
}





export {
    __dirname,
    path,
    getQuizImg,
    upload
}

