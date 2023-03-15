import express from 'express'
const router = express.Router()

import ProductsController from '../controller/productsController.js'

class RouterProducts {

    constructor() {
        this.productsController = new ProductsController()
    }

    start() {
        router.get('/:id?', this.productsController.getAll)
        router.post('/', this.productsController.save)
        router.put('/:id', this.productsController.update)
        router.delete('/:id', this.productsController.delete)

        return router
    }
}

export default RouterProducts