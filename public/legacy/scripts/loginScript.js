const inputs = [...document.getElementsByClassName("input-field")];

inputs.forEach(input => {
    input.addEventListener('focus', event => {
        input.parentElement.style.borderBottom = '3px solid yellow';
    });

    input.addEventListener('focusout', event => {
        input.parentElement.style.borderBottom = 'none';
    });
})