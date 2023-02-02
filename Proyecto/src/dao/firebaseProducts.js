const ProductsDAOContainer = require('../controllers/productsFB.js')
const admin = require('firebase-admin')


const serviceAccount = require('../config/serviceAccountKey.json')

class ProductsContainerFile extends ProductsDAOContainer {

    async connect() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://backend-cb77a.firebaseio.com'
        })
    }
}

module.exports = ProductsContainerFile