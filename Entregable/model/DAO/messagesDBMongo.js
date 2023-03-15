import messagesDTO from '../DTO/messagesDTO.js'

import mongodb from 'mongodb'

const { MongoClient, ObjectId } = mongodb;

class MessagesDBMongoDAO {

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
                const message = await this._collection.findOne({ _id: new ObjectId(_id) })
                return [message]
            }
            else {
                const messages = await this._collection.find({}).toArray()
                return messages;
            }
        }
        catch (error) {
            console.log('obtener Mensajes error', error)
        }
    }

    save = async message => {
        try {
            await this._collection.insertOne(message);
            return message
        }
        catch (error) {
            console.log('guardarProducto error', error)
            return message
        }

    }

    update = async (_id, message) => {
        try {
            await this._collection.updateOne({ _id: new ObjectId(_id) }, { $set: message });
            return message
        }
        catch (error) {
            console.log('actualizar mensaje error', error)
            return message
        }
    }

    delete = async _id => {
        let deletedMessage = messagesDTO({}, _id, null)
        try {
            await this._collection.deleteOne({ _id: new ObjectId(_id) })
            return deletedMessage
        }
        catch (error) {
            console.log('borrar mensaje error', error)
            return deletedMessage
        }
    }
}

export default MessagesDBMongoDAO