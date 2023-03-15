import config from '../config/config.js';
import MessagesFactoryDAO from '../model/DAO/messagesFactory.js'
import Messages from '../model/models/messagesModel.js';

class ApiMessages {

    constructor() {
        this.messagesDAO = MessagesFactoryDAO.get(config.TIPO_PERSISTENCIA)
    }

    async getAll(id) { return await this.messagesDAO.getAll(id) }

    async save(message) {
        ApiMessages.checkValid(message, true)
        return await this.messagesDAO.save(message)
    }

    async update(id, message) {
        ApiMessages.checkValid(message, false)
        return await this.messagesDAO.update(id, message)
    }

    async delete(id) { return await this.messagesDAO.delete(id) }

    static checkValid(message, required) {
        try {
            Messages.validar(message, required)
        } catch (error) {
            throw new Error('El mensaje posee un formato json invalido o faltan datos: ' + error.details[0].message)
        }
    }
}

export default ApiMessages
