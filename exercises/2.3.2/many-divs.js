const divList = document.querySelectorAll("div");

divList.forEach(div => div.addEventListener("click", onClickHandler));

function onClickHandler(e) {
    if(e.target.style.width !== "100px"){
        e.target.style.width = "100px";
        e.target.style.height = "100px";
        e.target.innerText = e.target.style.backgroundColor;
    } else {
        e.target.style.width = "50px";
        e.target.style.height = "50px";
        e.target.innerText = "";
    }
}

