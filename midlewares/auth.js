const { User, Task } = require('../models/index')
const { verifyToken } = require('../helpers/jwt')

async function authentication(req,res,next){
    const token = req.headers.token
    if(!token){
        throw { name: 'Not Authorized' }
    } else {        
        try {
            const payload = verifyToken(token)
            const user = await User.findOne({
                where: {
                    email:payload.email
                }
            })
            if(!user){
                throw { name: 'Email not valid' }
            } else {
                req.userLogin = user
                next()
            }
        } catch(err){
            next({
                name: err.name
            })
        } 
    }
}



async function isOwner(req,res,next){
    const taskId = req.params.id

    try{
        const task = await Task.findByPk(taskId)
        if(!task){
            throw { name: 'Task not found' }
        } else {
            if(task.UserId !== req.userLogin.id){
                throw { name: 'Not Authorized'}
            } else {
                next()
            }
        }
    } catch(err){
        next({
            name: err.name
        })
    }
    

}

module.exports = {
    authentication,
    isOwner
}
