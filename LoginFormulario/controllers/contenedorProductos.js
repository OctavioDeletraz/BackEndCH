const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductosScheme = new Schema({
    id_articulo: { type: Number, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true }
})

console.log("db mongoose productos conectada")

class Pruduct {
    productosDAO = mongoose.model('productos', ProductosScheme);

    async connect() {
        await mongoose.connect('mongodb://localhost:27017/productos24', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });
    }

    async disconnect() {
        await mongoose.disconnect();
    }

    async getAll() {
        try {
            await this.connect()
            const content = await this.productosDAO.find({})
            await this.disconnect()
            return content
        } catch (error) {
            return (error)
        }
    }

    async save(newArticulo) {
        try {
            await this.connect()
            const content = await this.productosDAO.find({})
            let newId;
            if (content.length == 0) {
                newId = 1;
            } else {
                newId = content.length + 1;
                console.log(newId)
            }
            const newObj = {
                title: newArticulo.title,
                price: newArticulo.price,
                thumbnail: newArticulo.thumbnail,
                id_articulo: newId
            }
            await this.productosDAO.create(newObj)
            const newContent = await this.productosDAO.find({})
            await this.disconnect()
            return newContent
        }
        catch (error) {
            return (error)
        }
    }
    async getById(id_articulo) {
        try {
            await this.connect()
            const content = await this.productosDAO.find({ id_articulo: id_articulo }) // usando mongo
            const elementosFiltrados = content.filter(e => e.id_articulo === id_articulo) //trabajandolo en paralelo
            await this.disconnect()
            if (elementosFiltrados.length === 0) {
                return ({ error: 'producto no encontrado' })
            } else {
                return content
            }
        } catch (error) {
            console.log('estamos en error')
            return (error)
        }
    }

    async update(timestamp, nombre, descripcion, código, foto, precio, stock, id_articulo) {
        try {
            await this.connect()
            const newProduct = { timestamp, nombre, descripcion, código, foto, precio, stock, id_articulo };
            const updateProduct = await this.productosDAO.updateMany({ id_articulo: id_articulo }, { $set: newProduct })
            await this.disconnect()
            return updateProduct; //me devuelve un objeto raro pero lo actualiza.
        } catch (error) {
            return (error)
        }
    }
    async deleteAll() {
        try {
            await this.connect()
            await this.productosDAO.deleteAll({})
            await this.disconnect()
            return "eliminado con exito"
        } catch (error) {
            console.log(error)
            return "no pudo eliminarse"
        }
    }

    async deleteById(id_articulo) {
        try {
            await this.connect()
            const elementosFiltrados = await this.productosDAO.deleteMany({ id_articulo: id_articulo }) //me devuelve un objeto raro pero lo elimina.
            await this.disconnect()
            return elementosFiltrados
        } catch (error) {
            return (error)
        }
    }
}

const productosController = new Pruduct()

module.exports = productosController