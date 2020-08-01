const { Task } = require('../models/index')

class TaskController  {

    static async getTask(req,res, next){
        try {
            const allTask = await Task.findAll({
                where : {
                    UserId : req.userLogin.id
                }
            })
            res.status(200).json(allTask)
        } catch(err){
            next()
        }
    }

    static async getTaskById(req,res,next){
        const idInput = req.params.id
        try {
            const task = await Task.findByPk(idInput)
            if ( task ){
                res.status(200).json(task)
            }
        } catch(err) {
            next({
                name: err.name
            })
        }
    }

    static async postTask(req,res, next){
        let newTask = {
            name: req.body.name,
            category: req.body.category,
            UserId: req.userLogin.id
        }
        console.log(newTask)
        try {
            const task = await Task.create(newTask)
            console.log(task)
            res.status(201).json(task)
        } catch (err){
            next(err)
        }
    }

    static async putTaskById(req,res,next){
        let idInput = req.params.id
        let newTask = {
            name: req.body.name,
            category: req.body.category,
            UserId: req.userLogin.id
        }
        try {
            const task = await Task.update(newTask, {
                where : {
                    id:idInput
                },
                returning : true
            })
            if (!task) {
                res.status(400).json(err.message)
            } else {
                res.status(200).json(task[1][0])
            }
        } catch(err) {
            next({
                name: err.name
            })
        }
    }

    static async deleteTaskById(req,res,next){
        let idInput = req.params.id
        try {
            const task = await Task.destroy({where : {
                id:idInput
            }})
            res.status(200).json({
                message: "Delete Success!"
            })
        } catch(err){
            next({
                name: err.name
            })
        }
    }
}

module.exports = TaskController