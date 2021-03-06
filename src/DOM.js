const elementosDOM = {
    pregunta: null,
    form: null,
    respuesta: null,
    negative: null,
    respuestaCorrecta: null,
    correct: null,
    puntaje: null,
    category: null,
    send: null,
};

let hola = 4;
console.log(hola);

// Side effect
window.addEventListener('DOMContentLoaded', function () {
    console.log('el DOM esta listo');

    for (const llave of Object.keys(elementosDOM)) {
        elementosDOM[llave] = document.getElementById(llave);
    }
});

export default elementosDOM;
