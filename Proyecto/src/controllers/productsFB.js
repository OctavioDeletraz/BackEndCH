const admin = require('firebase-admin')


class ProductsDAOContainer {

    async deleteById(idRecieved) {
        await this.connect()
        const db = admin.firestore()
        const products = db.collection('productos')
        const productToDelete = products.doc(idRecieved).delete()
        admin.app().delete()
        return productToDelete
    }

    async save(productsRecieved) {
        await this.connect()
        const db = admin.firestore()
        const products = db.collection('productos')
        await products.doc().set(productsRecieved)
        admin.app().delete()
    }
    async getAll() {
        await this.connect()
        const db = admin.firestore()
        const products = db.collection('productos')
        const snapshot = await products.get()
        const allProducts = snapshot.docs.map(doc => doc.data())
        return (admin.app().delete(), allProducts)
    }
    async getById(idRecieved) {
        await this.connect()
        const db = admin.firestore()
        const products = db.collection('productos')
        const snapshot = await products.doc(idRecieved).get()
        if (snapshot.data() !== undefined) {
            return snapshot.data()
        } else {
            const error = {
                error: -3,
                descripcion: "error en busqueda de id de carrito",
            }
            return error
        }

    }
    async update(idRecieved, product) {
        await this.connect()
        const db = admin.firestore()
        const products = db.collection('productos')
        const snapshot = products.doc(idRecieved).update(product)
        admin.app().delete()
        return snapshot
    }
}

module.exports = ProductsDAOContainer
