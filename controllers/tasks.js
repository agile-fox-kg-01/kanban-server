const { Task, User } = require('../models/index.js')


class TaskController {

  static async findAll(req, res, next) {

    try {
      const tasks = await Task.findAll({
        include: {
          model: User
        }
      })

      res.status(201).json({
        tasks
      })
    } catch (err) {
      console.log('this is erorrrrrrrrr', err);
      next(err)
    }

  }

  static async create(req, res, next) {
    let data = req.body

    try {
      const newData = await Task.create({
        title: data.title,
        description: data.description,
        category: data.category,
        UserId: userLogin.id
      })
      res.status(201).json({
        newData
      })
    } catch (err) {
      next(err)
    }
  }

  static async edit(req, res, next) {
    const id = Number(req.params.id)
    const data = req.body

    try {
      const editData = await Task.update({
        title: data.title,
        description: data.description,
        category: data.category,
        UserId: userLogin.id
      }, {
        where: {
          id: id
        }
      })
      res.status(201).json({
        data: editData
      })
    } catch (err) {
      next(err)
    }
  }

  static async delete(req, res, next) {
    const id = Number(req.params.id)

    try {
      const deleteData = await Task.destroy({
        where: {
          id: id
        }
      })
      res.status(201).json({
        data: deleteData
      })
    } catch (err) {
      next(err)
    }
  }
  static async editCategory(req, res, next) {
    const id = Number(req.params.id)

    try {
      const editCategory = await Task.update({
        category: req.body.category
      }, {
        where: {
          id: id
        }
      })
      res.status(201).json({
        editCategory
      })
    } catch (err) {
      next(err)
    }

  }

}

module.exports = TaskController