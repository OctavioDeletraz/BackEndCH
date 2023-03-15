import ApiProducts from '../api/productsApi.js'

class ProductsController {

    constructor() {
        this.apiProducts = new ApiProducts()
    }

    getAll = async (req, res) => {
        try {
            let id = req.params.id
            let products = await this.apiProducts.getAll(id)

            res.send(products)
        }
        catch (error) {
            console.log('error obtenerProductos', error)
        }
    }

    save = async (req, res) => {
        try {
            let product = req.body
            let savedProduct = await this.apiProducts.save(product)

            res.json(savedProduct)
        }
        catch (error) {
            console.log('error obtenerProducto', error)
        }
    }

    update = async (req, res) => {
        try {
            let product = req.body
            let id = req.params.id
            let updatedProduct = await this.apiProducts.update(id, product)
            res.json(updatedProduct)
        }
        catch (error) {
            console.log('error obtenerProducto', error)
        }
    }

    delete = async (req, res) => {
        try {
            let id = req.params.id
            let deletedProduct = await this.apiProducts.delete(id)
            res.json(deletedProduct)
        }
        catch (error) {
            console.log('error borrar Producto', error)
        }
    }
}

export default ProductsController
