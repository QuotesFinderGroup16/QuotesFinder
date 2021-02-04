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
      if (!quote) throw { msg: `there is no quote with id: ${id}` }
      if (+req.decoded.id === quote.UserId) {
        next()
      } else {
        res.status(401).json({
          msg: 'Not authorized'
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
}

module.exports = authorize