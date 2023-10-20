const buttonDiv = document.querySelector("#buttonDiv")
const button = document.querySelector("#button")

const startButtonDiv = document.querySelector(".startButton")
const startButton = document.querySelector("#startButton")

const showEnd = document.querySelector("#showEnd")

let timeStarted
let timeFinish
let clicks = 0;
let timeout
const maxSec = 5
const maxMSec = maxSec * 1000

button.addEventListener("mouseover", hovering)
button.addEventListener("click", onClick)

startButton.addEventListener("click", startBack)

function hovering() {
    timeStarted = new Date().getTime()
    timeout = setTimeout(stopClicks, maxMSec)
}

function onClick() {
    clicks += 1
    if(clicks == 10) {
        clearTimeout(timeout)
        timeFinish = new Date().getTime()
        stopClicks()
    }
}

function stopClicks() {
    showEnd.style.display = "block"
    if(clicks < 10) {
        showEnd.innerText = "Game over, you did not click 10 times within 5s !"
    }
    else {
        showEnd.innerText = "You win ! You clicked 10 times within " + (timeFinish - timeStarted).toString()  + " ms"
    }
    buttonDiv.style.display = "none"
    startButtonDiv.style.display = "block"
}

function startBack() {
    clicks = 0
    startButtonDiv.style.display = "none"
    showEnd.style.display = "none"
    buttonDiv.style.display = "block"
}