import ProductDAO from "../dao/product.dao.js";
import Product from "../model/product.model.js";
import crypto from 'crypto'

export default class ProductApi {
    constructor() {
        this.productDao = new ProductDAO()
    }

    getAll = () => {
        return this.productDao.getAll()
    }
    update = ({ id, data }) => {
        return this.productDao.update(id, data)
    }
    create = ({ data }) => {
        const id = crypto.randomBytes(10).toString('hex')
        const newProduct = new Product(id, data)

        this.productDao.save(newProduct)
        return newProduct
    }
    delete = ({ id }) => {
        return this.productDao.delete(id)
    }
}