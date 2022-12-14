const { Router } = require('express')
const cartController = require('../controllers/cart.js')
const routerCart = new Router()


routerCart.get('/:id_cart/products', async (req, res, next) => {
    const { id_cart } = req.params
    const products = await cartController.getProductCartById(id_cart)
    res.send(products)
})

routerCart.post('/', async (req, res, next) => {
    const newCart = await cartController.newCart()
    console.log(newCart)
    res.send(newCart)
})

routerCart.post('/:id_cart/products/:id', async (req, res, next) => {
    const { id_cart, id } = req.params
    const addproducts = await cartController.addToCart(id_cart, id)
    res.send(addproducts)
})

routerCart.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    const deleteProducto = await cartController.deleteCartById(id)
    res.send(deleteProducto)
})

routerCart.delete('/:id_cart/products/:id', async (req, res, next) => {
    const { id_cart, id } = req.params
    const addproducts = await cartController.deleteProductInCartById(id_cart, id)
    res.send(addproducts)
})

module.exports = routerCart