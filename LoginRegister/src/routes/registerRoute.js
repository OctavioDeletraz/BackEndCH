const {Router} = require('express');
const router = Router();

const {getLogin, insertLogin} = require('../controllers/login')

const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

passport.use('register', new LocalStrategy({passReqToCallback: true},async (req, username, password, done)=>{
    const user = await getLogin()
    const userObtained = user.find(u => u.username === username)
    
    if (userObtained){
        return done('usuario registrado')
    }
    const newUser = {
        username: username,
        password: password
    }
    await insertLogin(newUser)
    return done(null, newUser)
}))

passport.serializeUser(function (user, done){
    done(null, user.username)
})
passport.deserializeUser(async function (username,done){
    const user = await getLogin()
    const userSelected = user.find(u=>u.username === username)
    done(null, userSelected)
})

router.use(passport.initialize())
router.use(passport.session())



router.get('/', async(req,res)=>{
    res.render('registerPage.ejs')
})
router.post('/', passport.authenticate('register',{failureRedirect: '/failedregister', successRedirect:'/'}));

router.get('/failedregister',(req, res)=>{
    res.json('error')
})
module.exports = router;