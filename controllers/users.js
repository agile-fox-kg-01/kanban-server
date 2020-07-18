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
  static async googleLogin(req, res) {
    const google_token = req.headers.google_token


    try {
      const payload1 = await verify(google_token)

      const email = payload1.email

      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (user) {

        if (!comparePass(process.env.GOOGLE_DEFAULT_BROWSER, user.password)) {
          throw {
            name: 'GoogleAccountError',
            message: 'Please login via website instead'
          }
        } else {
          const payload = {
            email: user.email
          }
          const access_token = await generateToken(payload)

          res.status(200).json({
            access_token
          })
        }

      } else {
        let user = await User.create({
          fullname: payload1.name,
          email: email,
          password: process.env.GOOGLE_DEFAULT_BROWSER,
          organization: "Hacktiv8"
        })

        const payload = {
          email: user.email
        }
        const access_token = generateToken(payload)
        res.status(200).json({
          access_token
        })
      }
    } catch (err) {
      console.log(err);
      res.status(400).json(
        'Email has been taken. Please log in or try another email '
        // status: 400,
        // message: err.message
      )
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


}

module.exports = UserController