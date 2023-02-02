const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    timestamp: { type: String, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String },
    codigo: { type: String, required: true },
    foto: { type: String, required: true },
    precio: { type: Number },
    stock: { type: Number }
})
class ProductsDAOContainer {
    productsDAO = mongoose.model('productos', productsSchema)
    async getAll() {
        try {
            this.connect()
            const allProducts = await this.productsDAO.find()
            return allProducts
        } catch (error) {
            console.log(error)
        }
    }
    async getById(idRecieved) {
        try {
            this.connect()
            const product = await this.productsDAO.findOne({ _id: idRecieved })
            if (product !== null) {
                return product
            } else {
                const error = {
                    error: -3,
                    descripcion: "error en busqueda de id de producto",
                }
                return error
            }
        } catch (error) {
            console.log(error)
        }
    }
    async deleteById(idRecieved) {
        try {
            this.connect()
            const productToDelete = await this.productsDAO.findOne({ _id: idRecieved })
            if (productToDelete !== null) {
                await this.productsDAO.findByIdAndDelete(idRecieved)
                return productToDelete
            } else {
                const error = {
                    error: -3,
                    descripcion: "error en busqueda de id de producto",
                }
                return error
            }
        } catch (error) {
            console.log(error)
        }
    }
    async save(product) {
        try {
            this.connect()
            await this.productsDAO.create(product, (err, algo) => {
                if (err !== null) {
                    const errorVal = err._message
                    return console.log(errorVal)
                } else {
                    return console.log(`ID: ${algo._id}, document added successfuly`)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    async update(idRecieved, product) {
        try {
            this.connect()
            const productToUpdate = await this.productsDAO.findById(idRecieved)
            if (productToUpdate !== null) {
                await this.productsDAO.findByIdAndUpdate(idRecieved, product)
                return productToUpdate
            } else {
                const error = {
                    error: -3,
                    descripcion: "error en busqueda de id de producto",
                }
                return error
            }
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = ProductsDAOContainer