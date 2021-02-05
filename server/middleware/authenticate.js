const jwt = require('jsonwebtoken');

const authenticate = (req,res,next) => {
  try{
    const access_token = req.headers.access_token
    const decoded = jwt.verify(access_token, process.env.SECRET)
    req.decoded = decoded
    next()
  } catch (err){
    next({name: "custom", msg: 'Invalid token', statusCode: 401})
  }
}

module.exports = authenticate