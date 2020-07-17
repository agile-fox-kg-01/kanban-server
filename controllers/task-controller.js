const { Task } = require('../models/index.js');

class TaskController {
    static async getTaskRootHandler(req, res, next) {
        const userId = req.loggedInUser.UserId;

        try {
            const tasks = await Task.findAll({
                where: {
                    UserId: userId
                }
            });

            res.status(200).json(tasks);

        } catch (error) {
            next(error);
        }
    }

    static async postTaskRootHandler(req, res, next) {
        const objTask = {
            title: req.body.title,
            category: req.body.category,
            UserId: req.loggedInUser.UserId
        }

        try {
            const task = await Task.create(objTask);

            res.status(201).json(task);
        } catch (error) {
            next(error);   
        }
    }

    static async putTaskRootHandler(req, res, next) {
        const taskId = Number(req.params.id);

        const objTask = {
            title: req.body.title,
            category: req.body.category
        }

        try {
            const task = await Task.update(objTask, {
                returning: true,
                where: {
                    id: taskId
                }
            });

            if(task[0] === 1) {
                const result = task[1];
                const updatedData = result[0];
                res.status(200).json(updatedData);
            } else {
                next({
                    name: '404 Not Found',
                    errors: {message: 'Not Found'}
                });
            }
        } catch (error) {
            next(error);
        }
    }
    
    static async deleteTaskRootHandler(req, res, next) {
        const taskId = Number(req.params.id);

        try {
            const taskData = await Task.findByPk(taskId);
            const task = await Task.destroy({
                where: {
                    id: taskId
                }
            });

            if(task === 1) {
                res.status(200).json(taskData);
            } else {
                next({
                    name: '404 Not Found',
                    errors: {message: 'Not Found'}
                });
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = TaskController;