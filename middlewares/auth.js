const { Task, User } = require('../models/index.js');
const { verifyToken } = require('../helpers/jwt.js');

const authentication = async (req, res, next) => {
    const token = req.headers.access_token;

    if(!token) {
        next({
            name: '401 Unauthorized',
            errors: {message: 'You have to logged in'}
        });
    } else {
        const payload = verifyToken(token);

        try {
            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            });

            if(!user) {
                next({
                    name: '401 Unauthorized',
                    errors: {message: 'You have to logged in'}
                });     
            } else {
                req.loggedInUser = user;

                next();
            }
        } catch (error) {
            next(error);
        }
    }
}

const authorization = async (req, res, next) => {
    const taskId = Number(req.params.id);

    try {
        const task = await Task.findByPk(taskId);

        if(!task) {
            next({
                name: '404 Not Found',
                errors: {message: 'Not Found'}
            });
        } else {
            if(task.UserId !== req.loggedInUser.id) {
                next({
                    name: '403 Forbidden',
                    errors: {message: `You don't have permission to access`}
                });
            } else {
                next();
            }
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {authentication, authorization};