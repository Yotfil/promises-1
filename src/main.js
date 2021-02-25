/* eslint-disable prefer-destructuring */
import elementosDOM from './DOM';
import {
    compareAnswer,
    traerPregunta,
    traerCategorias,
    cambiarCategorias,
} from './funciones';
import state from './state';

window.addEventListener('DOMContentLoaded', function () {
    console.log('el DOM esta listo');

    elementosDOM.form.addEventListener('submit', function (e) {
        e.preventDefault();
        let respuestaUsuario = elementosDOM.respuesta.value;
        elementosDOM.respuesta.value = '';
        compareAnswer(respuestaUsuario);
        setTimeout(traerPregunta, 3000);
        state.contador += 1;
        console.log(state.contador, 'contadorcito');
        // cambiar el contador + 1
    });

    elementosDOM.category.addEventListener('change', function () {
        let value = elementosDOM.category.value;
        cambiarCategorias(value);
    });
    // addEventListener al select que llama traerPregunta y reinicia el contador
});

traerCategorias();
