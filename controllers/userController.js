const { User } = require('../models/index')

const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { verify } = require('../helpers/googleOauth')

class UserController {

    // Login With Google
    static async oauthGoogle(req,res){
        const id_token = req.headers.id_token
        console.log("id token: ", id_token)

        try {
            const googlePayload = await verify(id_token)
            console.log(`
            google payload : ${googlePayload}
            `)
            const googleEmail =  googlePayload.email
            console.log(`
            google email: ${googleEmail}
            `)
            const user = await User.findOne({
                where:{
                    email: googleEmail
                }
            })
            if(user){
                if(!comparePassword(process.env.GOOGLE_DEFAULT_PASSWORD, user.password)){
                    throw 'please login via website'
                } else {
                    const payload = {
                        email: user.email
                    }
                    const token = signToken(payload)
                    console.log('line36')

                    res.status(200).json({ token })
                }

            } else {
                let user = await User.create({
                    email: googleEmail,
                    password: process.env.GOOGLE_DEFAULT_PASSWORD
                })

                const payload = {
                    email: user.email
                }
                const token = signToken(payload)
                console.log('line50')
                res.status(201).json({ token })
            }

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }

    }

    // Login
    static async postLogin(req,res){
        const inputPassword = req.body.password
        try {
            const user = await User.findOne({
                where : {
                    email : req.body.email
                }
            })
            const databasePassword = user ? user.password : ''

            if( !user ){
                throw 'invalid username and password'
            } else if(!comparePassword(inputPassword,databasePassword)){
                throw 'invalid username and password'
            } else {
                const payload = {
                    email: user.email
                }
                const token = signToken(payload)
                res.status(200).json({
                    token
                })
            }
        } catch(err){
            res.status(500).json({
                error: err
            })
        }
    }

    // register
    static async postRegister(req,res,next){
        // console.log(req.body.email)
        // console.log(req.body.password)
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        try{

            const userEmail = await User.findOne({
                where:{
                    email: newUser.email
                },
                returning : true
            })

            if(userEmail){
                throw { name: 'not unique'}
            }
            const user = await User.create(newUser)

            res.status(201).json({
                email: user.email,
                password: user.password
            })
        } catch(err){
            next(err)

        }

    }
}

module.exports = UserController