const express = require('express');
const { Router } = express
const routerProducts = new Router()
const productosController = require('../../controllers/ContenedorProductos.js')
const webAuth = require('../../auth/index.js')

// export let productosVariable

routerProducts.get('/api/productos-test', webAuth, async (req, res, next) => {
    const productos = await productosController.getAll()
    res.render('pages/index', { productos, nombre: req.session.nombre })
})

routerProducts.get('/api/productos-test/:id', async (req, res, next) => {
    const { id } = req.params
    const productos = await productosController.getById(Number(id))
    // productos = productosVariable
    res.render('pages/index', { productos })
})

routerProducts.post('/api/productos-test', async (req, res, next) => {
    const { title, price, thumbnail, nombre } = req.body
    // console.log(req.session.nombre)
    const newArticulo = {
        title: title,
        price: price,
        thumbnail: thumbnail
    }
    const newProducto = await productosController.save(newArticulo)
    const productos = await productosController.getAll()
    res.render('pages/index', { productos })
})

routerProducts.put('/api/productos-test/:id', async (req, res, next) => {
    const { title, price, thumbnail } = req.body
    const { id } = req.params;
    const upDateProducto = await productosController.update(title, price, thumbnail, id)
    const productos = await productosController.getAll()
    res.render('pages/index', { productos })
})

routerProducts.delete('/api/productos-test/:id', async (req, res, next) => {
    const { id } = req.params;
    const deleteProducto = await productosController.deleteById(id)
    console.log(deleteProducto)
    const productos = await productosController.getAll()
    res.render('pages/index', { productos })
})

module.exports = routerProducts