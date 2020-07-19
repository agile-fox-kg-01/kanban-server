const jwt = require('jsonwebtoken');

function generateToken(payload) {
  const token = jwt.sign(payload, process.env.SECRET_JWT);

  return token
}

function decodeToken(token) {
  let decoded = jwt.verify(token, process.env.SECRET_JWT);
  if (decoded.email == undefined) {
    decoded = decoded
  } else {
    decoded = decoded.email
  }

  return decoded
}

module.exports = {
  generateToken,
  decodeToken
}
