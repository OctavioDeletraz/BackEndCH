const Messages = require('../models/modelMessages')

const getMessages = async (req, res) => {
    try {
        const allMessages = await Messages.find()
        return allMessages
    } catch (error) {
        console.log(error)
    }
}
const insertMessage = async (req, res) => {
    try {
        await Messages.create(req)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getMessages, insertMessage}