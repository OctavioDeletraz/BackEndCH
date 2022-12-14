const { Router } = require('express')
const productController = require('../dao/firebaseProducts.js')
// const productController = require('../../dao/mongoProducts.js')
const routerProducts = new Router()
const onAdmin = require('../../helpers/admin')

// const admin = true

// deberia atajar una entrada de ID incorrecta?

routerProducts.get('/:id', async (req, res, next) => {
    const { id } = req.params
    const products = await productController.getById(id)
    res.send(products)
})

routerProducts.get('/', async (req, res, next) => {
    const products = await productController.getAll()
    res.send(products)
})


routerProducts.post('/', onAdmin, async (req, res, next) => {
    const product = { ...req.body, timestamp: `Creado: ${new Date().toLocaleString()}` }
    const newProduct = await productController.save(product)
    console.log(newProduct)
    res.send(newProduct)
})


routerProducts.put('/:id', onAdmin, async (req, res, next) => {
    const product = { ...req.body, timestamp: `Modificado: ${new Date().toLocaleString()}` }
    const { id } = req.params;
    const productUpdated = await productController.update(product, id)
    res.send(productUpdated)
})


routerProducts.delete('/:id', onAdmin, async (req, res, next) => {
    const { id } = req.params;
    const productDeleted = await productController.deleteById(id)
    console.log(productDeleted)
    res.send(productDeleted)
})

module.exports = routerProducts