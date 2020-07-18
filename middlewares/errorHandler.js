
function errorHandler(err, req, res, next) {

  let status = 500
  let message = 'Internal Server Error'
  console.log(err);
  switch (err.name) {
    case 'EmailNotFound':
      status = 404
      message = err.message
      break;
    case 'InvalidPassword':
      status = 400
      message = err.message
      break;
    case 'NotFound':
      status = 404
      message = err.message
      break;
    case 'SequelizeUniqueConstraintError':
      status = 400
      message = 'Email has been taken, please login or try another email'
      break;
    case 'SequelizeValidationError':
      status = 400
      message = []
      err.errors.forEach(err => {
        message.push(err.message)
      })
      break;
    case 'GoogleAccountError':
      status = 400
      message = err.message
      break;
  }
  res.status(status).json({
    status, message
  })
}

module.exports = errorHandler