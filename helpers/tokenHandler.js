const jwt = require('jsonwebtoken');

function generateToken(payload) {
  const token = jwt.sign(payload, process.env.SECRET_JWT);

  return token
}

function decodeToken(token) {
  const decoded = jwt.verify(token, process.env.SECRET_JWT);
  return decoded
}

module.exports = {
  generateToken,
  decodeToken
}
