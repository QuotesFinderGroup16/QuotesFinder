const { User } = require('../models')
const { compare } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');;

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
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (!user) throw { name: "custom", msg: `Invalid email or password`, statusCode: 400 }
        const comparePassword = compare(req.body.password, user.password)
        if(!comparePassword) throw { name: "custom", msg: `Invalid email or password`, statusCode: 400 }

        const access_token = generateToken({
          id: user.id,
          email: user.email
        })
        console.log(access_token)
        res.status(200).json({ access_token })
      })
      .catch(err => {
        next(err)
      })
  }
  static googleLogin(req,res,next){
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let email = ""
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.CLIENT_ID
    })
      .then((ticket) => {
        const payload = ticket.getPayload()
        email = payload.email
        return User.findOne({
          where: {
            email
          }
        })
      })
      .then(user => {
        if (user) {
          //generate token
          const token = generateToken({
            id: user.id,
            email: user.email
          })
          res.status(200).json({ access_token:token })
        } else {
          return User.create({
            email,
            password: process.env.USER_PWD_GOOGLE
          })
        }
      })
      .then(registeredUser => {
        if(registeredUser) {
           const token = generateToken({
            id: registeredUser.id,
            email: registeredUser.email
          })
          res.status(201).json({ access_token:token })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ControllerUser