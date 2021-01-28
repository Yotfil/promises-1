/**
 * Función de inicio
 */
function mostrarMenuPrincipal() {
    let valuesObj = localStorage.getItem('lista2');
    let opcion = Number(
        prompt(`Escoge el número  dentro de la lista de opciones:
    1 - Ver Tareas 
    2 - Crear Tareas
    3 - Eliminar Tareas
    4 - Editar una Tarea
    5 - Completar Tareas `)
    );

    let opcionValidada = isNumber(opcion);

    if (opcionValidada) {
        switch (opcion) {
            case 1:
                menuMostrarTareas();
                break;
            case 2:
                crearTarea();
                break;
            case 3:
                menuEliminarTareas();
                break;
            case 4:
                editarTarea();
                break;
            case 5:
                editarTarea(true);
                break;
            default:
                break;
        }
    } else {
        mostrarMenuPrincipal();
    }
}

/**
 * Validación de numero
 */
function isNumber(entrada) {
    return typeof entrada === 'number' && !Number.isNaN(entrada);
}

/**
 * Validacion de cadena
 */
function isString(entrada) {
    return typeof entrada === 'string' && entrada !== '' && entrada !== null;
}

/**
 * Función de para obtener valores string
 */
function getValue(text, defecto = '') {
    let val = prompt('Ingrese el  ' + text + ' de la tarea', defecto);

    if (isString(val)) {
        return val;
    } else {
        getValue(text);
    }
}

/**
 * Función para obtener y validar Dates
 */
function getDate(text) {
    let val = prompt('Ingrese la  ' + text + ' de la tarea');

    if (isString(val)) {
        let exp = RegExp('([0-9]{2})-([0-9]{2})-([0-9]{4})$');
        if (exp.test(val)) {
            let lista = val.split('-');

            if (lista[2] >= 2021) {
                if (lista[1] >= 1 && lista[1] <= 12) {
                    if (
                        lista[0] < 32 &&
                        (lista[1] === '01' ||
                            lista[1] === '03' ||
                            lista[1] === '05' ||
                            lista[1] === '07' ||
                            lista[1] === '08' ||
                            lista[1] === '10' ||
                            lista[1] === '12')
                    ) {
                        return val;
                    } else if (
                        lista[0] < 31 &&
                        (lista[1] === '04' ||
                            lista[1] === '06' ||
                            lista[1] === '09' ||
                            lista[1] === '11')
                    ) {
                        return val;
                    } else if (lista[0] < 28 && lista[1] === '02') {
                        return val;
                    } else {
                        alert(
                            'Los días deben estar en el formato 01-31, Febrero hasta el día 28'
                        );
                        getDate(text);
                    }
                } else {
                    alert('Los meses deben estar en el formato 01-12');
                    getDate(text);
                }
            } else {
                alert('Los años deben ser mayores o iguales a 2021');
                getDate(text);
            }
        }
    } else {
        alert('Ingrese una fecha valida');
        getDate(text);
    }
}

/**
 * Ver toda las tareas guardadas
 */
function recolectarTareas(tipo) {
    const values = localStorage.getItem('lista2');
    let tareasString = '';

    if (values) {
        let newValues = JSON.parse(values);
        tareasString = stringGeneratorToDo(newValues, tipo);
    } else {
        tareasString = 'Aún no tiene tareas';
    }

    return tareasString;
}

/**
 * Organizar el resutado de la recolección en un string
 */
function stringGeneratorToDo(values, tipo) {
    let tareasString = '';
    for (let index = 0; index < values.length; index++) {
        const element = values[index];

        if (tipo !== Number(element.status)) {
            let status =
                Number(element.status) === 1 ? 'Completo' : 'Incompleto';

            tareasString =
                tareasString +
                `
              Tarea Id ${index}  - Titulo: ${element.titulo}  -Descripcion: ${
                    element.descripcion
                } -Fecha: ${element.fecha} -Estado: ${status}  ${handleDate(
                    element.fecha
                )}`;
        }
    }
    return tareasString;
}

/**
 * Obtener tareas por rango de fechas
 */
function dateRange() {
    const values = localStorage.getItem('lista2');
    let fecha1 = stringToDate(getDate('fecha en el formato DD-MM-YYYY'));
    let fecha2 = stringToDate(getDate('fecha en el formato DD-MM-YYYY'));
    let tareasString = '';

    if (values) {
        let newValues = JSON.parse(values);
        var date_tasks = newValues.filter(function (task) {
            let objectTask = Object.values(task);
            let fecha = stringToDate(objectTask[1]);
            return (
                fecha1.getTime() < fecha.getTime() &&
                fecha.getTime() < fecha2.getTime()
            );
        });

        for (const element of date_tasks) {
            tareasString =
                tareasString +
                `
              - Titulo: ${element.titulo}  - Descripcion: ${
                    element.descripcion
                } -Fecha: ${element.fecha} -Estado: ${status}  ${handleDate(
                    element.fecha
                )}`;
        }
    } else {
        tareasString = 'Aún no tiene tareas';
    }

    return tareasString;
}

/**
 * Obtener la especificacion de día - mes - año por separado
 */
