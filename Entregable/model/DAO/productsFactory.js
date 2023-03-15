import ProductsDBMongo from './productsDBMongo.js'

class ProductsFactoryDAO {
    static get(tipo) {
        switch (tipo) {
            case 'MONGO': return new ProductsDBMongo('ecommerce', 'products')
            default: return new ProductsDBMongo('ecommerce', 'products')
        }
    }
}

export default ProductsFactoryDAO