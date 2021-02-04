const { User } = require('../models')

class ControllerUser{
  static register(req,res,next){
    const { email,password } = req.body
    User
      .create({
        email,
        password
      },{
        returning: true
      })
      .then(user => {
				res.status(201).json({
          msg: 'Register success',
          id: user.id,
          email: user.email,
        })
      })
      .catch(err => {
        next(err)
      })
  }
  static login(req,res,next){

  }
  static googleLogin(req,res,next){

  }
}

module.exports = ControllerUser