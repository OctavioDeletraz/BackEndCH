
const { Router } = require('express');
const isAuth = require('../utils/auth');
const logger = require('../utils/logger')


const router = Router();
const routeProducts = require('./productRoutes')
const routeLogin = require('./loginRoute')
const routeRegister = require('./registerRoute')
const routeLogout = require('./logoutRoute')
const routeInfo = require('./infoRoute')
const routeRandom = require('./randomRoute')
const passport = require('passport');



router.use(passport.initialize())
router.use(passport.session())


router.use('/api/productos', isAuth, routeProducts)
router.use('/login', routeLogin)
router.use('/register', routeRegister)
router.use('/logout', routeLogout)
router.use('/info', routeInfo)
router.use('/api/randoms', routeRandom)

router.get('/', (req, res) => {
    res.redirect('/api/productos')
})
router.get('*', (req, res) => {
    logger.warn(`Route: ${req.path} 404 Not Found Method: ${req.method} `);
    res.send("404 Not Found");
});


module.exports = router;