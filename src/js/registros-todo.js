import { v4 as uuidv4 } from "uuid";

class Tarea {
  constructor(nombre, estado) {
    this.id = uuidv4(); // Genera un ID único para cada tarea
    this.nombre = nombre;
    this.estado = estado;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  cargarTareas();

  document.getElementById("frmprestamo").addEventListener("submit", function (event) {
    event.preventDefault();
    crearTarea(this);
  });
});

function crearTarea(form) {
  const nombre = form.tareaRealizar.value.trim();

  if (nombre === "") {
    alert("La tarea no puede estar vacía.");
    return;
  }
  const estado = "pendiente"

  const tarea = new Tarea(nombre , estado);
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  tareas.push(tarea);
  localStorage.setItem("tareas", JSON.stringify(tareas));

  mostrarTarea(tarea);
  form.reset();
}

function cargarTareas() {
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  const tbody = document.getElementById("infoPrestamo");
  tbody.innerHTML = "";

  tareas.forEach(tarea => {
    mostrarTarea(tarea);
  });
}

function mostrarTarea(tarea) {
  const tbody = document.getElementById("infoPrestamo");
  const fila = document.createElement("tr");

  fila.innerHTML = `
    <td>${tarea.nombre}</td>
    <td class="estado-tarea">${tarea.estado}</td>
    <td>
      ${tarea.estado === "pendiente"
        ? `<button class="btn btn-success btn-sm completar-btn" data-id="${tarea.id}">Completar</button>`
        : `<span class="text-success">Completada</span>`
      }
    </td>
  `;

  tbody.appendChild(fila);

  const btnCompletar = fila.querySelector(".completar-btn");
  if (btnCompletar) {
    btnCompletar.addEventListener("click", () => {
      completarTarea(tarea.id);
    });
  }

  const btnEliminar = fila.querySelector(".eliminar-btn");
  if (btnEliminar) {
    btnEliminar.addEventListener("click", () => {
      eliminarTarea(tarea.id);
    });
  }
}

function completarTarea(idTarea) {
  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  const tarea = tareas.find(t => t.id === idTarea);
  if (tarea) {
    tarea.estado = "completada";
  }

  localStorage.setItem("tareas", JSON.stringify(tareas));
  cargarTareas();
}

function eliminarTarea(idTarea) {
  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  tareas = tareas.filter(t => t.id !== idTarea); // Eliminamos por ID

  localStorage.setItem("tareas", JSON.stringify(tareas));
  cargarTareas();
}
