const { Router } = require('express')
const productController = require('../../controllers/products/Products')
const routerProducts = new Router()
const onAdmin = require('../../helpers/admin')


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
    const body = req.body
    const newProduct = await productController.save(body)
    console.log(newProduct)
    res.send(newProduct)
})


routerProducts.put('/:id', onAdmin, async (req, res, next) => {
    const body = req.body
    const { id } = req.params;
    const productUpdated = await productController.update(body, id)
    res.send(productUpdated)
})


routerProducts.delete('/:id', onAdmin, async (req, res, next) => {
    const { id } = req.params;
    const productDeleted = await productController.deleteById(id)
    console.log(productDeleted)
    res.send(productDeleted)
})

module.exports = routerProducts