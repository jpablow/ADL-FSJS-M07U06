const jwt = require('jsonwebtoken');

const verificacionToken = (req, res, next) => {
  const token = req.header('Authorization').split('Bearer ')[1];

  if (!token)
    throw {
      code: 400,
      message:
        'Se debe incluir el token en las cabeceras para validar el usuario',
    };

  const tokenValido = jwt.verify(token, 'llaveParaCifradoDePasswordconJWT');

  if (!tokenValido) throw { code: 400, message: 'El token es inválido' };

  const { email } = jwt.decode(token);
  console.log(
    `Solicitud de verificación enviada por ${email} el ${new Date()}`
  );
  next();
};

module.exports = { verificacionToken };
