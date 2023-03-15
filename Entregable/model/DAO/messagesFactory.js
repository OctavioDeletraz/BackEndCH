import MessagesDBMongo from './messagesDBMongo.js'

class MessagesFactoryDAO {
    static get(tipo) {
        switch (tipo) {
            case 'MONGO': return new MessagesDBMongo('ecommerce', 'messages')
            default: return new MessagesDBMongo('ecommerce', 'messages')
        }
    }
}

export default MessagesFactoryDAO