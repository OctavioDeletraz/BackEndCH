import ApiMessages from '../api/messagesApi.js'

class MessagesController {

    constructor() {
        this.apiMessages = new ApiMessages()
    }

    getAll = async (req, res) => {
        try {
            let id = req.params.id
            let messages = await this.apiMessages.getAll(id)
            res.send(messages)
        }
        catch (error) {
            console.log('error obtener Mensajes', error)
        }
    }

    save = async (req, res) => {
        try {
            let message = req.body
            let savedMessage = await this.apiMessages.save(message)

            res.json(savedMessage)
        }
        catch (error) {
            console.log('error obtener Mensaje', error)
        }
    }

    update = async (req, res) => {
        try {
            let message = req.body
            let id = req.params.id
            let updatedMessage = await this.apiMessages.update(id, message)
            res.json(updatedMessage)
        }
        catch (error) {
            console.log('error obtener Mensaje', error)
        }
    }

    delete = async (req, res) => {
        try {
            let id = req.params.id
            let deletedMessage = await this.apiMessages.delete(id)
            res.json(deletedMessage)
        }
        catch (error) {
            console.log('error borrar Mensaje', error)
        }
    }
}

export default MessagesController
