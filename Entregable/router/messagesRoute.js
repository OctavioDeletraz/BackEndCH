import express from 'express'
const router = express.Router()

import MessagesController from '../controller/messagesController.js'

class RouterMessages {

    constructor() {
        this.messagesController = new MessagesController()
    }

    start() {
        router.get('/:id?', this.messagesController.getAll)
        router.post('/', this.messagesController.save)
        router.put('/:id', this.messagesController.update)
        router.delete('/:id', this.messagesController.delete)

        return router
    }
}

export default RouterMessages