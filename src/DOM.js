const elementosDOM = {
    categoria: null,
    pregunta: null,
    form: null,
    respuesta: null,
    negative: null,
    respuestaCorrecta: null,
    positive: null,
    puntaje: null,
};

// Side effect
window.addEventListener('DOMContentLoaded', function () {
    console.log('el DOM esta listo');

    for (const llave of Object.keys(elementosDOM)) {
        elementosDOM[llave] = document.getElementById(llave);
    }
});

export default elementosDOM;
