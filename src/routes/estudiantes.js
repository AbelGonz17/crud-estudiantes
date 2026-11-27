const express = require('express');
const store = require('../data/store');
const { validarEstudiante } = require('../validators/estudiante');

const router = express.Router();

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

  const nuevo = store.crear(datos);
  res.status(201).json(nuevo);
});

router.put('/:id', (req, res) => {
  const { datos, errores } = validarEstudiante(req.body);
  if (errores.length) return res.status(400).json({ errores });

  const actualizado = store.actualizar(Number(req.params.id), datos);
  if (!actualizado) return res.status(404).json({ error: 'Estudiante no encontrado' });
  res.json(actualizado);
});

router.delete('/:id', (req, res) => {
  const eliminado = store.eliminar(Number(req.params.id));
  if (!eliminado) return res.status(404).json({ error: 'Estudiante no encontrado' });
  res.status(204).end();
});

module.exports = router;
