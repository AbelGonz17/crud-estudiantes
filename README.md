# CRUD de Estudiantes

Proyecto de la Tarea 3 de Programación III (ITLA): un CRUD de estudiantes hecho con Node.js y Express, trabajado con Git Flow.

## Cómo ejecutarlo

```bash
npm install
npm start
```

Luego abre http://localhost:3000

## Funcionalidades

- Listar, agregar, editar y eliminar estudiantes desde la página web.
- API REST en `/api/estudiantes` (GET, POST, PUT, DELETE).
- Validación de matrícula (formato AAAA-NNNN), nombre, apellido, correo y carrera.
- No permite registrar dos estudiantes con la misma matrícula o el mismo correo.
- Los datos se guardan en `data/estudiantes.json`.

## Ramas y flujo de trabajo

Ramas principales: `main` (producción), `qa` (pruebas) y `dev` (desarrollo).

| Rama | Qué agrega |
|------|-----------|
| `feature/modelo-estudiantes` | Almacenamiento en JSON y datos de ejemplo |
| `feature/api-crud-estudiantes` | Endpoints REST del CRUD |
| `feature/validar-datos-estudiante` | Validación de los datos de entrada |
| `feature/interfaz-web` | Página web para gestionar estudiantes |
| `hotfix/evitar-duplicados` | Corrige que se pudieran repetir matrícula o correo |

Cada rama se integró con un Pull Request hacia `dev`, otro hacia `qa` y otro hacia `main`.
