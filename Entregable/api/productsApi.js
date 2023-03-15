import config from '../config/config.js';
import ProductsFactoryDAO from '../model/DAO/productsFactory.js'
import Products from '../model/models/productsModel.js';

class ApiProducts {

    constructor() {
        this.productsDAO = ProductsFactoryDAO.get(config.TIPO_PERSISTENCIA)
    }

    async getAll(id) { return await this.productsDAO.getAll(id) }

    async save(product) {
        ApiProducts.checkValid(product, true)
        return await this.productsDAO.save(product)
    }

    async update(id, product) {
        ApiProducts.checkValid(product, false)
        return await this.productsDAO.update(id, product)
    }

    async delete(id) { return await this.productsDAO.delete(id) }

    static checkValid(product, required) {
        try {
            Products.validar(product, required)
        } catch (error) {
            throw new Error('El producto posee un formato json invalido o faltan datos: ' + error.details[0].message)
        }
    }
}

export default ApiProducts
