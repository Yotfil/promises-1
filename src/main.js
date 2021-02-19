/* eslint-disable prefer-destructuring */
let elementosDOM = {
    categoria: null,
    pregunta: null,
    form: null,
    respuesta: null,
    negative: null,
    respuestaCorrecta: null,
    positive: null,
};

let preguntaActual = null;
let puntaje = 0;

window.addEventListener('DOMContentLoaded', function() {
    console.log('el DOM esta listo');

    for (const llave of Object.keys(elementosDOM)) {
        elementosDOM[llave] = document.getElementById(llave);
    }

    /*
    Aqui debemos agregar los event listener del formulario
    elementosDOM.form.addEve...
    */
});

function compareAnswer() {
    // comprara lo que hay en el input (elementosDOM.respuesta) con preguntaActual.answer
    // ...
    // Muestra negative o positive
    // ...
    // Agrega el preguntaActual.difficulty al puntaje y muestralo
    // ...
    // Despues de X segundos, llama de nuevo a traerPregunta
}

function mostrarPregunta(data) {
    preguntaActual = data[0];
    console.log(preguntaActual);

    // Poner toda la info
    elementosDOM.pregunta.innerText = preguntaActual.question;
    elementosDOM.categoria.innerText = preguntaActual.category.title;
    elementosDOM.negative.innerText = `La respuesta correcta era "${preguntaActual.answer}"`;

    // Esconder las respuestas
    elementosDOM.negative.style.display = 'none';
    elementosDOM.positive.style.display = 'none';
}

function traerPregunta() {
    console.log('traerPregunta');
    fetch('http://jservice.io/api/random')
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(mostrarPregunta);
    // Es igual que
    // .then(function(data){
    //     mostrarPregunta(data)
    // });
}

traerPregunta();
