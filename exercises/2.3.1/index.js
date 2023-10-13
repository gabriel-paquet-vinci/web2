const souhait = document.querySelector("#souhait");
const divForm = document.querySelector("#divForm");
const divSouhait = document.querySelector("#divSouhait");
const onSubmit = (e) => {

    e.preventDefault();

    divForm.style.display = "none";
    divSouhait.innerText = souhait.value;
};

form.addEventListener("submit", onSubmit);


