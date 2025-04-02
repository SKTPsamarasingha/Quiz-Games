import {getGameData, getData, saveScore} from './helper.js';


document.addEventListener('DOMContentLoaded', async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    selectedLevel = urlParams.get('difficulty').toLocaleLowerCase();
    difficulty = difficulty.filter(arr => arr.level.toLocaleLowerCase() === selectedLevel.toLocaleLowerCase())[0]

    userID = await getData('/request/user-id')
    userID = userID.userid;
    startGame()

});


const img = document.querySelector('#puzzleImage');
const model = document.querySelector('.model');
const modelP = model.querySelector('p')
const modelCloseBtn = document.querySelector('.model-closeBtn');
const input = document.getElementById('answerInput')
const submitBtn = document.getElementById('submitBtn')
const selectWrapper = document.querySelector('.select-wrapper');
const inputWrapper = document.querySelector('.input-wrapper');
const children = selectWrapper.querySelectorAll('.answer')

let chances = 4;
let solution, isCorrect, timeOut, interval, selectedLevel, userID;
let difficulty = [
    {
        level: "easy",
        time: 7,
        btnCount: 5,
        chances: 4,
        points: 10
    },
    {
        level: "medium",
        time: 5,
        btnCount: 8,
        chances: 3,
        points: 15

    },
    {
        level: "hard",
        time: 5,
        chances: 3,
        points: 20

    }

]
let score = {}

const showModel = (msg) => {
    modelP.textContent = msg
    model.classList.add('show-model');
}

const closeModel = () => {
    model.classList.remove('show-model')
    input.value = '';

    if (chances === 0) {
        chances = 4
        startGame()
    }
    if (isCorrect) {
        startGame()
    }
    if (timeOut) {
        startGame()
    }
}
const startGame = async () => {

    score = {
        userid: userID,
        level: selectedLevel,
        points: difficulty.points,
    }

    const data = await getGameData()
    img.src = data.question
    solution = data.solution
    console.log(solution)
    children.forEach(child => {
        child.textContent = "";
    })


    if (difficulty.level.toLocaleLowerCase() === 'hard') {
        inputWrapper.classList.remove('hide-answer')
    } else {
        selectWrapper.classList.remove('hide-answer')
    }
    setAnswers(difficulty.btnCount)
    countDown(difficulty.time)
}
const setAnswers = (btnCount) => {
    let count = 0
    const numArr = getRandomNums(btnCount)
    selectWrapper.innerHTML = '';
    while (btnCount > 0) {
        let btn = document.createElement('button');
        btn.classList.add("answer");
        btn.textContent = numArr[count]

        btn.addEventListener('click', (e) => {
            checkAnswer(e.target.textContent)
        })
        selectWrapper.appendChild(btn);
        btnCount--;
        count++;
    }
}
const getRandomNums = (count) => {
    let randomIndex = Math.floor(Math.random() * count)
    let set = new Set();
    set.add(solution)
    while (set.size < count) {
        let randomNum = Math.floor(Math.random() * count);
        if (!set.has(randomNum) && randomNum !== solution) {
            set.add(randomNum);
        }
    }
    let arr = Array.from(set);
    let temp = arr[randomIndex]
    arr[randomIndex] = solution
    arr[0] = temp
    return arr
}


const checkAnswer = async (answer) => {

    let msg;
    let userAnswer = !isNaN(parseInt(answer)) ? parseInt(answer) : null;
    msg = userAnswer !== null ? "" : 'Please enter a valid answer!';
    if (userAnswer !== null) {
        isCorrect = solution === userAnswer;
        chances = !isCorrect ? chances - 1 : 4;
        msg = isCorrect ? "Good job! you got it Correctly!" : `Oops! Wrong answer you have ${chances} more chances`
        msg = chances === 0 ? "Looks like you are out of chance good luck on next one" : msg
    }
    if (isCorrect) {
        saveScore(score)
    }

    showModel(msg, isCorrect)
}

const countDown = (duration) => {
    if (interval) {
        clearInterval(interval);
    }
    let timer = duration * 60, minutes, seconds;
    interval = setInterval(() => {
        minutes = parseInt(timer / 60);
        seconds = parseInt(timer % 60);


        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.querySelector('.time').textContent = minutes + ":" + seconds
        if (--timer < 0) {
            showModel("Oops! you ran out of time out")
            timeOut = true
        }
    }, 1000);
}


submitBtn.addEventListener('click', () => {
    checkAnswer(input.value)
})

modelCloseBtn.addEventListener('click', closeModel)