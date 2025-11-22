let registros = JSON.parse(localStorage.getItem("registros")) || [];
let indiceEdicion = null;

function agregarRegistro() {
    const nombre = document.getElementById("idnombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const aula = document.getElementById("Aula").value.trim();

    if (!nombre || !correo || !edad || !aula) {
        alert("Completa todos los campos.");
        return;
    }

    if (indiceEdicion !== null) {
        registros[indiceEdicion] = { nombre, correo, edad, aula };
        indiceEdicion = null;
        document.getElementById("btnRegistrar").textContent = "Agregar";
    } else {
        registros.push({ nombre, correo, edad, aula });
    }

    localStorage.setItem("registros", JSON.stringify(registros));

    limpiarFormulario();
    mostrarRegistros();
    actualizarMenu();
}

function mostrarRegistros() {
    const tbody = document.querySelector("#tablaregistro tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    registros.forEach((r, index) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${r.nombre}</td>
            <td>${r.correo}</td>
            <td>${r.edad}</td>
            <td>${r.aula}</td>
            <td>
                <button onclick="editarRegistro(${index})">Editar</button>
                <button onclick="eliminarRegistro(${index})" style="background:red">Eliminar</button>
            </td>
        `;

        tbody.appendChild(fila);
    });
}

function actualizarMenu() {
    const lista = document.getElementById("listaEstudiantes");
    if (!lista) return;

    lista.innerHTML = "";

    registros.forEach(r => {
        const li = document.createElement("li");
        li.textContent = `${r.nombre} - ${r.aula}`;
        lista.appendChild(li);
    });
}

function eliminarRegistro(index) {
    if (confirm("¿Seguro que deseas eliminar este estudiante?")) {
        registros.splice(index, 1);
        localStorage.setItem("registros", JSON.stringify(registros));
        mostrarRegistros();
        actualizarMenu();
    }
}

function editarRegistro(index) {
    const registro = registros[index];

    document.getElementById("idnombre").value = registro.nombre;
    document.getElementById("correo").value = registro.correo;
    document.getElementById("edad").value = registro.edad;
    document.getElementById("Aula").value = registro.aula;

    indiceEdicion = index;
    document.getElementById("btnRegistrar").textContent = "Guardar Cambios";
}

function limpiarFormulario() {
    document.getElementById("idnombre").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("Aula").value = "";
}

function guardarRegistros() {
    localStorage.setItem("registros", JSON.stringify(registros));
}

window.addEventListener("beforeunload", function () {
    // Save records just before the page unloads to ensure persistence
    guardarRegistros();
});

document.addEventListener("DOMContentLoaded", () => {
    registros = JSON.parse(localStorage.getItem("registros")) || [];
    mostrarRegistros();
    actualizarMenu();
    document.getElementById("btnRegistrar").textContent = "Agregar";
});
