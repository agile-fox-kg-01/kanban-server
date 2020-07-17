const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
    static async register(req, res, next) {
        const user = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            const newUser = await User.create(user)
            const token = signToken(newUser.email)
            res.status(201).json({ token })
        } catch (err) {
            if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
                next({
                    name: 'ValidationError',
                    errors: err.errors[0].message
                })
            } else {
                next(err)
            }
        }
    }

    static async login(req, res, next) {
        const inputPass = req.body.password
        try {
            const user = await User.findOne({ where: {email: req.body.email} })
            const dbPass = user ? user.password : ''
            if(!user) {
                next({
                    name: 'ValidationError',
                    errors: 'invalid username or password'
                })
            } else if (!comparePassword(inputPass, dbPass)) {
                next({
                    name: 'ValidationError',
                    errors: 'invalid username or password'
                })
            } else {
                const token = signToken(user.email)
                res.status(200).json({ token })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController