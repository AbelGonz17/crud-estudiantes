const PATRON_MATRICULA = /^\d{4}-\d{4}$/;
const PATRON_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function texto(valor) {
  return typeof valor === 'string' ? valor.trim() : '';
}

function validarEstudiante(body) {
  const datos = {
    matricula: texto(body.matricula),
    nombre: texto(body.nombre),
    apellido: texto(body.apellido),
    email: texto(body.email).toLowerCase(),
    carrera: texto(body.carrera)
  };

  const errores = [];

  if (!PATRON_MATRICULA.test(datos.matricula)) {
    errores.push('La matrícula debe tener el formato AAAA-NNNN (ej. 2022-1328)');
  }
  if (datos.nombre.length < 2) errores.push('El nombre debe tener al menos 2 caracteres');
  if (datos.apellido.length < 2) errores.push('El apellido debe tener al menos 2 caracteres');
  if (!PATRON_EMAIL.test(datos.email)) errores.push('El correo no es válido');
  if (!datos.carrera) errores.push('La carrera es obligatoria');

  return { datos, errores };
}

module.exports = { validarEstudiante };
