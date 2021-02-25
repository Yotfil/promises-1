/* eslint-disable prefer-destructuring */
import elementosDOM from './DOM';
import state from './state';

export function compareAnswer(respuestaUsuario) {
    console.log(respuestaUsuario, 'esta es la respuestaUser');
    console.log(state.preguntaActual.answer, 'Esta es la respuesta correcta');
    console.log(elementosDOM.puntaje, 'este es puntaje');

    // Tomar el contador + 1

    if (
        respuestaUsuario.toLowerCase() ===
        state.preguntaActual.answer.toLowerCase()
    ) {
        state.puntaje += state.preguntaActual.value;
        elementosDOM.puntaje.innerText = state.puntaje;
        elementosDOM.correct.style.display = '';
    } else {
        elementosDOM.negative.style.display = '';
    }
}

export function mostrarPregunta(data) {
    state.preguntaActual = data[0];

    // Poner toda la info
    elementosDOM.pregunta.innerText = state.preguntaActual.question;
    elementosDOM.negative.innerText = `La respuesta correcta era "${state.preguntaActual.answer}"`;

    // Esconder las respuestas
    elementosDOM.negative.style.display = 'none';
    elementosDOM.correct.style.display = 'none';
}

export function traerPregunta() {
    console.log('traerPregunta');
    // Crear esta URL de forma dinamica
    // categoria = seleccionada en el HTML (select)
    fetch(
        `http://jservice.io/api/clues?category=${state.categoryID}&offset=${state.contador}`
    )
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

export function mostrarCategorias(info) {
    let options = '';
    for (const data of info) {
        options += `<option value="${data.id}">${data.title}</option>`;
    }
     state.categoryID = info[0].id;
    elementosDOM.category.innerHTML = options;
}

export function traerCategorias() {
    fetch('http://jservice.io/api/categories?count=10&offset=1')
        .then(function (response) {
            // if(response.ok){
            if (response.ok === true) {
                return response.json();
            }
        })
        .then(mostrarCategorias);

export function cambiarCategorias(dato) {
    state.categoryID = dato;
    state.contador = 0;

}

export function cambiarCategorias(dato) {
    state.categoryID = dato;
    state.contador = 0;
    console.log(state.categoryID, 'categoria id ');
    traerPregunta();
}
// GET ***
// https://www.udemy.com/course/typescript-2020/?fbclid=IwAR2qC2U-tr1o7NncQUVjO8s_JJIXI_VoylMaYuduBTykOzbpiFBUt8bK4iU&couponCode=CODIFICANDOLO02

// ? llave = valor & llave = valor & llave = valor

// ? count = 10 & offset = 1

// LLAVES Y VALORES
// {
//     fbclid: 'IwAR2qC2U-tr1o7NncQUVjO8s_JJIXI_VoylMaYuduBTykOzbpiFBUt8bK4iU',
//     couponCode: 'CODIFICANDOLO02'
// }

// -- INFO ADICIONAL
// POST *** acciones cambio (CREAR)
// PUT *** editar
// DELETE ***
