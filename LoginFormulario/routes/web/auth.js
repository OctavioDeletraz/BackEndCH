const express = require('express');
const { Router } = express

// const path = requiere('path')

const authWebRouter = new Router()

authWebRouter.get('/login', (req, res) => {
    const nombre = req.session?.usuario
    if (nombre) {
        res.redirect('/api/productos-test')
    } else {
        res.render('pages/login')
    }
})

authWebRouter.post('/login', async (req, res, next) => {
    req.session.nombre = req.body.usuario
    res.redirect('/api/productos-test')
})

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
module.exports = authWebRouter