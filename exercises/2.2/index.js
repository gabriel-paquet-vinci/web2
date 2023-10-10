const body = document.querySelector("body");
const counter = document.querySelector("#counter");
const msg = document.querySelector("#message");
let clicks = 0;

body.addEventListener("click", onClickHandler);

function onClickHandler() {
    clicks += 1;
    counter.innerText = clicks;
    if(clicks >= 5 && clicks < 10) msg.innerText = "Bravo, bel échauffement !";
    else if(clicks >= 10) msg.innerText = "Vous êtes passé maître en l'art du clic !";
}