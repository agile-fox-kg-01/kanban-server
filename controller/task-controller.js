const { User, Task } = require('../models/index.js')

class TaskController {
    static getUserTask(req, res, next) {
        let UserId = req.currentUser.id

        Task.findAll({
            where: {
                UserId
            }
        })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                next(err)
            })
    }

    static createTask(req, res, next) {
        let { title, description, member, category } = req.body
        let UserId = req.currentUser.id

        Task.create({
            title,
            description,
            member,
            category,
            UserId
        })
            .then(result => {
                res.status(201).json(result)
            })
            .catch(err => {
                next(err)
            })
    }

    static editTask(req, res, next) {
        let taskId = Number(req.params.id)
        let { title, description, member, category } = req.body

        Task.update({
            title,
            description,
            member,
            category
        },
            {
                where: {
                    id: taskId
                },
                returning: true
            })
            .then(result => {
                let [status, updatedTask] = result
                res.status(200).json(updatedTask)
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteTask(req, res, next) {
        let taskId = Number(req.params.id)

        Task.destroy({
            where: {
                id: taskId
            },
            returning: true
        })
            .then(result => {
                res.status(200).json({ code: 200, message: "Task deleted" })
            })
            .catch(err => {
                next(err)
            })
    }

    static getTaskById(req, res, next) {
        let taskId = Number(req.params.id)

        Task.findByPk(taskId)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = TaskController