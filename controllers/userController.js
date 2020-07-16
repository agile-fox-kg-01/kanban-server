const { User } = require('../models/index')

const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {

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
        console.log(req.body.email)
        console.log(req.body.password)
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