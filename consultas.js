const bcrypt = require('bcryptjs');
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

  const consultaEmail = 'SELECT * FROM usuarios WHERE email = $1';
  const valuesEmail = [email];
  const { rowCount } = await pool.query(consultaEmail, valuesEmail);

  if (!rowCount) {
    const claveEncriptada = bcrypt.hashSync(password);
    password = claveEncriptada;

    const consulta = 'INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4)';
    const values = [email, password, rol, lenguage];

    try {
      await pool.query(consulta, values);
    } catch (err) {
      console.log('Error en el servidor al intentar crear nuevo usuario' + err);
    }
  } else throw { code: 500, message: 'El usuario ya existe' };
};

const verificarCredenciales = async (email, password) => {
  const consulta = 'SELECT * FROM usuarios WHERE email = $1';
  const values = [email];

  try {
    const {
      rows: [usuarioBd],
      rowCount,
    } = await pool.query(consulta, values);

    if (rowCount == 1) {
      const passwordBdBcrypted = usuarioBd.password;
      const passwordEsCorrecta = bcrypt.compareSync(
        password,
        passwordBdBcrypted
      );

      if (passwordEsCorrecta) {
        console.log('Credenciales válidas');
        return { error: false, msg: 'Usuario correcto' };
      } else {
        console.log('Credenciales inválidas');
        return { error: true, msg: 'Usuario o contraseña inválidos' };
      }
    } else {
      return { error: true, msg: 'Usuario o contraseña inválidos' };
    }
  } catch (err) {
    console.log(err);
    return {
      error: true,
      msg: 'Hubo un error inesperado en la validación de credenciales',
    };
  }
};

const obtenerUsuario = async (email) => {
  const consulta = 'SELECT * FROM usuarios WHERE email = $1';
  const values = [email];
  const { rows } = await pool.query(consulta, values);
  console.log(rows);
  return rows[0];
};

module.exports = { registrarUsuario, verificarCredenciales, obtenerUsuario };
