const { Task, User } = require('../models/index')

class TaskController {
    static async browse(req, res, next) {
        try {
            const tasks = await Task.findAll({
                include: User,
                where: {UserId: req.userLogin.id}
            })
            res.status(200).json(tasks)
        } catch (err) {
            next(err)
        }
    }

    static async read(req, res, next) {
        try {
            const task = await Task.findByPk(req.params.id)
            if(task === null) {
                next({
                    name: 'NotFound',
                    errors: 'Task not found'
                })
            } else {
                res.status(200).json(task)
            }
        } catch(err) {
            next(err)
        }
    }

    static async edit(req, res, next) {
        const newTask = {
            title: req.body.title,
            description: req.body.description,
        }
        try {
            const task = await Task.update(newTask, {
                where: {id: req.params.id}
            })
            if(task == 0) {
                next({
                    name: 'NotFound',
                    errors: 'Task Not Found'
                })
            } else {
                res.status(201).json({
                    title: newTask.title,
                    description: newTask.description
                })
            }
        } catch (err) {
            if(err.name === "SequelizeValidationError") {
                next({
                    name: 'ValidationError',
                    errors: err.errors[0].message
                })
            } else {
                next(err)
            }
        }
    }

    static async add(req, res, next) {
        console.log(req.body.category)
        const task = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            UserId: req.userLogin.id
        }
        try {
            const result = await Task.create(task)
            res.status(201).json(result)
        } catch (err) {
            if (err.name === "SequelizeValidationError") {
                next({
                    name: 'ValidationError',
                    errors: err.errors[0].message
                })
            } else {
                next(err)
            }
        }
    }
    
    static async delete(req, res, next) {
        try {
            const task = await Task.findByPk(req.params.id)
            const data = await Task.destroy({where: {id: req.params.id}})
            if(data == 0) {
                next({
                    name: 'NotFound',
                    errors: 'Task Not Found'
                })
            } else {
                res.status(200).json({
                    title: task.title,
                    description: task.description
                })
            }
        } catch (err) {
            next(err)
        }
    }

    static async changeCategory(req, res, next) {
        try {
            const task = await Task.update({
                category: req.headers.category
            }, {
                where: {id: req.params.id}
            })
            res.status(201).json(task)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = TaskController