const { User } = require('../models/index.js');
const { comparePassword } = require('../helpers/bcryptjs.js');
const { signToken } = require('../helpers/jwt.js'); 

class UserController {
    static async postUserLoginHandler(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;

        try {
            const user = await User.findOne({
                where: {
                    email
                }
            });

            const dataPassword = user ? user.password : '';

            if(!user) {
                next({
                    name: '400 Bad Request',
                    errors: {message: 'Invalid username or password'}
                });
            } else if(!comparePassword(password, dataPassword)) {
                next({
                    name: '400 Bad Request',
                    errors: {message: 'Invalid username or password'}
                });
            } else {
                const payload = {
                    email: user.email
                };

                const token = signToken(payload);

                res.status(200).json({
                    name: user.name,
                    access_token: token
                });
            }
        } catch (error) {
            next(error);
        }
    }

    static async postGoogleLoginHandler(req, res, next) {
        const googleToken = req.headers.google_token;
        
        try {
            const googlePayload = await verify(googleToken);
            const email = googlePayload.email;
            const name = googlePayload.name;

            const user = await User.findOne({
                where: {
                    email
                }
            })

            if(user) {
                if(!comparePassword(process.env.GOOGLE_DEFAULT_PASSWORD, user.password)) {
                    next({
                        name: '400 Bad Request',
                        errors: [{message: 'Please login through website'}]
                    });
                } else {
                    const payload = {
                        email: user.email
                    };
    
                    const token = signToken(payload);
    
                    res.status(200).json({name: user.name, token});
                }
            } else {
                const newUser = {
                    email,
                    password: process.env.GOOGLE_DEFAULT_PASSWORD,
                    name
                }
                const user = await User.create(newUser);

                const payload = {
                    email: user.email
                };

                const token = signToken(payload);

                res.status(200).json({
                    name: user.name, 
                    access_token: token
                });
            }     
        } catch(error) {
            next(error);
        }
    }

    static async postUserRegisterHandler(req, res, next) {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        try {
            const user = await User.create(newUser);

            const createdUser = {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt : user.updatedAt
            }

            res.status(201).json(createdUser);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;