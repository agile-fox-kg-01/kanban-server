const bcryptjs = require('bcryptjs');

const hashPassword =  (password) => {
    const salt = bcryptjs.genSaltSync(7);
    const hash = bcryptjs.hashSync(password, salt);

    return hash;
}

const comparePassword = (inputPassword, dataPassword) => {
    return bcryptjs.compareSync(inputPassword, dataPassword);
}

module.exports = {hashPassword, comparePassword};