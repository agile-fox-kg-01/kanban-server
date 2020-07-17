const { User } = require('../models/index.js')
const { comparePass } = require('../helpers/passHandler.js')
const { generateToken } = require('../helpers/tokenHandler.js')

const { verify } = require('../helpers/googleOauth.js')


class UserController {

  static async register(req, res, next) {

    const data = req.body

    try {
      const newUser = await User.create({
        fullname: data.fullname,
        email: data.email,
        password: data.password,
        organization: "Hacktiv8",
      })
      res.status(200).json({
        id: newUser.id,
        email: newUser.email
      })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    const data = req.body

    try {
      const userLogin = await User.findOne({
        where: {
          email: data.email
        }
      })
      if (!userLogin) {
        throw {
          name: `EmailNotFound`,
          message: `Email not found please try again`
        }
      }
      else {
        if (!comparePass(data.password, userLogin.password)) {
          throw {
            name: 'InvalidPassword',
            message: 'Password invalid'
          }
        }
        else {
          const access_token = await generateToken(userLogin.email)
          res.status(201).json({
            access_token
          })
        }
      }
    } catch (err) {
      next(err)
    }
  }

  static async googleLogin(req, res) {
    const google_token = req.headers.google_token

    try {
      const payload = await verify(google_token)
      console.log(payload);
      const email = payload.email

      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (user) {

        if (!comparePass(process.env.GOOGLE_DEFAULT_BROWSER, user.password)) {
          throw 'please login via website'
        } else {
          const payload = {
            email: user.email
          }
          const token = generateToken(payload)

          res.status(200).json({
            token
          })
        }

      } else {
        let user = User.create({
          email: email,
          password: process.env.GOOGLE_DEFAULT_BROWSER
        })

        const payload = {
          email: user.email
        }
        const token = generateToken(payload)
        res.status(200).json({
          token: token
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController