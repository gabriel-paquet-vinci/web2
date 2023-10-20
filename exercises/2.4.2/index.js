const red = document.querySelector(".red");
const orange = document.querySelector(".orange");
const green = document.querySelector(".green");

const stopButtonDiv = document.querySelector(".stopButton");
const stopButton = document.querySelector("#stopButton");

const startButtonDiv = document.querySelector(".startButton");
const startButton = document.querySelector("#startButton");

let intervalId;

stopButton.addEventListener("click", stopFireLight);
startButton.addEventListener("click", startFireLight);

startClock();

function startClock() {
    intervalId = setInterval(goNext, 2000);
}

function goNext() {
    console.log("Red : " + red.style.backgroundColor + " Orange : " + orange.style.backgroundColor + " Green : " + green.style.backgroundColor);
    if(red.style.backgroundColor === "red") {
        red.style.backgroundColor = "";
        orange.style.backgroundColor = "orange";
    } else if (orange.style.backgroundColor === "orange") {
        orange.style.backgroundColor = "";
        green.style.backgroundColor = "green";
    } else {
        green.style.backgroundColor = "";
        red.style.backgroundColor = "red";
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

