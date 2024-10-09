import words from './words.js';

const display_word = document.querySelector("#word")
const user_input = document.querySelector("input")
const result = document.querySelector("#result")
const timeleft = document.querySelector("#time")
const score = document.querySelector("#score")
const highscore = document.querySelector("#highscore")
const history = document.querySelector("#history")
const root = document.querySelector(":root")
const themebtn = document.querySelectorAll(".themebtn")
const gamebtn = document.querySelector("#gamebtn")
const min = 0
const max = 561
let time = 6
let user_score = 0
let flag = 0
let flagg = 0
let random
let arr = []


document.addEventListener("DOMContentLoaded", () => {

    // if (localStorage.getItem("theme") != null) {
    //     for (let i = 0; i <= 3; i++) {
    //         if (localStorage.getItem("theme") == themebtn[i].dataset.theme) {
    //             root.style.setProperty('--bg-color', themebtn[i].dataset.bgcolor)
    //             root.style.setProperty('--color', themebtn[i].dataset.color)
    //         }
    //     }
    // }
    // else {
    //     root.style.setProperty('--bg-color', themebtn[0].dataset.bgcolor)
    //     root.style.setProperty('--color', themebtn[0].dataset.color)
    // }
    // themebtn.forEach(button => {
    //     button.onclick = () => {
    //         root.style.setProperty('--bg-color', button.dataset.bgcolor)
    //         root.style.setProperty('--color', button.dataset.color)
    //         localStorage.setItem("theme", button.dataset.theme)
    //         button.style.backgroundColor = "white";
    //     }
    // })

    if (localStorage.getItem("high") != null) {
        highscore.innerHTML = `High Score: ${localStorage.getItem("high")}`
    }

    random = Math.floor(Math.random() * (max - min + 1) + min);
    display_word.innerHTML = words[random]

    gamebtn.onclick = () => {
        gamebtn.style.display = "none"
        user_input.disabled = false
        user_input.focus()
        random = Math.floor(Math.random() * (max - min + 1) + min);
        display_word.innerHTML = words[random]
        user_input.style.display = "block"
    }
    user_input.onkeyup = () => {
        if (flag == 0 || flagg == 1) {
            flagg = 0;
            result.innerHTML = ""
            let a = setInterval(() => {
                if (time === 0) {
                    result.innerHTML = `☠️Game Over☠️ [Your Score: ${user_score}]`
                    user_input.style.display = "none"
                    gamebtn.style.display = "block"
                    display_word.innerHTML = "GAME OVER"
                    user_input.value = ""
                    clearInterval(a);
                    time = 6;
                    flagg = 1;
                    if (user_score > localStorage.getItem("high")) {
                        localStorage.setItem("high", user_score)
                        result.innerHTML = `🔥Great Game🔥 [New HIGH Score: ${user_score} 💪]`
                        highscore.innerHTML = `High Score: ${localStorage.getItem("high")}`
                    }
                    arr.push(user_score)
                    history.innerHTML = `Past Scores: ${arr}`;
                    history.style.display = "block"
                    user_score = 0;
                    score.innerHTML = `Score: ${user_score}`
                }
                else {
                    time--;
                    timeleft.innerHTML = `Time: ${time} seconds`
                }
            }, 1000)
        }
        flag++

        if (user_input.value === words[random]) {
            random = Math.floor(Math.random() * (max - min + 1) + min);
            display_word.innerHTML = words[random]
            user_input.value = ""
            user_score++
            score.innerHTML = `Score: ${user_score}`
            score.style.color = "green"
            score.style.transform = "scale(1.1)"
            time = 6;
        }
        else {
            score.style.color = "red"
            score.style.transform = "scale(1)"
        }

        // setInterval(() => {
        //     flag++;
        //     console.log(flag)
        //     console.log(flagg)
        // }, 1000)

    }
})
