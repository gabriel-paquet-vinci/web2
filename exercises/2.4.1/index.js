const buttonDiv = document.querySelector("#buttonDiv")
const button = document.querySelector("#button")

let timeStarted
let timeFinish
let clicks = 0;
let timeout
const maxSec = 5
const maxMSec = maxSec * 1000

button.addEventListener("mouseover", hovering)
button.addEventListener("click", onClick)

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
    if(clicks < 10) buttonDiv.innerText = "Game over, you did not click 10 times within 5s !"
    else buttonDiv.innerText = "You win ! You clicked 10 times within " + (timeFinish - timeStarted).toString()  + " ms"
}