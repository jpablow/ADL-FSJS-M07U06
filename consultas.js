const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'JPW',
  host: 'localhost',
  password: 'gogo2580',
  database: 'softjobs',
  port: 5432,
  allowExitOnIdle: true,
});

const registrarUsuario = async (usuario) => {
  let { email, password, rol, lenguage } = usuario;

  const claveEncriptada = bcrypt.hashSync(password);
  password = claveEncriptada;

  const consulta = 'INSERT into usuarios VALUES (DEFAULT, $1, $2, $3, $4)';
  const values = [email, password, rol, lenguage];

  try {
    await pool.query(consulta, values);
  } catch (err) {
    console.error('Error en el servidor al intentar crear nuevo usuario' + err);
  }
};

const verificarCredenciales = async (email, password) => {};

module.exports = { registrarUsuario, verificarCredenciales };
