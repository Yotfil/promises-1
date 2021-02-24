/* eslint-disable prefer-destructuring */
import elementosDOM from './DOM';
import { compareAnswer, traerPregunta, traerCategorias } from './funciones';

window.addEventListener('DOMContentLoaded', function () {
    console.log('el DOM esta listo');

    elementosDOM.form.addEventListener('submit', function (e) {
        e.preventDefault();
        let respuestaUsuario = elementosDOM.respuesta.value;
        elementosDOM.respuesta.value = '';
        compareAnswer(respuestaUsuario);
        setTimeout(traerPregunta, 3000);
        // cambiar el contador + 1
    });

    // addEventListener al select que llama traerPregunta y reinicia el contador
});

traerPregunta();
traerCategorias();
