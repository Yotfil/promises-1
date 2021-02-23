/* eslint-disable prefer-destructuring */
let elementosDOM = {
    categoria: null,
    pregunta: null,
    form: null,
    respuesta: null,
    negative: null,
    respuestaCorrecta: null,
    positive: null,
    puntaje: null,
};

let preguntaActual = null;
let puntaje = 0;

function compareAnswer(respuestaUsuario) {
    console.log(respuestaUsuario, 'esta es la respuestaUser');
    console.log(preguntaActual.answer, 'Esta es la respuesta correcta');
    console.log(elementosDOM.puntaje, 'este es puntaje');

    if (
        respuestaUsuario.toLowerCase() === preguntaActual.answer.toLowerCase()
    ) {
        puntaje += preguntaActual.value;
        elementosDOM.puntaje.innerText = puntaje;
    }
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
    // elementosDOM.positive.style.display = 'none';
}

function traerPregunta() {
    console.log('traerPregunta');
    fetch('http://jservice.io/api/random')
        .then(function (response) {
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

window.addEventListener('DOMContentLoaded', function () {
    console.log('el DOM esta listo');

    for (const llave of Object.keys(elementosDOM)) {
        elementosDOM[llave] = document.getElementById(llave);
    }
    console.log(elementosDOM.form, 'este es el formulario');
    elementosDOM.form.addEventListener('submit', function (e) {
        e.preventDefault();
        let respuestaUsuario = elementosDOM.respuesta.value;
        elementosDOM.respuesta.value = '';
        compareAnswer(respuestaUsuario);
        setTimeout(traerPregunta, 3000);
    });
});

traerPregunta();
