const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const {
  registrarUsuario,
  verificarCredenciales,
  obtenerUsuario,
} = require('./consultas.js');
const { verificacionToken } = require('./middlewares.js');

const puerto = 3000;
const urlBase = `http://localhost:${puerto}`;

app.listen(puerto, console.log(`Servidor iniciado en ${urlBase}`));
app.use(cors());
app.use(express.json());

app.post('/usuarios', async (req, res) => {
  try {
    const usuario = req.body;
    await registrarUsuario(usuario);
    res.send('Usuario creado');
  } catch (err) {
    console.error("Error al crear usuario en app.post('/usuarios')");
    res.status(500).send(err);
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await verificarCredenciales(email, password);

    if (!result.error) {
      const token = jwt.sign({ email }, 'llaveParaCifradoDePasswordconJWT');
      res.send(token);
    } else {
      res.status(400).send(result.msg);
    }
  } catch (err) {
    console.error("Error al validar usuario en app.post('/login')");
    res.status(500).send(err);
  }
});

app.get('/usuarios', verificacionToken, async (req, res) => {
  try {
    const Authorization = req.header('Authorization');
    const token = Authorization.split('Bearer ')[1];
    const { email } = jwt.decode(token, 'llaveParaCifradoDePasswordconJWT');
    const usuario = await obtenerUsuario(email);
    res.send(usuario);
  } catch (err) {
    res.status(err.code || 500).send(err);
  }
});
