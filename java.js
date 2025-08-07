// Referencias a elementos HTML del input de tareas, botón para agregar y la lista donde se mostrarán
const input = document.getElementById("tareasinput");
const botonagregar = document.getElementById("agregado");
const list = document.getElementById("listatareas");

// Al cargar la página, se ejecuta la función cargarTareas para mostrar las tareas guardadas en localStorage
window.addEventListener("DOMContentLoaded", cargarTareas);

// Cuando se hace click en el botón de agregar tarea, se ejecuta la función agregarTarea
botonagregar.addEventListener("click", agregarTarea);

// Función que agrega una tarea nueva
function agregarTarea() {
    // Obtenemos el texto del input y le quitamos espacios al inicio y final
    const texto = input.value.trim();

    // Si el texto está vacío, mostramos una alerta y no continuamos
    if (texto === "") {
        alert("Por favor, ingresa una tarea.");
        return;
    }

    // Creamos un objeto para la nueva tarea con un id único (timestamp), el texto y completada en false
    const nuevatarea = {
        id: Date.now(),
        texto: texto,
        completada: false
    };

    // Obtenemos el array actual de tareas del localStorage
    const tareas = obtenerTareas();
    // Agregamos la nueva tarea al array
    tareas.push(nuevatarea);
    // Guardamos el array actualizado en localStorage
    guardarTareas(tareas);
    // Mostramos la nueva tarea en la lista de la página
    mostrarTareas(nuevatarea);

    // Limpiamos el input para poder ingresar otra tarea
    input.value = "";
}

// Función para mostrar una tarea en la lista de tareas
function mostrarTareas(tarea) {
    // Creamos un elemento <li> para la tarea
    const elemento = document.createElement("li");
    // Si la tarea está marcada como completada, le añadimos la clase "completada" para estilos
    if (tarea.completada) elemento.classList.add("completada");

    // Creamos un <span> para mostrar el texto de la tarea
    const textoSpan = document.createElement('span');
    textoSpan.textContent = tarea.texto;
    // Al hacer click en el texto, alternamos el estado completada de la tarea
    textoSpan.addEventListener('click', () => alternarTarea(tarea.id));

    // Creamos un botón para eliminar la tarea
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'X';
    // Al hacer click en el botón, se elimina la tarea correspondiente
    botonEliminar.addEventListener('click', () => eliminarTarea(tarea.id));

    // Añadimos el texto y el botón al elemento <li>
    elemento.appendChild(textoSpan);
    elemento.appendChild(botonEliminar);
    // Añadimos el <li> a la lista visible en la página
    list.appendChild(elemento);
}

// Función que carga todas las tareas guardadas en localStorage y las muestra en la lista
function cargarTareas() {
    // Obtenemos el array de tareas guardadas
    const tareas = obtenerTareas();
    // Por cada tarea, llamamos a mostrarTareas para ponerla en la lista
    tareas.forEach(mostrarTareas);
}

// Función para obtener el array de tareas guardadas en localStorage
function obtenerTareas() {
    // Intentamos obtener las tareas, si no hay nada guardado devolvemos un array vacío
    return JSON.parse(localStorage.getItem('tareas')) || [];
}

// Función para guardar el array de tareas en localStorage (como string JSON)
function guardarTareas(tareas) {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Función para alternar (marcar/desmarcar) el estado completada de una tarea por su id
function alternarTarea(id) {
    // Obtenemos las tareas actuales
    let tareas = obtenerTareas();
    // Creamos un nuevo array donde invertimos el valor completada de la tarea con el id dado
    tareas = tareas.map(tarea =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    );
    // Guardamos el array actualizado en localStorage
    guardarTareas(tareas);
    // Actualizamos la lista visible con los cambios
    actualizarLista();
}

// Función para eliminar una tarea por su id
function eliminarTarea(id) {
    // Obtenemos las tareas actuales
    let tareas = obtenerTareas();
    // Filtramos para quitar la tarea con el id dado
    tareas = tareas.filter(tarea => tarea.id !== id);
    // Guardamos el array actualizado
    guardarTareas(tareas);
    // Actualizamos la lista visible
    actualizarLista();
}

// Función para limpiar y recargar la lista de tareas en la página
function actualizarLista() {
    // Limpiamos todo el contenido de la lista
    list.innerHTML = '';
    // Recargamos las tareas desde localStorage para mostrar
    cargarTareas();
}