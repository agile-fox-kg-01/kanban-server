const { Task, User, Group, GroupUser } = require('../models/index')

class TaskController {
    static async browse(req, res, next) {
        try {
            const tasks = await Task.findAll({
                include: [User, Group],
                where: { UserId: req.userLogin.id }
            })
            const usergroup = await User.findByPk(req.userLogin.id, {
                include: [
                    { model: Group, as: 'Groups', through: { attributes: [] },
                    include: [
                        { model: Task, include: { model: User, attributes: ['username', 'avatar'] } }
                    ]}
                ]
            })
            const userData = await User.findByPk(req.userLogin.id)
            res.status(200).json({ myTasks: tasks, groups: usergroup.Groups, user: userData})
        } catch (err) {
            next(err)
        }
    }

    static async read(req, res, next) {
        try {
            res.status(200).json(req.task)
        } catch(err) {
            next(err)
        }
    }

    static async edit(req, res, next) {
        const { ...data } = req.body
        try {
            await Task.update(data, {
                where: {id: req.params.id}
            })
            res.status(201).json(data)
        } catch (err) {
            if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
                next({
                    name: 'ValidationError',
                    error: err.errors[0].message
                })
            } else {
                next(err)
            }
        }
    }

    static async add(req, res, next) {
        try {
            const { ...data } = req.body
            if (req.params.groupId > 0) {
                const result = await Task.create({ ...data, UserId: req.userLogin.id, GroupId: Number(req.params.groupId) })
                res.status(201).json(result)
            } else {
                const result = await Task.create({ ...data, UserId: req.userLogin.id })
                res.status(201).json(result)
            }
        } catch (err) {
            if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
                next({
                    name: 'ValidationError',
                    error: err.errors[0].message
                })
            } else {
                next(err)
            }
        }
    }
    
    static async delete(req, res, next) {
        try {
            await Task.destroy({where: {id: req.params.id}})
            res.status(200).json(req.task)
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