const express = require('express');
const store = require('../data/store');

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
  const { matricula, nombre, apellido, email, carrera } = req.body;
  const nuevo = store.crear({ matricula, nombre, apellido, email, carrera });
  res.status(201).json(nuevo);
});

router.put('/:id', (req, res) => {
  const { matricula, nombre, apellido, email, carrera } = req.body;
  const actualizado = store.actualizar(Number(req.params.id), { matricula, nombre, apellido, email, carrera });
  if (!actualizado) return res.status(404).json({ error: 'Estudiante no encontrado' });
  res.json(actualizado);
});

router.delete('/:id', (req, res) => {
  const eliminado = store.eliminar(Number(req.params.id));
  if (!eliminado) return res.status(404).json({ error: 'Estudiante no encontrado' });
  res.status(204).end();
});

module.exports = router;