function stringToDate(stringFecha) {
    const arrayFecha = stringFecha.split('-');
    let fechaDate = new Date(arrayFecha[2], arrayFecha[1] - 1, arrayFecha[0]);
    return fechaDate;
}

/**
 * Obtener string que explique la relación con la fecha
 */
function handleDate(stringFecha) {
    let hoy = new Date();
    let finalString = '';
    let fechaDate = stringToDate(stringFecha);
    let timeRemaining = Math.ceil(
        (fechaDate.getTime() - hoy.getTime()) / (60 * 60 * 24 * 1000)
    );

    if (Number(timeRemaining) === 0 || Number(timeRemaining) >= 2) {
        finalString = 'Faltan ' + timeRemaining + ' días';
    } else if (Number(timeRemaining) === 1) {
        finalString = 'Falta ' + timeRemaining + ' día';
    } else if (Number(timeRemaining) === -1) {
        finalString = 'Pasó hace ' + timeRemaining + ' día';
    } else {
        finalString = 'Pasó hace ' + timeRemaining * -1 + ' días';
    }
    return finalString;
}

/**
 * Menú  para la observación de tareas
 */
function menuMostrarTareas() {
    let menuMostrar = Number(
        prompt(`
    Elija una de las opciones de eliminacion
    1 - Mostrar todas las tareas
    2 - Mostrar todas las tareas Completadas
    3 - Mostrar todas las tareas Incompletas
    4 - Mostrar tareas por fecha`)
    );

    let opcMostrar = isNumber(menuMostrar);

    if (opcMostrar) {
        switch (menuMostrar) {
            case 1:
                alert(recolectarTareas(3));
                break;
            case 2:
                alert(recolectarTareas(0));
                break;
            case 3:
                alert(recolectarTareas(1));
                break;
            case 4:
                alert(dateRange());
                break;

            default:
                break;
        }
    } else {
        menuMostrarTareas();
    }

    mostrarMenuPrincipal();
}

/**
 * Creación de tarea
 */
function crearTarea() {
    let titulo = getValue('título');
    let descripcion = getValue('descripción');
    let fecha = getDate('fecha en el formato DD-MM-YYYY');
    let status = Number(getValue(' estado completado: 1, incompleto: 0'));
    let values = [];
    let newValues = [];

    let tarea = {
        titulo,
        fecha,
        descripcion,
        status,
    };

    values = localStorage.getItem('lista2');

    if (values) {
        newValues = JSON.parse(values);
    }
    newValues.push(tarea);
    localStorage.setItem('lista2', JSON.stringify(newValues));
}

/**
 * Menú para Eliminación de tareas
 */
function menuEliminarTareas() {
    let menuEliminar = Number(
        prompt(`
    Elija una de las opciones de eliminacion
    1 - Eliminar una tarea
    2 - Eliminar todas las tareas`)
    );

    let opcEliminar = isNumber(menuEliminar);

    if (opcEliminar) {
        switch (menuEliminar) {
            case 1:
                eliminaUnaTarea();
                break;
            case 2:
                eliminarTodasTareas();
                break;
            default:
                break;
        }
    } else {
        menuEliminarTareas();
    }
}

/**
 * ELiminación de una tarea
 */
function eliminaUnaTarea() {
    const tareasString = recolectarTareas();

    let idTarea = Number(
        prompt(`
    ${tareasString}
    Ingrese el id de la tarea que quiere eliminar`)
    );

    const values = localStorage.getItem('lista2');
    if (values) {
        let newValues = JSON.parse(values);
        newValues.splice(idTarea, 1);
        localStorage.setItem('lista2', JSON.stringify(newValues));
    }

    menuMostrarTareas();
}

/**
 * ELiminación de todas las tareas
 */
function eliminarTodasTareas() {
    const values = localStorage.getItem('lista2');
    if (values) {
        let newValues = [];
        localStorage.setItem('lista2', JSON.stringify(newValues));
    }

    menuMostrarTareas();
}

/**
 * Editar una tarea
 */

function editarTarea(completar = false) {
    const tareasString = recolectarTareas();

    let idTarea = Number(
        prompt(`
    ${tareasString}

    +++++++++**********************++++++++
    Ingrese el id de la tarea que quiere editar`)
    );

    const values = localStorage.getItem('lista2');
    if (values) {
        let newValues = JSON.parse(values);
        let objectValue = newValues[idTarea];

        let titulo = objectValue.titulo;
        let descripcion = completar
            ? objectValue.descripcion
            : getValue('descripción', objectValue.descripcion);
        let fecha = completar
            ? objectValue.fecha
            : getDate('fecha en el formato DD-MM-YYYY', objectValue.fecha);
        let status = completar
            ? getValue(
                  ' estado completado: 1, incompleto: 0',
                  objectValue.status
              )
            : objectValue.status;

        let tarea = {
            titulo,
            fecha,
            descripcion,
            status,
        };

        newValues[idTarea] = tarea;

        localStorage.setItem('lista2', JSON.stringify(newValues));
    }

    menuMostrarTareas();
}

mostrarMenuPrincipal();
