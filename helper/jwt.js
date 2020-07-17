const jwt = require('jsonwebtoken');

function signToken(payload) {
    let token = jwt.sign(payload, process.env.JWT_SECRET)

    return token
}

function verifyToken(token) {
    try {
        let output = jwt.verify(token, process.env.JWT_SECRET)
        return output
    } catch (err) {
        return err
    }
}

module.exports = {
    signToken,
    verifyToken
};