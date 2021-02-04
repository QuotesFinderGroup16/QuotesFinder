const ControllerQuote = require('../controllers/controllerQuote')
const ControllerUser = require('../controllers/controllerUser')
const router = require('express').Router()
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

router.use(authenticate)

router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)
router.post('/googleLogin', ControllerUser.googleLogin)
router.get('/quotesList', ControllerQuote.quotesList)
router.post('/addQuote', ControllerQuote.addQuote)
router.get('/userQuotesList', ControllerQuote.userQuotesList)
router.delete('/deleteQuote/:id',authorize, ControllerQuote.deleteQuote)

module.exports = router