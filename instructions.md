`funciones.js`

1. Crea una función `mostrarCategorias`:

    - Esta función debe tomar `<select id="category">` (Agregado al DOM)
    - Crear una serie de `<option>` basado en la data que viene de `traerCategorias` (for of)

1. Usa la función `mostrarCategorias` en el ultimo `then` de `traerCategorias`, de forma que cuando lleguen las categorías crees las posibles opciones.

1. Crea una función `cambiarCategorias`

    - Esta debe actualizar una información global - Guarda el ID de la categoria
    - Re-inicia el contador en 0
    - _¿Donde guardarías esta información global?_

1. En `traerPregunta`, crea la URL de forma dinamica
    - URL + categorias + contador

---

`state.js`

1. Agrega la nueva información global que necesites

---

`DOM.js`

1. Agrega los nuevos elementos DOM que necesites

---

`main.js`

1. En la función que esta en el `submit`, aumenta el contaodr en 1.

1. Agrega un `addEventListener` al elemento `<select>` que llame a la función `cambiarCategoria`

1. Elimina el llamado a `traerPregunta`
