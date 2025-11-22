const registros = [];
let filaEditando = null;

function agregarRegistro() {
    const nombre = document.getElementById("idnombre").value;
    const correo = document.getElementById("correo").value;
    const edad = document.getElementById("edad").value;
    const aula = document.getElementById("Aula").value.toUpperCase();

    if (!["A", "B", "C"].includes(aula)) {
        alert("Solo se permite Aula A, B o C");
        return;
    }

    if (!nombre || !correo || !edad) {
        alert("Por favor completa todos los campos");
        return;
    }

    const nuevoRegistro = { nombre, correo, edad, aula };

    if (filaEditando !== null) {
        registros[filaEditando] = nuevoRegistro;
        filaEditando = null;
        document.getElementById("btnRegistrar").textContent = "Enviar";
    } else {
        registros.push(nuevoRegistro);
    }

    mostrarRegistro();
    contarPorAula();
    limpiarFormulario();
}


function contarPorAula() {
    const tabla = document.getElementById("tablaregistro").getElementsByTagName("tbody")[0];
    const conteo = { A: 0, B: 0, C: 0 };

    for (let i = 0; i < tabla.rows.length; i++) {
        const aula = tabla.rows[i].cells[3].innerText;
        if (conteo[aula] !== undefined) {
            conteo[aula]++;
        }
    }

    console.log("Cantidad por aula:", conteo);
    // También puedes mostrarlo en pantalla si quieres
    document.getElementById("conteoAulas").innerText =
        `A: ${conteo.A} | B: ${conteo.B} | C: ${conteo.C}`;
}


function mostrarRegistro() {
    const tbody = document.querySelector("#tablaregistro tbody");
    tbody.innerHTML = "";
    registros.forEach((p, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${p.nombre}</td>
            <td>${p.correo}</td>
            <td>${p.edad}</td>
            <td>${p.aula}</td>
            <td>
                <button class="btnEditar">Actualizar</button>
                <button class="btneliminar">Eliminar</button>
            </td>
        `;
        fila.querySelector(".btnEditar").addEventListener("click", () => iniciarEdicion(index, p));
        fila.querySelector(".btneliminar").addEventListener("click", () => eliminarRegistro(index));
        tbody.appendChild(fila);
    });
}

function iniciarEdicion(index, registro) {
    filaEditando = index;
    document.getElementById("idnombre").value = registro.nombre;
    document.getElementById("correo").value = registro.correo;
    document.getElementById("edad").value = registro.edad;
    document.getElementById("Aula").value = registro.aula;
    document.getElementById("btnRegistrar").textContent = "Actualizar";
}

function eliminarRegistro(index) {
    registros.splice(index, 1);
    mostrarRegistro();
}

function limpiarFormulario() {
    document.getElementById("idnombre").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("Aula").value = "";
}




