import { easy, med, hard, pro } from './words.js';
const display_word = document.querySelector("#word")
const user_input = document.querySelector("input")
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
const result = document.querySelector(".gameover_result")

const gameover_display = document.querySelector("#gameover_display")
const gameover_score = document.querySelector("#gameover_score")
const gameover_high = document.querySelector("#gameover_high")

const min = 0
let max = 3061
let words = []
let time = 6
let user_score = 0
let flag = 0
let random
let arr = []

document.addEventListener("DOMContentLoaded", () => {
    settings_dialog.showModal()
    random = Math.floor(Math.random() * (max - min + 1) + min);
    words.push(...easy)
    display_word.innerHTML = words[random]

    level.onchange = function () {
        if (this.value == "Easy Mode") {
            words.length = 0
            max = 3061
            random = Math.floor(Math.random() * (max - min + 1) + min);
            words.push(...easy)
            console.log(words.length)
            display_word.innerHTML = words[random]
        }

        if (this.value == "Medium Mode") {
            words.length = 0
            max = 312
            random = Math.floor(Math.random() * (max - min + 1) + min);
            words.push(...med)
            console.log(words.length)
            display_word.innerHTML = words[random]
        }

        if (this.value == "Hard Mode") {
            words.length = 0
            max = 340
            random = Math.floor(Math.random() * (max - min + 1) + min);
            words.push(...hard)
            console.log(words.length)
            display_word.innerHTML = words[random]
        }
        if (this.value == "Pro Mode") {
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
        settingbtn.innerHTML = level.value
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

    trybtn.onclick = () => {
        time = 5
        user_score = 0;
        user_input.value = ""
        flag = 0
        score.innerHTML = `Score: ${user_score}`
        score.style.color = "black"
        timeleft.innerHTML = `Time: 5 seconds`
        random = Math.floor(Math.random() * (max - min + 1) + min);
        display_word.innerHTML = words[random]
        settingbtn.disabled = false
        settingbtn.style.opacity = "1"
        settingbtn.innerHTML = "Difficulty & Theme Settings"
        result.close()
    }
    user_input.onkeyup = () => {
        settingbtn.disabled = true
        settingbtn.style.opacity = "0.8"
        settingbtn.innerHTML = level.value
        if (flag == 0) {
            let a = setInterval(() => {
                if (time === 0) {
                    if (user_score > localStorage.getItem("high")) {
                        localStorage.setItem("high", user_score)
                        gameover_display.innerHTML = `GAME OVER [🔥 NEW HIGH SCORE 🔥]`
                        highscore.innerHTML = `High Score: ${localStorage.getItem("high")}`
                    }
                    else {
                        gameover_display.innerHTML = "GAME OVER"
                    }
                    gameover_score.innerHTML = `Score: ${user_score} (in ${level.value})`
                    gameover_high.innerHTML = `High Score: ${localStorage.getItem("high")}`
                    result.showModal()
                    clearInterval(a);
                    arr.push(user_score)
                    history.innerHTML = `Past Scores: ${arr}`;
                    history.style.display = "block"
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
