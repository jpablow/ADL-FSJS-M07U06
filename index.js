const express = require('express');
const app = express();
const cors = require('cors');
const { registrarUsuario } = require('./consultas.js');

const puerto = 3000;
const urlBase = `http://localhost:${puerto}`;

app.listen(puerto, console.log(`Servidor iniciado en ${urlBase}`));
app.use(cors());
app.use(express.json());

// Creación del usuario

app.post('/usuarios', async (req, res) => {
  try {
    const usuario = req.body;
    await registrarUsuario(usuario);
    res.status(200).send('Usuario creado');
  } catch (err) {
    console.error("Error al crear usuario en app.post('/usuarios'");
    res.status(500).send(err);
  }
});

// Inicio de sesión
