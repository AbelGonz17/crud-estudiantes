const API = '/api/estudiantes';
const campos = ['matricula', 'nombre', 'apellido', 'email', 'carrera'];

const form = document.getElementById('formulario');
const tabla = document.getElementById('tabla');
const listaErrores = document.getElementById('errores');
const btnGuardar = document.getElementById('btnGuardar');
const btnCancelar = document.getElementById('btnCancelar');
const inputId = document.getElementById('id');

function escapar(texto) {
  const div = document.createElement('div');
  div.textContent = texto ?? '';
  return div.innerHTML;
}

async function cargar() {
  const res = await fetch(API);
  const estudiantes = await res.json();
  document.getElementById('vacio').hidden = estudiantes.length > 0;
  tabla.innerHTML = estudiantes.map(e => `
    <tr>
      <td>${escapar(e.matricula)}</td>
      <td>${escapar(e.nombre)} ${escapar(e.apellido)}</td>
      <td>${escapar(e.email)}</td>
      <td>${escapar(e.carrera)}</td>
      <td class="botones">
        <button data-editar="${e.id}" class="secundario">Editar</button>
        <button data-eliminar="${e.id}" class="peligro">Eliminar</button>
      </td>
    </tr>`).join('');
}

function mostrarErrores(errores = []) {
  listaErrores.innerHTML = errores.map(err => `<li>${escapar(err)}</li>`).join('');
}

function limpiar() {
  form.reset();
  inputId.value = '';
  btnGuardar.textContent = 'Agregar';
  btnCancelar.hidden = true;
  mostrarErrores();
}

form.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const datos = Object.fromEntries(campos.map(c => [c, document.getElementById(c).value]));
  const id = inputId.value;

  const res = await fetch(id ? `${API}/${id}` : API, {
    method: id ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });

  if (!res.ok) {
    const cuerpo = await res.json();
    mostrarErrores(cuerpo.errores || [cuerpo.error]);
    return;
  }

  limpiar();
  cargar();
});

btnCancelar.addEventListener('click', limpiar);

tabla.addEventListener('click', async (evento) => {
  const idEditar = evento.target.dataset.editar;
  const idEliminar = evento.target.dataset.eliminar;

  if (idEditar) {
    const res = await fetch(`${API}/${idEditar}`);
    const estudiante = await res.json();
    campos.forEach(c => { document.getElementById(c).value = estudiante[c]; });
    inputId.value = estudiante.id;
    btnGuardar.textContent = 'Guardar cambios';
    btnCancelar.hidden = false;
    mostrarErrores();
  }

  if (idEliminar && confirm('¿Eliminar este estudiante?')) {
    await fetch(`${API}/${idEliminar}`, { method: 'DELETE' });
    cargar();
  }
});

cargar();
