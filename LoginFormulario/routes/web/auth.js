const express = require('express');
const { Router } = express
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const usersController = require('./../../controllers/ContenedorLoginMongo')
const authWebRouter = new Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;

function isValidPassword(user, password) {
    return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
    return bcrypt.hashSync(
        password,
        bcrypt.genSaltSync(saltRounds),
        null);
}

// passport config
passport.use('register', new LocalStrategy({
    passReqToCallback: true
}, async (username, password, done) => {

    const usuarios = await usersController.getAll()

    const userLogin = usuarios.find(u => u.username === username)

    if (userLogin) {
        return done('Usuario ya registrado')
    }

    const user = {
        username,
        password: createHash(password)
    }
    // usuarios.push(user)
    const newUser = await usersController.save(user)

    return done(null, user)
}));

passport.use('login', new LocalStrategy(async (username, password, done) => {
    const usuarios = await usersController.getAll()
    const user = usuarios.find(u => u.username === username)
    if (!user) {
        return done(null, false)
    }

    // if (user.password !== password) {
    //     return done(null, false)
    // }

    if (!isValidPassword(user, password)) {
        console.log('Invalid Password');
        return done(null, false);
    }


    return done(null, user)
}));

passport.serializeUser(async function (user, done) {
    done(null, user.username);
});
passport.deserializeUser(async function (username, done) {
    const usuarios = await usersController.getAll()
    const user = usuarios.find(u => u.username === username)
    done(null, user);
});


authWebRouter.get('/', (req, res) => {
    res.render('pages/login')
})

//login
authWebRouter.get('/login', (req, res) => {
    const nombre = req.session?.username
    if (nombre) {
        res.redirect('/api/productos-test')
    } else {
        res.render('pages/login')
    }
})

authWebRouter.post('/login',
    passport.authenticate('login', {
        failureRedirect: '/login-error',
        // successRedirect: '/api/productos-test' 
    }),
    function (req, res) {
        req.session.nombre = req.body.username
        res.redirect('/api/productos-test');
    }
)

authWebRouter.get('/login-error', (req, res) => {
    res.render('pages/login-error')
})

// authWebRouter.post('/login', async (req, res, next) => {
//     req.session.nombre = req.body.usuario
//     res.redirect('/api/productos-test')
// })



//logout
authWebRouter.get('/logout', (req, res) => {
    const nombre = req.session?.nombre
    console.log('en logout')
    if (nombre) {
        req.session.destroy(err => {
            if (!err) {
                res.render('pages/logout.ejs', { nombre })
            } else {
                res.redirect('/api/productos-test')
            }
        })
    } else {
        res.redirect('/api/productos-test')
    }
})

// //register
authWebRouter.get('/register', (req, res) => {
    // const nombre = req.session?.usuario
    // if (nombre) {
    //     res.redirect('pages/register-error')
    // } else {
    res.render('pages/register')

    // }
})

authWebRouter.post('/register', passport.authenticate('register',
    { failureRedirect: '/register-error', successRedirect: '/login' })
)

authWebRouter.get('/register-error', (req, res) => {
    res.render('pages/register-error')
})

// authWebRouter.post('/register', async (req, res, next) => {
//     // req.session.nombre = req.body.usuario
//     console.log(req.body.usuario)
//     res.redirect('/login')
// })

module.exports = authWebRouter