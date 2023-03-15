import productDTO from '../DTO/productsDTO.js'

import mongodb from 'mongodb'

const { MongoClient, ObjectId } = mongodb;

class ProductsDBMongoDAO {

    constructor(database, collection) {

        (async () => {
            console.log('Contectando a la Base de datos...')
            /* ---------------------------------------------------------------- */
            /*              Conexión a la base de datos                         */
            /* ---------------------------------------------------------------- */
            // connecting at mongoClient
            const connection = await MongoClient.connect('mongodb://127.0.0.1:27017', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            const db = connection.db(database);
            this._collection = db.collection(collection);
            /* ---------------------------------------------------------------- */
            console.log('Base de datos conectada')
        })().catch((error) => {
            console.error('Error al conectar a la Base de datos:', error);
        });
    }

    getAll = async _id => {
        try {
            if (_id) {
                console.log(_id)
                const product = await this._collection.findOne({ _id: new ObjectId(_id) })
                return [product]
            }
            else {
                const product = await this._collection.find({}).toArray()
                return product;
            }
        }
        catch (error) {
            console.log('obtenerProducto error', error)
        }
    }

    save = async product => {
        try {
            await this._collection.insertOne(product);
            return product
        }
        catch (error) {
            console.log('guardarProducto error', error)
            return product
        }

    }

    update = async (_id, product) => {
        try {
            await this._collection.updateOne({ _id: new ObjectId(_id) }, { $set: product });
            return product
        }
        catch (error) {
            console.log('actualizarProducto error', error)
            return product
        }
    }

    delete = async _id => {
        let deletedProduct = productDTO({}, _id, null)
        try {
            await this._collection.deleteOne({ _id: new ObjectId(_id) })
            return deletedProduct
        }
        catch (error) {
            console.log('borrarNoticia error', error)
            return deletedProduct
        }
    }
}

export default ProductsDBMongoDAO