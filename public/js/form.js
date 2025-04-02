const allInputs = document.querySelectorAll('input');

allInputs.forEach(input => {
    input.addEventListener('event', (event) => {
        alert(event);
    })
})