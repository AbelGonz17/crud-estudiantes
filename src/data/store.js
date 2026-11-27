const fs = require('fs');
const path = require('path');

const ARCHIVO = path.join(__dirname, '..', '..', 'data', 'estudiantes.json');

function leer() {
  if (!fs.existsSync(ARCHIVO)) return [];
  const contenido = fs.readFileSync(ARCHIVO, 'utf-8');
  return contenido.trim() ? JSON.parse(contenido) : [];
}

function guardar(estudiantes) {
  fs.writeFileSync(ARCHIVO, JSON.stringify(estudiantes, null, 2));
}

function siguienteId(estudiantes) {
  return estudiantes.length ? Math.max(...estudiantes.map(e => e.id)) + 1 : 1;
}

module.exports = {
  obtenerTodos() {
    return leer();
  },

  obtenerPorId(id) {
    return leer().find(e => e.id === id) || null;
  },

  crear(datos) {
    const estudiantes = leer();
    const nuevo = { id: siguienteId(estudiantes), ...datos, creadoEn: new Date().toISOString() };
    estudiantes.push(nuevo);
    guardar(estudiantes);
    return nuevo;
  },

  actualizar(id, datos) {
    const estudiantes = leer();
    const i = estudiantes.findIndex(e => e.id === id);
    if (i === -1) return null;
    estudiantes[i] = { ...estudiantes[i], ...datos, id };
    guardar(estudiantes);
    return estudiantes[i];
  },

  eliminar(id) {
    const estudiantes = leer();
    const filtrados = estudiantes.filter(e => e.id !== id);
    if (filtrados.length === estudiantes.length) return false;
    guardar(filtrados);
    return true;
  }
};
