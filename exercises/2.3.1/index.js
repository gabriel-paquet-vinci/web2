const souhait = document.querySelector("#souhait");
const divForm = document.querySelector("#divForm");
const divSouhait = document.querySelector("#divSouhait");
const newButton = document.querySelector("#comeback");
const onSubmit = (e) => {

    e.preventDefault();

    divForm.style.display = "none";
    divSouhait.innerText = souhait.value;

    newButton.display.display = "flex";
};

form.addEventListener("submit", onSubmit);


