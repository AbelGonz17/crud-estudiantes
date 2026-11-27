const express = require('express');
const path = require('path');
const estudiantesRouter = require('./routes/estudiantes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/health', (req, res) => {
  res.json({ estado: 'ok' });
});

app.use('/api/estudiantes', estudiantesRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
