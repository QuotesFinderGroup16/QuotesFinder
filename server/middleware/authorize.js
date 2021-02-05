const { Quote } = require('../models');

const authorize = (req,res,next) => {
  const id = +req.params.id
  Quote
    .findOne({
      where:{
        id
      }
    })
    .then(quote => {
      if (!quote) throw { name: "Not Found", msg: `there is no quote with id: ${id}`, statusCode: 404 }
      if (+req.decoded.id === quote.UserId) {
        next()
      } else {
        throw { name: "custom", msg: "Not authorized", statusCode: 401 }
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = authorize