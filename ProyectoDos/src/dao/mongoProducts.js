const mongoose = require('mongoose')
const ProductsDAOContainer = require('../controllers/productsMongo.js')

class ProductsContainerFile extends ProductsDAOContainer {
    async connect() {
        await mongoose.connect('mongodb://localhost:27017/ecommerce', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        })
    }
    async disconnect() {
        await mongoose.disconnect()
    }
}
module.exports = ProductsContainerFile