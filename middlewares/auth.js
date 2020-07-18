
const { decodeToken } = require('../helpers/tokenHandler.js')
const { User, Task } = require('../models/index.js')

async function authentication(req, res, next) {
  const token = req.headers.access_token
  // console.log(token);
  if (!token) {
    // console.log('yesss');
    res.status(404).json({
      status: 404,
      message: `Please login first`
    })
  } else {

    try {
      const payload = decodeToken(token)

      const dataUser = await User.findOne({
        where: {
          email: payload
        }
      })

      if (!dataUser) {
        throw ({
          name: `NotFound`,
          message: `Please login first`
        })
      }
      else {
        userLogin = dataUser

        next()
      }
    } catch (err) {
      console.log('this errorrrr', err);
      next(err)
    }
  }
}

async function authorization(req, res, next) {

  let taskId = Number(req.params.id)

  try {
    const task = await Task.findByPk(taskId)
    if (!task) {
      res.status(404).json({
        status: 404,
        message: `Task not found`
      })
    } else {
      if (task.UserId !== userLogin.id) {

        res.status(401).json({
          status: 401,
          error: `Not authorized`
        })
      } else {
        taskList = task
        next()
      }
    }

  } catch (err) {
    res.status(500).json({
      error: `Internal server error`
    })
  }
}

module.exports = {
  authentication, authorization
}