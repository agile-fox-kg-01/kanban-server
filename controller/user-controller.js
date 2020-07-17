const { User } = require('../models/index.js')
const { comparePassword } = require('../helper/bcrypt.js')
const { signToken, verifyToken } = require('../helper/jwt.js')
const { verify } = require('../helper/google-oauth.js')

class UserController {
    static register(req, res, next) {
        let { email, username, password } = req.body

        User.create({
            email,
            username,
            password
        })
            .then(result => {
                res.status(201).json({
                    id: result.id,
                    email: result.email
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        let { email, password } = req.body

        User.findOne({
            where: {
                email
            }
        })
            .then(result => {
                if (result) {
                    if (comparePassword(password, result.password)) {
                        let token = signToken({
                            email: result.email
                        })

                        res.status(200).json({
                            access_token: token,
                            username: result.username
                        })
                    } else {
                        throw ({ name: "Bad Request" })
                    }
                } else {
                    throw ({ name: "Bad Request" })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static async loginGoogle(req, res, next) {
        try {
            let googleToken = req.headers.access_token
            let googlePayload = await verify(googleToken)
            let googleEmail = googlePayload.email

            let user = await User.findOne({
                where: {
                    email: googleEmail
                }
            })

            if (user) {
                if (comparePassword(process.env.GOOGLE_DEFAULT_PASSWORD, user.password)) {
                    let payload = {
                        email: user.email
                    }

                    res.status(200).json({
                        access_token: signToken(payload),
                        username: user.username
                    })
                } else {
                    return { name: "Bad Request" }
                }
            } else {
                let newUser = await User.create({
                    email: googleEmail,
                    username: googleEmail,
                    password: process.env.GOOGLE_DEFAULT_PASSWORD
                })

                let payload = {
                    email: newUser.email
                }
                res.status(200).json({
                    access_token: signToken(payload)
                })
            }
        } catch (err) {
            return {err}
        }
    }

}

module.exports = UserController