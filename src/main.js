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
        if (elementosDOM.respuesta.value) {
            elementosDOM.send.classList.remove('disabled');
            let respuestaUsuario = elementosDOM.respuesta.value;
            elementosDOM.respuesta.value = '';
            compareAnswer(respuestaUsuario);
            setTimeout(traerPregunta, 3000);
            state.contador += 1;
            // cambiar el contador + 1
        } else {
            alert('escribe una respuesta');
        }

    });

    elementosDOM.category.addEventListener('change', function () {
        let value = elementosDOM.category.value;
        cambiarCategorias(value);
    });
    // addEventListener al select que llama traerPregunta y reinicia el contador
});

traerCategorias();
