const ControllerQuote = require('../controllers/controllerQuote')
const ControllerUser = require('../controllers/controllerUser')
const router = require('express').Router()
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

router.use(authenticate)

//errHandler 
//apiDoc fathan
router.post('/register', ControllerUser.register)//rofi
router.post('/login', ControllerUser.login)//amil
router.post('/googleLogin', ControllerUser.googleLogin)//amil
router.get('/quotesList', ControllerQuote.quotesList)//done
router.post('/addQuote', ControllerQuote.addQuote)//romario
router.get('/userQuotesList', ControllerQuote.userQuotesList)//romario
router.delete('/deleteQuote/:id',authorize, ControllerQuote.deleteQuote)//fathan

module.exports = router