const express = require('express');
const store = require('../data/store');
const { validarEstudiante } = require('../validators/estudiante');

const router = express.Router();

// Revisa que la matrícula y el correo no estén usados por otro estudiante.
function buscarDuplicado(datos, idActual = null) {
  return store.obtenerTodos().find(e =>
    e.id !== idActual &&
    (e.matricula === datos.matricula || e.email.toLowerCase() === datos.email)
  );
}

router.get('/', (req, res) => {
  res.json(store.obtenerTodos());
});

router.get('/:id', (req, res) => {
  const estudiante = store.obtenerPorId(Number(req.params.id));
  if (!estudiante) return res.status(404).json({ error: 'Estudiante no encontrado' });
  res.json(estudiante);
});

router.post('/', (req, res) => {
  const { datos, errores } = validarEstudiante(req.body);
  if (errores.length) return res.status(400).json({ errores });

  if (buscarDuplicado(datos)) {
    return res.status(409).json({ error: 'Ya existe un estudiante con esa matrícula o correo' });
  }

  const nuevo = store.crear(datos);
  res.status(201).json(nuevo);
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { datos, errores } = validarEstudiante(req.body);
  if (errores.length) return res.status(400).json({ errores });

  if (buscarDuplicado(datos, id)) {
    return res.status(409).json({ error: 'Ya existe un estudiante con esa matrícula o correo' });
  }

  const actualizado = store.actualizar(id, datos);
  if (!actualizado) return res.status(404).json({ error: 'Estudiante no encontrado' });
  res.json(actualizado);
});

router.delete('/:id', (req, res) => {
  const eliminado = store.eliminar(Number(req.params.id));
  if (!eliminado) return res.status(404).json({ error: 'Estudiante no encontrado' });
  res.status(204).end();
});

module.exports = router;
