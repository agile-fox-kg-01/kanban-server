const jwt = require('jsonwebtoken');

const signToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_KEY);

    return token;
}

const verifyToken = (token) => {
    const payload = jwt.verify(token, process.env.JWT_KEY);

    return payload;
}

module.exports = {signToken, verifyToken};