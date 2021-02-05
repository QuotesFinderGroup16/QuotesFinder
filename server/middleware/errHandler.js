module.exports = (err, req, res, next) => {
  let error = []
  let status = 500
  if (err.name == 'ReferenceError') {
    error.push(`Internal Server Error`)
  } else if (err.name == 'SequelizeValidationError') {
    err.errors.forEach(err => {
      error.push(err.message)
    });
    status = 400
  } else if (err.name == `Not Found`) {
    error.push(err.msg)
    status = err.statusCode
  } else if (err.name == `SequelizeDatabaseError`) {
    error.push(`Internal server errors`)
  } else if (err.name == `SequelizeUniqueConstraintError`) {
    err.errors.forEach(err => {
      error.push(err.message)
    });
    status = 400
  } else if (err.name == "custom") {
    error = error.push(err.msg)
    status = err.statusCode
  } else {
    error.push(`Internal Server Error`)
  }
  res.status(status).json({ error })
}