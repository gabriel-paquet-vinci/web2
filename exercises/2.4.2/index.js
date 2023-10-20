const red = document.querySelector(".red");
const orange = document.querySelector(".orange");
const green = document.querySelector(".green");

const stopButtonDiv = document.querySelector(".stopButton");
const stopButton = document.querySelector("#stopButton");

const startButtonDiv = document.querySelector(".startButton");
const startButton = document.querySelector("#startButton");

let intervalId;
let previous;

stopButton.addEventListener("click", stopFireLight);
startButton.addEventListener("click", startFireLight);

startClock();

function startClock() {
    intervalId = setInterval(goNext, 2000);
}

function goNext() {
    if(red.style.backgroundColor === "red") {
        previous = "red";
        red.style.backgroundColor = "";
        orange.style.backgroundColor = "orange";
    } else if (orange.style.backgroundColor === "orange") {
        orange.style.backgroundColor = "";
        if(previous === "red") {
            green.style.backgroundColor = "green";
        } else {
            red.style.backgroundColor = "red";
        }
    } else {
        previous = "green";
        green.style.backgroundColor = "";
        orange.style.backgroundColor = "orange";
    }
}

function startFireLight() {
    startButtonDiv.style.display = "none";
    stopButtonDiv.style.display = "block";
    startClock();
}

function stopFireLight() {
    clearInterval(intervalId);
    stopButtonDiv.style.display = "none";
    startButtonDiv.style.display = "block";
}

