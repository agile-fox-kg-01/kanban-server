const { verifyToken } = require('../helper/jwt.js')
const { User, Task } = require('../models/index.js')

async function authentication(req, res, next) {
    let token = req.headers.access_token
    
    if (token) {
        try {
            let payload = verifyToken(token)

            let currentUser = await User.findOne({
                where: {
                    email: payload.email
                }
            })

            if (currentUser) {
                req.currentUser = currentUser
                next();
            } else {
                throw { name: "Unauthorized" }
            }

        } catch (err) {
            throw { name: "Internal server error" }
        }

    } else {
        next({ name: "Unauthorized" })
    }
}

async function authorization(req, res, next) {
    let taskId = Number(req.params.id)

    try {
        let currentTask = await Task.findByPk(taskId)

        if (currentTask) {
            if (currentTask.UserId == req.currentUser.id) {
                next();
            } else {
                throw { name: "Unauthorized User" } 
            }
        } else {
            throw { name: "Not Found" }
        }

    } catch (err) {
        next(err)
    }
}

module.exports = {
    authentication,
    authorization
}