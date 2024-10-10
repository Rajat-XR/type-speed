import { easy, med, hard, pro } from './words.js';
const display_word = document.querySelector("#word")
const user_input = document.querySelector("input")
// const result = document.querySelector("#result")
const timeleft = document.querySelector("#time")
const score = document.querySelector("#score")
const highscore = document.querySelector("#highscore")
const history = document.querySelector("#history")
const root = document.querySelector(":root")
const themebtn = document.querySelectorAll(".themebtn")
const trybtn = document.querySelector("#trybtn")
const level = document.querySelector("select")
const settingbtn = document.querySelector("#settingbtn")
const applybtn = document.querySelector("#applybtn")
const settings_dialog = document.querySelector(".settings_dialog")
const gameover_result = document.querySelector(".gameover_result")
const gameover_display = document.querySelector("#gameover")
// const gameover_score = document.querySelector("#")
// const gameover_high_score = document.querySelector("#")
const min = 0
let max = 3061
let words = []
let time = 6
let user_score = 0
let flag = 0
let flagg = 0
let random
let arr = []

document.addEventListener("DOMContentLoaded", () => {

    level.onchange = function () {
        if (this.value == "easy") {
            words.length = 0
            max = 3061
            random = Math.floor(Math.random() * (max - min + 1) + min);
            words.push(...easy)
            console.log(words.length)
            display_word.innerHTML = words[random]
        }

        if (this.value == "medium") {
            words.length = 0
            max = 312
            random = Math.floor(Math.random() * (max - min + 1) + min);
            words.push(...med)
            console.log(words.length)
            display_word.innerHTML = words[random]
        }

        if (this.value == "hard") {
            words.length = 0
            max = 340
            random = Math.floor(Math.random() * (max - min + 1) + min);
            words.push(...hard)
            console.log(words.length)
            display_word.innerHTML = words[random]
        }
        if (this.value == "pro") {
            words.length = 0
            max = 92
            random = Math.floor(Math.random() * (max - min + 1) + min);
            words.push(...pro)
            console.log(words.length)
            display_word.innerHTML = words[random]
        }
    }

    settingbtn.onclick = () => {
        settings_dialog.showModal()
        settingbtn.innerHTML = "Waiting for User..."
    }
    applybtn.onclick = () => {
        settings_dialog.close()
        settingbtn.innerHTML = "Game Settings"
    }
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
    words.push(...easy)
    display_word.innerHTML = words[random]

    trybtn.onclick = () => {
        time = 6
        gameover_display.close()
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
            let a = setInterval(() => {
                if (time === 0) {
                    gameover_result.showModal()
                    // gameover_result.style.display = "block"
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
            time = 6
        }
        else {
            score.style.color = "red"
            score.style.transform = "scale(1)"
        }
    }
})
