const red = document.querySelector(".red");
const orange = document.querySelector(".orange");
const green = document.querySelector(".green");

let intervalId;

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

